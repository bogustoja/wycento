'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const FEATURES = [
  'Nielimitowane wyceny',
  'Pobieranie raportów PDF',
  'Historia wszystkich wycen',
  'Ceny dla całej Polski',
  'Priorytetowa obsługa',
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
    <main className="min-h-screen bg-[#FAF8F5]">
      <nav className="bg-white border-b border-[#E7E0D8]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors border border-[#E7E0D8] px-3 py-1.5 rounded-lg hover:bg-[#F2EDE6]"
          >
            ← Panel
          </button>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F5EBE4] text-[#C85A2A] text-xs font-bold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest">
          ⭐ Plan Pro
        </div>

        <h1 className="font-serif text-4xl font-bold text-[#1C1917] mb-4 leading-tight">
          Nielimitowane wyceny<br />za 39 zł miesięcznie
        </h1>
        <p className="text-[#78716C] mb-10">
          Anuluj kiedy chcesz. Żadnych długoterminowych zobowiązań.
        </p>

        <div className="bg-white border border-[#E7E0D8] rounded-2xl p-8 mb-6 text-left">
          <ul className="space-y-4 mb-8">
            {FEATURES.map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#44403C]">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="border-t border-[#E7E0D8] pt-6 flex items-end gap-2 mb-6">
            <span className="font-serif text-5xl font-bold text-[#1C1917]">39</span>
            <span className="text-[#78716C] pb-1.5 text-base">zł / miesiąc</span>
          </div>

          {error && (
            <div className="bg-[#FEF0EA] border border-[#C85A2A]/30 text-[#C85A2A] text-sm rounded-xl px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-[#C85A2A] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Przekierowuję do płatności...
              </>
            ) : 'Przejdź na Pro — 39 zł/mies'}
          </button>
          <p className="text-xs text-center text-[#A8A29E] mt-3">
            Bezpieczna płatność przez Stripe · Anuluj kiedy chcesz
          </p>
        </div>

        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-[#A8A29E] hover:text-[#78716C] transition-colors"
        >
          Zostań przy planie darmowym
        </button>
      </div>
    </main>
  )
}
