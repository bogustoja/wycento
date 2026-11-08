import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '../../../lib/supabase-server'

// Tworzy sesję płatności Stripe (subskrypcja Pro 39 zł/mies.) i zwraca link do kasy.
export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
      console.error('[stripe/checkout] brak STRIPE_SECRET_KEY lub STRIPE_PRICE_ID')
      return NextResponse.json({ error: 'Płatności są chwilowo niedostępne. Spróbuj za kilka minut.' }, { status: 503 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Musisz być zalogowany' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan, stripe_customer_id, stripe_subscription_id')
      .eq('user_id', user.id)
      .single()

    // Ktoś, kto już ma Pro, nie może kupić drugiej subskrypcji przez przypadek.
    if (profile?.plan === 'pro' && profile?.stripe_subscription_id) {
      return NextResponse.json({ error: 'Masz już plan Pro. Subskrypcją zarządzasz w panelu.' }, { status: 409 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    // Adres powrotu z tego samego serwera, z którego przyszło żądanie (działa też na podglądzie Vercela).
    const origin = new URL(request.url).origin

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      // Ten sam klient Stripe przy ponownym zakupie (historia płatności w jednym miejscu).
      ...(profile?.stripe_customer_id ? { customer: profile.stripe_customer_id } : { customer_email: user.email }),
      client_reference_id: user.id,
      metadata: { user_id: user.id },
      subscription_data: { metadata: { user_id: user.id } },
      success_url: `${origin}/dashboard?sukces=pro`,
      cancel_url: `${origin}/pro`,
      locale: 'pl',
      custom_text: {
        submit: {
          message: 'Płacąc, akceptujesz Regulamin (wycento.app/regulamin) i prosisz o rozpoczęcie usługi od razu. Subskrypcję anulujesz w każdej chwili w panelu.',
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout]', err)
    return NextResponse.json({ error: 'Nie udało się otworzyć płatności. Spróbuj ponownie.' }, { status: 500 })
  }
}
