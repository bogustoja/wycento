import { createClient as createJsClient } from '@supabase/supabase-js'
import { createClient as createCookieClient } from './supabase-server'

// Klient Supabase działający w imieniu zalogowanego usera.
// Strona WWW: sesja z ciasteczek. Aplikacja iOS: nagłówek "Authorization: Bearer <access_token>".
// Zwraca { supabase, user } — user = null, gdy brak ważnej sesji.
export async function getRequestClient(request) {
  const auth = request.headers.get('authorization') || ''
  const token = auth.toLowerCase().startsWith('bearer ') ? auth.slice(7).trim() : ''

  if (token) {
    const supabase = createJsClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      }
    )
    // getUser(token) weryfikuje token na serwerze Supabase (nie tylko dekoduje JWT).
    const { data, error } = await supabase.auth.getUser(token)
    return { supabase, user: error ? null : data.user }
  }

  const supabase = await createCookieClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}
