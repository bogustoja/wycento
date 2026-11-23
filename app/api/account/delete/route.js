import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createAdminClient } from '@supabase/supabase-js'
import { getRequestClient } from '../../../lib/supabase-request'

// Trwałe usunięcie konta (wymóg App Store 5.1.1(v), RODO art. 17).
// 1. Anuluje aktywną subskrypcję Stripe od razu — żeby nie pobierać opłat za usunięte konto.
// 2. Usuwa usera z auth.users — profiles i quotes znikają przez ON DELETE CASCADE.
// Faktury w Stripe zostają (obowiązek podatkowy, opisany w polityce prywatności).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request) {
  const { user } = await getRequestClient(request)
  if (!user) return NextResponse.json({ error: 'Zaloguj się ponownie' }, { status: 401 })

  const admin = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const { data: profile, error: profileError } = await admin
    .from('profiles')
    .select('stripe_subscription_id')
    .eq('user_id', user.id)
    .maybeSingle()
  if (profileError) {
    console.error('[account/delete] profile read failed:', profileError)
    return NextResponse.json({ error: 'Nie udało się usunąć konta. Spróbuj za chwilę.' }, { status: 500 })
  }

  const subId = profile?.stripe_subscription_id
  if (subId) {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[account/delete] brak STRIPE_SECRET_KEY, a user ma subskrypcję', user.id)
      return NextResponse.json({ error: 'Nie udało się anulować subskrypcji. Napisz do nas.' }, { status: 500 })
    }
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
      await stripe.subscriptions.cancel(subId)
    } catch (err) {
      // Już anulowana / nie istnieje — można usuwać dalej. Inny błąd — przerywamy, żeby nie zostawić płatnej subskrypcji.
      if (err?.code !== 'resource_missing') {
        console.error('[account/delete] stripe cancel failed:', err)
        return NextResponse.json({ error: 'Nie udało się anulować subskrypcji. Spróbuj za chwilę.' }, { status: 500 })
      }
    }
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id)
  if (deleteError) {
    console.error('[account/delete] deleteUser failed:', deleteError)
    return NextResponse.json({ error: 'Nie udało się usunąć konta. Spróbuj za chwilę.' }, { status: 500 })
  }

  return NextResponse.json({ deleted: true })
}
