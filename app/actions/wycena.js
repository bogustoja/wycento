'use server'

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function wyceńRemont(formData) {
  const miasto = formData.get('miasto')
  const pomieszczenie = formData.get('pomieszczenie')
  const imageData = formData.get('image')

  if (!imageData) {
    return { error: 'Brak zdjęcia' }
  }

  const base64 = imageData.split(',')[1]
  const mediaType = imageData.split(';')[0].split(':')[1]

  const systemPrompt = `Jesteś ekspertem od wyceny remontów w Polsce i UK z 20-letnim doświadczeniem. 
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
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: 'text',
              text: userPrompt,
            },
          ],
        },
      ],
    })

    const text = response.content[0].text
    const wynik = JSON.parse(text)
    return { success: true, wynik }

  } catch (error) {
    console.error('Błąd API:', error)
    return { error: 'Błąd podczas wyceny. Spróbuj ponownie.' }
  }
}