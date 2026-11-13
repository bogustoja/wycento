import { NextResponse } from 'next/server'
import { createClient } from '../../lib/supabase-server'
import { buildQuotePdf } from '../../lib/quotePdf'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(request) {
  const id = new URL(request.url).searchParams.get('id') ?? ''
  if (!UUID.test(id)) return NextResponse.json({ error: 'Nieprawidłowy identyfikator' }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Zaloguj się' }, { status: 401 })

  // PDF tylko w planie Pro — sprawdzamy po stronie serwera, nie tylko ukrywamy przycisk.
  const { data: profile } = await supabase.from('profiles').select('plan').eq('user_id', user.id).single()
  if (profile?.plan !== 'pro') return NextResponse.json({ error: 'PDF jest dostępny w planie Pro' }, { status: 403 })

  const { data: quote, error } = await supabase
    .from('quotes')
    .select('pomieszczenie, miasto, wynik, created_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()
  if (error || !quote) return NextResponse.json({ error: 'Nie znaleziono wyceny' }, { status: 404 })

  let pdf
  try {
    pdf = await buildQuotePdf(quote)
  } catch (err) {
    console.error('[api/pdf] build failed:', err)
    return NextResponse.json({ error: 'Nie udało się wygenerować PDF' }, { status: 500 })
  }

  const slug = `${quote.pomieszczenie}-${quote.miasto}`
    .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/gi, 'l')
    .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="wycena-${slug || 'remont'}.pdf"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
