'use client'

import Brand from '../components/Brand'
import Spotlight from '../components/Spotlight'

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
      <div className="relative hidden lg:flex lg:w-[45%] bg-surface border-r border-line flex-col justify-between p-12 overflow-hidden">
        <div className="dot-grid absolute inset-0" aria-hidden="true" />
        <Spotlight x={30} y={25} />
        <div className="relative">
          <div className="mb-16"><Brand size={32} /></div>
          <h2 className="text-5xl font-extrabold text-ink leading-[0.95] mb-5">
            Wycena remontu<br />
            <span className="text-accent-2">ze zdjęcia.</span>
          </h2>
          <p className="text-ink-2 leading-relaxed mb-10 max-w-md">
Nasz system analizuje zdjęcie i podaje realistyczny kosztorys z podziałem na robociznę, materiały i koszty dodatkowe.
          </p>
          <ul className="space-y-4">
            {[
              'Wynik w 30 sekund',
              'Ceny dopasowane do Twojego miasta',
              'Uwzględniamy ukryte koszty',
              'Widełki, nie jedna liczba',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-ink-2">
                <span className="w-5 h-5 rounded-full bg-accent-2/15 border border-accent-2/40 flex items-center justify-center text-xs text-accent-2 font-bold flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Przykładowa wycena */}
        <div className="relative glow-ring rounded-2xl"><div className="bg-surface rounded-[15px] p-6">
          <div className="text-xs text-muted mb-3 font-semibold uppercase tracking-widest">Przykładowa wycena</div>
          <div className="text-sm text-white font-semibold mb-1">Łazienka 6m² · Kraków</div>
          <div className="text-3xl font-extrabold tracking-tight tabular-nums text-accent-2 mb-1">18 000 – 30 200 zł</div>
          <div className="text-xs text-muted">Skucie, hydroizolacja, glazura, hydraulika i materiały</div>
        </div></div>
      </div>

      {/* PRAWA KOLUMNA — formularz */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-bg">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="mb-8 lg:hidden"><Brand size={28} /></div>

          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-ink mb-2">
              {isRecovery ? 'Ustaw nowe hasło' : isForgot ? 'Resetuj hasło' : isRegister ? 'Utwórz konto' : 'Witaj z powrotem'}
            </h1>
            <p className="text-sm text-muted">
              {isRecovery
                ? 'Wpisz nowe hasło — po zapisaniu przeniesiemy Cię do panelu'
                : isForgot
                ? 'Wyślemy Ci link do ustawienia nowego hasła'
                : isRegister
                ? 'Pierwsze 3 wyceny za darmo, bez karty kredytowej'
                : 'Zaloguj się żeby zobaczyć swoje wyceny'}
            </p>
          </div>

          <div className="bg-surface border border-line rounded-3xl p-7 shadow-2xl shadow-black/40">

            {!isForgot && !isRecovery && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 border border-line rounded-xl py-3 text-sm font-semibold text-ink hover:bg-surface-2 hover:border-line-strong transition disabled:opacity-50 mb-5"
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
                  <div className="flex-1 h-px bg-line" />
                  <span className="text-xs text-muted">lub</span>
                  <div className="flex-1 h-px bg-line" />
                </div>
              </>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} noValidate>
            <div className="space-y-4 mb-5">
              {!isRecovery && (
              <div>
                <label htmlFor="email" className="text-xs font-semibold text-ink-2 uppercase tracking-wide mb-2 block">Email</label>
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
                  className="w-full bg-bg border border-line-strong rounded-xl px-4 py-3 text-sm text-ink placeholder-muted outline-none focus:border-accent-2 focus:ring-2 focus:ring-accent-2/20 transition"
                />
              </div>
              )}
              {!isForgot && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="text-xs font-semibold text-ink-2 uppercase tracking-wide">{isRecovery ? 'Nowe hasło' : 'Hasło'}</label>
                    {!isRegister && !isRecovery && (
                      <button type="button" onClick={() => { setIsForgot(true); setMessage('') }} className="text-xs text-accent-2 hover:underline">
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
                    className="w-full bg-bg border border-line-strong rounded-xl px-4 py-3 text-sm text-ink placeholder-muted outline-none focus:border-accent-2 focus:ring-2 focus:ring-accent-2/20 transition"
                  />
                </div>
              )}
            </div>

            {message && (
              <div role={messageType === 'error' ? 'alert' : 'status'} className={`rounded-xl px-4 py-3 text-sm mb-5 ${
                messageType === 'success'
                  ? 'bg-green-500/10 border border-green-400/30 text-green-400'
                  : 'bg-surface-2 border border-accent-2/40 text-accent-2'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3.5 rounded-xl font-semibold hover:bg-accent-hover btn-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            <p className="text-sm text-center text-muted mt-5">
              <button onClick={() => { setIsForgot(false); setMessage('') }} className="text-accent-2 font-semibold hover:underline">
                ← Wróć do logowania
              </button>
            </p>
          ) : (
            <p className="text-sm text-center text-muted mt-5">
              {isRegister ? 'Masz już konto?' : 'Nie masz konta?'}{' '}
              <button
                onClick={() => { setIsRegister(!isRegister); setMessage('') }}
                className="text-accent-2 font-semibold hover:underline"
              >
                {isRegister ? 'Zaloguj się' : 'Zarejestruj się za darmo'}
              </button>
            </p>
          )}

          <p className="text-center mt-5">
            <a href="/" className="text-xs text-muted hover:text-ink transition-colors">
              ← Wróć na stronę główną
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
