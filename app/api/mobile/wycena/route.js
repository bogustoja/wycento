import { NextResponse } from 'next/server'
import { getRequestClient } from '../../../lib/supabase-request'
import { runWycena } from '../../../lib/wycenaCore'

// Wycena dla aplikacji iOS. Ta sama logika i te same kredyty co na stronie (lib/wycenaCore).
// Body JSON: { miasto, pomieszczenie, opis, image } — image jako data URL JPEG.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // wycena AI trwa zwykle 20–30 s

export async function POST(request) {
  const { supabase, user } = await getRequestClient(request)
  if (!user) return NextResponse.json({ error: 'Zaloguj się ponownie' }, { status: 401 })

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowe dane' }, { status: 400 })
  }

  const result = await runWycena(supabase, user, body)
  // Błędy biznesowe (brak kredytów, złe zdjęcie) idą z 200 i polem error — tak samo jak na stronie.
  return NextResponse.json(result)
}
