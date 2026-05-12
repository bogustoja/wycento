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
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit() {
    setLoading(true)
    setMessage('')
    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Sprawdź email — wysłaliśmy link weryfikacyjny!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="mb-6">
          <span className="font-serif text-2xl font-bold text-[#1C1917]">Wyceń</span>
          <span className="font-serif text-2xl font-bold text-[#C85A2A]">To</span>
          <div className="text-sm text-[#78716C] mt-1">Wycena remontu ze zdjęcia</div>
        </div>

        <h1 className="font-serif text-xl font-bold text-[#1C1917] mb-6">
          {isRegister ? 'Utwórz konto' : 'Zaloguj się'}
        </h1>

        <div className="flex flex-col gap-4 mb-4">
          <div>
            <label className="text-sm font-semibold text-[#1C1917] mb-1.5 block">Email</label>
            <input
              type="email"
              placeholder="twoj@email.pl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E7E0D8] rounded-lg px-4 py-3 text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-[#C85A2A]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-[#1C1917] mb-1.5 block">Hasło</label>
            <input
              type="password"
              placeholder="Minimum 6 znaków"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E7E0D8] rounded-lg px-4 py-3 text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-[#C85A2A]"
            />
          </div>
        </div>

        {message && (
          <div className="bg-[#F5EBE4] border border-[#C85A2A]/30 rounded-lg px-4 py-3 text-sm text-[#C85A2A] mb-4">
            {message}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#C85A2A] text-white py-3 rounded-lg font-semibold hover:bg-[#B04E24] transition disabled:opacity-50 mb-4"
        >
          {loading ? 'Ładowanie...' : isRegister ? 'Zarejestruj się' : 'Zaloguj się'}
        </button>

        <p className="text-sm text-center text-[#78716C]">
          {isRegister ? 'Masz już konto?' : 'Nie masz konta?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#C85A2A] font-semibold hover:underline"
          >
            {isRegister ? 'Zaloguj się' : 'Zarejestruj się'}
          </button>
        </p>
      </div>
    </main>
  )
}