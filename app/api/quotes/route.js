import { NextResponse } from 'next/server'
import { getRequestClient } from '../../lib/supabase-request'

export async function GET(request) {
  const { supabase, user } = await getRequestClient(request)
  if (!user) return NextResponse.json([], { status: 401 })

  const { data, error } = await supabase
    .from('quotes')
    .select('id, pomieszczenie, miasto, wynik, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('[api/quotes] select failed:', error)
    return NextResponse.json({ error: 'Nie udało się pobrać historii' }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}
