'use server'

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '../lib/supabase-server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function getAdmin() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

async function ensureQuotesBucket(admin) {
  const { data: buckets } = await admin.storage.listBuckets()
  const exists = buckets?.some(b => b.name === 'quotes')
  if (!exists) {
    await admin.storage.createBucket('quotes', { public: false, fileSizeLimit: 204800 })
  }
}

export async function wyceńRemont(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Musisz być zalogowany' }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('credits, plan')
    .eq('user_id', user.id)
    .single()

  const canProceed = profileError || !profile
    ? true
    : (profile.plan === 'pro' || profile.credits > 0)

  if (!canProceed) {
    return { error: 'BRAK_KREDYTOW' }
  }

  const miasto = formData.get('miasto')
  const pomieszczenie = formData.get('pomieszczenie')
  const imageData = formData.get('image')

  if (!imageData) return { error: 'Brak zdjęcia' }

  const base64 = imageData.split(',')[1]
  const mediaType = imageData.split(';')[0].split(':')[1]

  const systemPrompt = `Jesteś ekspertem od wyceny remontów w Polsce z 20-letnim doświadczeniem.
Pracowałeś przy wykończeniach wnętrz, łazienkach, kuchniach, tarasach i altanach.

Znasz realia rynku budowlanego:
- Stawki robocizny różnią się regionalnie (Warszawa drożej, mniejsze miasta taniej)
- Klienci często nie wiedzą co chcą i zmieniają zdanie w trakcie
- Zawsze warto przy okazji wymieniać instalacje elektryczne i hydrauliczne
- Ukryte koszty: wywóz gruzu, folia, taśmy, kleje, gruntowanie
- Czas realizacji ma wpływ na cenę (pilne = droższe)

Odpowiadasz TYLKO w formacie JSON, bez żadnego tekstu przed ani po.`

  const userPrompt = `Przeanalizuj to zdjęcie pomieszczenia.
Lokalizacja: ${miasto}
Typ pomieszczenia: ${pomieszczenie}

Zwróć TYLKO ten JSON (bez markdown, bez \`\`\`):
{
  "summary": "krótki opis co widać na zdjęciu i stan pomieszczenia",
  "items": [
    {"name": "nazwa pracy", "min": 1000, "max": 2000, "jednostka": "zł"}
  ],
  "total_min": 5000,
  "total_max": 8000,
  "czas_realizacji": "2-3 tygodnie",
  "uwagi": ["ważna uwaga 1", "ważna uwaga 2"],
  "co_warto_dodac": ["co warto zrobić przy okazji"]
}`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: userPrompt },
        ],
      }],
    })

    const text = response.content[0].text
    const wynik = JSON.parse(text)

    // Save to Supabase Storage (no SQL table needed)
    try {
      const admin = getAdmin()
      await ensureQuotesBucket(admin)
      const quoteId = Date.now()
      const quoteData = {
        id: String(quoteId),
        user_id: user.id,
        pomieszczenie,
        miasto,
        wynik,
        created_at: new Date().toISOString(),
      }
      await admin.storage
        .from('quotes')
        .upload(`${user.id}/${quoteId}.json`, JSON.stringify(quoteData), {
          contentType: 'application/json',
        })
    } catch {}

    // Deduct credit
    if (profile && profile.plan !== 'pro' && profile.credits > 0) {
      await supabase.from('profiles').update({ credits: profile.credits - 1 }).eq('user_id', user.id)
        .then(() => {}).catch(() => {})
    }

    return { success: true, wynik }
  } catch (error) {
    console.error('Błąd API:', error)
    return { error: 'Błąd podczas wyceny. Spróbuj ponownie.' }
  }
}
