import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '../../../lib/supabase-server'

export async function POST() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder')
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Musisz być zalogowany' }, { status: 401 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{
      price: process.env.STRIPE_PRICE_ID,
      quantity: 1,
    }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?sukces=pro`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pro`,
    customer_email: user.email,
    metadata: { user_id: user.id },
    locale: 'pl',
  })

  return NextResponse.json({ url: session.url })
}
