'use client'

import Brand from '../components/Brand'
import Spotlight from '../components/Spotlight'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const FEATURES = [
  { text: 'Nielimitowane wyceny — bez limitów', highlight: true },
  { text: 'Pobieranie raportów PDF', highlight: false },
  { text: 'Historia wszystkich wycen', highlight: false },
  { text: 'Ceny dla każdego miasta w Polsce', highlight: false },
  { text: 'Priorytetowa obsługa e-mail', highlight: false },
]

export default function ProPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      if (res.status === 401) { router.push('/login'); return }
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Błąd płatności. Spróbuj ponownie.')
        setLoading(false)
      }
    } catch {
      setError('Błąd połączenia. Spróbuj ponownie.')
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-bg overflow-hidden">
      <div className="dot-grid absolute inset-0" aria-hidden="true" />
      <Spotlight x={50} y={20} />
      <nav className="relative bg-bg/80 backdrop-blur-md border-b border-line">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Brand />
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-muted hover:text-ink transition-colors border border-line-strong px-3.5 py-1.5 rounded-full hover:bg-surface-2"
          >
            ← Panel
          </button>
        </div>
      </nav>

      <div className="relative max-w-lg mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 border border-accent-2/40 bg-accent-2/10 text-accent-2 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          Plan Pro
        </div>

        <h1 className="text-5xl font-extrabold text-ink mb-4 leading-[0.95]">
          Nielimitowane wyceny<br />za 39 zł miesięcznie
        </h1>
        <p className="text-muted mb-8 text-sm">
          Anuluj kiedy chcesz. Żadnych długoterminowych zobowiązań.
        </p>

        <div className="glow-ring rounded-3xl mb-5"><div className="bg-surface rounded-[23px] p-8 text-left relative overflow-hidden">
          <ul className="space-y-4 mb-8">
            {FEATURES.map(item => (
              <li key={item.text} className={`flex items-center gap-3 text-sm ${item.highlight ? 'text-ink font-semibold' : 'text-ink-2'}`}>
                <span className="w-5 h-5 rounded-full bg-accent-2/15 border border-accent-2/40 text-accent-2 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                {item.text}
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10 pt-6 flex items-end gap-2 mb-6">
            <span className="text-6xl font-extrabold tracking-tight text-ink">39</span>
            <div className="pb-1.5">
              <div className="text-muted text-base">zł / miesiąc</div>
              <div className="text-xs text-muted">ok. 1,30 zł za wycenę przy 30 wycenach</div>
            </div>
          </div>

          {error && (
            <div className="bg-surface-2 border border-accent-2/40 text-accent-2 text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-base hover:bg-accent-hover btn-glow disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Przekierowuję do płatności...
              </>
            ) : 'Przejdź na Pro — 39 zł/mies →'}
          </button>
          <div className="flex justify-center gap-4 mt-3 text-xs text-muted">
            <span>Płatność przez Stripe</span>
            <span>✓ Anuluj kiedy chcesz</span>
          </div>
        </div></div>

        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-muted hover:text-ink transition-colors"
        >
          Zostań przy planie darmowym
        </button>
      </div>
    </main>
  )
}
