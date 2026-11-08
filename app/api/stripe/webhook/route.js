import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Webhook Stripe: jedyne miejsce, które zmienia plan użytkownika na Pro i z powrotem.
// Stripe ponawia zdarzenie, jeśli zwrócimy błąd (5xx), więc przy błędzie bazy oddajemy 500,
// zamiast udawać sukces i zgubić płatność.

function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// Statusy subskrypcji, przy których user ma Pro.
// past_due = płatność się nie udała, Stripe jeszcze ponawia próby — nie zabieramy Pro od razu.
const ACTIVE = new Set(['active', 'trialing', 'past_due'])

async function setPlan(supabase, { userId, customerId, subscriptionId, plan }) {
  const fields = { plan }
  if (customerId) fields.stripe_customer_id = customerId
  if (subscriptionId !== undefined) fields.stripe_subscription_id = subscriptionId

  // Najpierw po user_id (zapisany w metadanych przy zakupie), a jak go nie ma — po kliencie Stripe.
  let query = supabase.from('profiles').update(fields)
  if (userId) query = query.eq('user_id', userId)
  else if (customerId) query = query.eq('stripe_customer_id', customerId)
  else return { error: new Error('Brak user_id i customer_id w zdarzeniu') }

  const { data, error } = await query.select('user_id')
  if (error) return { error }
  if (!data || data.length === 0) return { error: new Error(`Nie znaleziono profilu (user ${userId}, customer ${customerId})`) }
  return { error: null }
}

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!process.env.STRIPE_SECRET_KEY || !secret) {
    console.error('[stripe/webhook] brak STRIPE_SECRET_KEY lub STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook nieskonfigurowany' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret)
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowy podpis webhooka' }, { status: 400 })
  }

  const supabase = createAdminClient()
  let result = { error: null }

  switch (event.type) {
    case 'checkout.session.completed': {
      const s = event.data.object
      if (s.mode !== 'subscription') break
      result = await setPlan(supabase, {
        userId: s.metadata?.user_id || s.client_reference_id,
        customerId: s.customer,
        subscriptionId: s.subscription,
        plan: 'pro',
      })
      break
    }

    // Zmiana statusu: odnowienie, nieudana płatność po wszystkich próbach, ponowna aktywacja.
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object
      const active = ACTIVE.has(sub.status)
      result = await setPlan(supabase, {
        userId: sub.metadata?.user_id,
        customerId: sub.customer,
        subscriptionId: active ? sub.id : null,
        plan: active ? 'pro' : 'free',
      })
      break
    }

    // Koniec subskrypcji (anulowana i minął opłacony okres, albo nieopłacona).
    case 'customer.subscription.deleted': {
      const sub = event.data.object
      result = await setPlan(supabase, {
        userId: sub.metadata?.user_id,
        customerId: sub.customer,
        subscriptionId: null,
        plan: 'free',
      })
      break
    }

    default:
      break
  }

  if (result.error) {
    console.error(`[stripe/webhook] ${event.type} ${event.id}:`, result.error)
    return NextResponse.json({ error: 'Nie udało się zapisać zmiany planu' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
