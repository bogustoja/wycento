'use client'

import { useState } from 'react'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit() {
    if (!email || !password) { setMessage('Uzupełnij email i hasło'); setMessageType('error'); return }
    setLoading(true)
    setMessage('')

    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setMessage(error.message); setMessageType('error') }
      else { setMessage('Sprawdź email — wysłaliśmy link weryfikacyjny!'); setMessageType('success') }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setMessage('Nieprawidłowy email lub hasło'); setMessageType('error') }
      else router.push('/dashboard')
    }
    setLoading(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="min-h-screen flex">

      {/* LEWA KOLUMNA — brand */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#1C1917] flex-col justify-between p-12">
        <div>
          <a href="/" className="flex items-center gap-0.5 mb-16">
            <span className="font-serif text-2xl font-bold text-white">Wyceń</span>
            <span className="font-serif text-2xl font-bold text-[#C85A2A]">To</span>
          </a>
          <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-4">
            Wycena remontu<br />
            <span className="text-[#E8A07A] italic">ze zdjęcia</span>
          </h2>
          <p className="text-[#78716C] leading-relaxed mb-10">
            AI analizuje zdjęcie i podaje realistyczny kosztorys z podziałem na robociznę, materiały i koszty dodatkowe.
          </p>
          <ul className="space-y-4">
            {[
              'Wynik w 30 sekund',
              'Ceny dopasowane do Twojego miasta',
              'Uwzględniamy ukryte koszty',
              'Widełki, nie jedna liczba',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-[#A8A29E]">
                <span className="w-5 h-5 rounded-full bg-[#C85A2A]/20 border border-[#C85A2A]/40 flex items-center justify-center text-xs text-[#E8A07A] font-bold flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Przykładowa wycena */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="text-xs text-[#78716C] mb-3 font-semibold uppercase tracking-widest">Przykładowa wycena</div>
          <div className="text-sm text-white font-semibold mb-1">Łazienka 6m² · Kraków</div>
          <div className="font-serif text-3xl font-bold text-[#E8A07A] mb-1">3 800 – 5 700 zł</div>
          <div className="text-xs text-[#78716C]">Robocizna + materiały + wywóz gruzu</div>
        </div>
      </div>

      {/* PRAWA KOLUMNA — formularz */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#FAF8F5]">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <a href="/" className="flex items-center gap-0.5 mb-8 lg:hidden">
            <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-[#1C1917] mb-2">
              {isRegister ? 'Utwórz konto' : 'Witaj z powrotem'}
            </h1>
            <p className="text-sm text-[#78716C]">
              {isRegister
                ? 'Pierwsze 3 wyceny za darmo, bez karty kredytowej'
                : 'Zaloguj się żeby zobaczyć swoje wyceny'}
            </p>
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-7 shadow-sm">
            <div className="space-y-4 mb-5">
              <div>
                <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wide mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-[#C85A2A] focus:ring-2 focus:ring-[#C85A2A]/10 transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wide mb-2 block">Hasło</label>
                <input
                  type="password"
                  placeholder="Minimum 6 znaków"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-[#C85A2A] focus:ring-2 focus:ring-[#C85A2A]/10 transition"
                />
              </div>
            </div>

            {message && (
              <div className={`rounded-xl px-4 py-3 text-sm mb-5 ${
                messageType === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-[#FEF0EA] border border-[#C85A2A]/30 text-[#C85A2A]'
              }`}>
                {message}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#C85A2A] text-white py-3.5 rounded-xl font-semibold hover:bg-[#B04E24] transition-all shadow-md shadow-[#C85A2A]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Ładowanie...
                </>
              ) : isRegister ? 'Zarejestruj się' : 'Zaloguj się'}
            </button>
          </div>

          <p className="text-sm text-center text-[#78716C] mt-5">
            {isRegister ? 'Masz już konto?' : 'Nie masz konta?'}{' '}
            <button
              onClick={() => { setIsRegister(!isRegister); setMessage('') }}
              className="text-[#C85A2A] font-semibold hover:underline"
            >
              {isRegister ? 'Zaloguj się' : 'Zarejestruj się za darmo'}
            </button>
          </p>

          <p className="text-center mt-5">
            <a href="/" className="text-xs text-[#A8A29E] hover:text-[#78716C] transition-colors">
              ← Wróć na stronę główną
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
