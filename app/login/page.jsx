'use client'

import LogoIcon from '../components/LogoIcon'

import { useState, useEffect } from 'react'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'

// Supabase zwraca błędy po angielsku — tłumaczymy te, które user realnie zobaczy.
function tlumaczBlad(msg = '') {
  const m = msg.toLowerCase()
  if (m.includes('already registered') || m.includes('already been registered')) return 'Konto z tym adresem już istnieje. Zaloguj się albo zresetuj hasło.'
  if (m.includes('password should be at least') || m.includes('at least 6')) return 'Hasło musi mieć co najmniej 6 znaków.'
  if (m.includes('invalid email') || m.includes('unable to validate email') || (m.includes('email address') && m.includes('invalid'))) return 'Nieprawidłowy adres email.'
  if (m.includes('email not confirmed')) return 'Najpierw potwierdź adres email — kliknij link z wiadomości, którą wysłaliśmy.'
  if (m.includes('rate limit') || m.includes('security purposes') || m.includes('too many')) return 'Za dużo prób. Odczekaj chwilę i spróbuj ponownie.'
  if (m.includes('same password') || m.includes('different from the old')) return 'Nowe hasło musi być inne niż poprzednie.'
  if (m.includes('weak')) return 'Hasło jest za słabe — dodaj więcej znaków.'
  return 'Coś poszło nie tak. Spróbuj ponownie za chwilę.'
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [isForgot, setIsForgot] = useState(false)
  // Tryb ustawiania nowego hasła — po kliknięciu linku z maila „resetuj hasło”.
  const [isRecovery, setIsRecovery] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const router = useRouter()
  const supabase = createClient()

  // Link z maila resetującego otwiera /login?code=…; klient Supabase sam wymienia kod na sesję
  // i emituje PASSWORD_RECOVERY. Wcześniej nic tego nie łapało — user zostawał na formularzu logowania
  // i nie miał jak ustawić nowego hasła.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true)
        setIsForgot(false)
        setIsRegister(false)
        setMessage('')
        window.history.replaceState(null, '', '/login')
      }
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  async function handleGoogleLogin() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) { setMessage('Błąd logowania przez Google'); setMessageType('error'); setLoading(false) }
  }

  async function handleSubmit() {
    if (isRecovery) {
      if (password.length < 6) { setMessage('Hasło musi mieć co najmniej 6 znaków.'); setMessageType('error'); return }
      setLoading(true)
      const { error } = await supabase.auth.updateUser({ password })
      setLoading(false)
      if (error) { setMessage(tlumaczBlad(error.message)); setMessageType('error'); return }
      router.push('/dashboard')
      return
    }

    if (!EMAIL_RE.test(email.trim())) { setMessage('Podaj poprawny adres email'); setMessageType('error'); return }

    if (isForgot) {
      setLoading(true)
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/login`,
      })
      if (error) { setMessage(tlumaczBlad(error.message)); setMessageType('error') }
      else { setMessage('Jeśli konto z tym adresem istnieje, wysłaliśmy link do ustawienia nowego hasła. Sprawdź skrzynkę (i spam).'); setMessageType('success') }
      setLoading(false)
      return
    }

    if (!password) { setMessage('Podaj hasło'); setMessageType('error'); return }
    if (isRegister && password.length < 6) { setMessage('Hasło musi mieć co najmniej 6 znaków.'); setMessageType('error'); return }
    setLoading(true)
    setMessage('')

    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email: email.trim(), password })
      if (error) { setMessage(tlumaczBlad(error.message)); setMessageType('error') }
      else { setMessage('Sprawdź email — wysłaliśmy link weryfikacyjny!'); setMessageType('success') }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (error) {
        setMessage(error.message.toLowerCase().includes('email not confirmed') ? tlumaczBlad(error.message) : 'Nieprawidłowy email lub hasło')
        setMessageType('error')
      }
      else router.push('/dashboard')
    }
    setLoading(false)
  }


  return (
    <div className="min-h-screen flex">

      {/* LEWA KOLUMNA — brand */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#1C1917] flex-col justify-between p-12">
        <div>
          <a href="/" className="flex items-center gap-0.5 mb-16">
            <LogoIcon size={32} className="mr-2" />
            <span className="font-serif text-2xl font-bold text-white">Wyceń</span>
            <span className="font-serif text-2xl font-bold text-[#C85A2A]">To</span>
          </a>
          <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-4">
            Wycena remontu<br />
            <span className="text-[#E8A07A] italic">ze zdjęcia</span>
          </h2>
          <p className="text-[#A8A29E] leading-relaxed mb-10">
Nasz system analizuje zdjęcie i podaje realistyczny kosztorys z podziałem na robociznę, materiały i koszty dodatkowe.
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
          <div className="text-xs text-[#A8A29E] mb-3 font-semibold uppercase tracking-widest">Przykładowa wycena</div>
          <div className="text-sm text-white font-semibold mb-1">Łazienka 6m² · Kraków</div>
          <div className="font-serif text-3xl font-bold text-[#E8A07A] mb-1">18 000 – 30 200 zł</div>
          <div className="text-xs text-[#A8A29E]">Skucie, hydroizolacja, glazura, hydraulika i materiały</div>
        </div>
      </div>

      {/* PRAWA KOLUMNA — formularz */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#FAF8F5]">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <a href="/" className="flex items-center gap-0.5 mb-8 lg:hidden">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>

          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-[#1C1917] mb-2">
              {isRecovery ? 'Ustaw nowe hasło' : isForgot ? 'Resetuj hasło' : isRegister ? 'Utwórz konto' : 'Witaj z powrotem'}
            </h1>
            <p className="text-sm text-[#78716C]">
              {isRecovery
                ? 'Wpisz nowe hasło — po zapisaniu przeniesiemy Cię do panelu'
                : isForgot
                ? 'Wyślemy Ci link do ustawienia nowego hasła'
                : isRegister
                ? 'Pierwsze 3 wyceny za darmo, bez karty kredytowej'
                : 'Zaloguj się żeby zobaczyć swoje wyceny'}
            </p>
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-7 shadow-sm">

            {!isForgot && !isRecovery && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 border border-[#E7E0D8] rounded-xl py-3 text-sm font-semibold text-[#1C1917] hover:bg-[#FAF8F5] transition disabled:opacity-50 mb-5"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Kontynuuj przez Google
                </button>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-[#E7E0D8]" />
                  <span className="text-xs text-[#78716C]">lub</span>
                  <div className="flex-1 h-px bg-[#E7E0D8]" />
                </div>
              </>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} noValidate>
            <div className="space-y-4 mb-5">
              {!isRecovery && (
              <div>
                <label htmlFor="email" className="text-xs font-semibold text-[#1C1917] uppercase tracking-wide mb-2 block">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-[#C85A2A] focus:ring-2 focus:ring-[#C85A2A]/10 transition"
                />
              </div>
              )}
              {!isForgot && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="text-xs font-semibold text-[#1C1917] uppercase tracking-wide">{isRecovery ? 'Nowe hasło' : 'Hasło'}</label>
                    {!isRegister && !isRecovery && (
                      <button type="button" onClick={() => { setIsForgot(true); setMessage('') }} className="text-xs text-[#C85A2A] hover:underline">
                        Zapomniałem hasła
                      </button>
                    )}
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={isRegister || isRecovery ? 'new-password' : 'current-password'}
                    minLength={6}
                    required
                    placeholder="Minimum 6 znaków"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-[#C85A2A] focus:ring-2 focus:ring-[#C85A2A]/10 transition"
                  />
                </div>
              )}
            </div>

            {message && (
              <div role={messageType === 'error' ? 'alert' : 'status'} className={`rounded-xl px-4 py-3 text-sm mb-5 ${
                messageType === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-[#FEF0EA] border border-[#C85A2A]/30 text-[#B04E24]'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
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
              ) : isRecovery ? 'Zapisz nowe hasło' : isForgot ? 'Wyślij link' : isRegister ? 'Zarejestruj się' : 'Zaloguj się'}
            </button>
            </form>
          </div>

          {isRecovery ? null : isForgot ? (
            <p className="text-sm text-center text-[#78716C] mt-5">
              <button onClick={() => { setIsForgot(false); setMessage('') }} className="text-[#C85A2A] font-semibold hover:underline">
                ← Wróć do logowania
              </button>
            </p>
          ) : (
            <p className="text-sm text-center text-[#78716C] mt-5">
              {isRegister ? 'Masz już konto?' : 'Nie masz konta?'}{' '}
              <button
                onClick={() => { setIsRegister(!isRegister); setMessage('') }}
                className="text-[#C85A2A] font-semibold hover:underline"
              >
                {isRegister ? 'Zaloguj się' : 'Zarejestruj się za darmo'}
              </button>
            </p>
          )}

          <p className="text-center mt-5">
            <a href="/" className="text-xs text-[#78716C] hover:text-[#78716C] transition-colors">
              ← Wróć na stronę główną
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
