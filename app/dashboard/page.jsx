'use client'

import Brand from '../components/Brand'
import Spotlight from '../components/Spotlight'

import { useEffect, useState, Suspense } from 'react'
import { createClient } from '../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })
}

function ProBannerCheck({ onShow }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    if (searchParams.get('sukces') === 'pro') {
      onShow()
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [searchParams, onShow])
  return null
}

function Dashboard() {
  const [user, setUser] = useState(null)
  const [credits, setCredits] = useState(null)
  const [plan, setPlan] = useState('free')
  const [quotes, setQuotes] = useState([])
  const [totalQuotes, setTotalQuotes] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showProBanner, setShowProBanner] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)

      const [profileRes, quotesRes] = await Promise.all([
        supabase.from('profiles').select('credits, plan').eq('user_id', user.id).single(),
        fetch('/api/quotes').then(r => r.json()).catch(() => []),
      ])

      if (profileRes.data) {
        setCredits(profileRes.data.credits)
        setPlan(profileRes.data.plan)
      }

      if (Array.isArray(quotesRes)) {
        setQuotes(quotesRes)
        setTotalQuotes(quotesRes.length)
      }

      setLoading(false)
    }
    getData()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? '?'

  return (
    <main className="min-h-screen bg-bg">
      <Suspense fallback={null}>
        <ProBannerCheck onShow={() => setShowProBanner(true)} />
      </Suspense>

      {/* NAV */}
      <nav className="bg-bg/80 backdrop-blur-md border-b border-line sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Brand />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted hidden sm:block">{user?.email}</span>
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-muted hover:text-ink transition-colors border border-line-strong px-3.5 py-1.5 rounded-full hover:bg-surface-2"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {showProBanner && (
          <div className="bg-green-500/10 border border-green-400/30 rounded-2xl px-6 py-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                            <div>
                <div className="font-semibold text-green-400 text-sm">Witaj w planie Pro!</div>
                <div className="text-xs text-green-400 mt-0.5">Masz teraz nielimitowane wyceny i dostęp do PDF.</div>
              </div>
            </div>
            <button onClick={() => setShowProBanner(false)} className="text-green-400 hover:text-green-400 transition text-lg leading-none">×</button>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink">Dzień dobry!</h1>
          <p className="text-ink-2 mt-2">Co dziś wyceniamy?</p>
        </div>

        {/* KARTY STATYSTYK */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">

          <div className="lift bg-surface border border-line rounded-3xl p-6">
            <div className="mb-4">
              <span className="text-xs font-semibold text-muted uppercase tracking-widest">
                {plan === 'pro' ? 'Plan Pro' : 'Pozostałe wyceny'}
              </span>
            </div>
            {credits === null ? (
              <div className="h-10 bg-surface-2 rounded-lg animate-pulse" />
            ) : plan === 'pro' ? (
              <div className="text-5xl font-extrabold tracking-tight tabular-nums text-ink">∞</div>
            ) : (
              <>
                <div className="text-5xl font-extrabold tracking-tight tabular-nums text-ink">
                  {credits}
                  <span className="text-xl text-muted font-sans font-normal">/3</span>
                </div>
                <div className="mt-3 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-700"
                    style={{ width: `${((3 - credits) / 3) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted mt-2">{3 - credits} z 3 wykorzystanych</div>
              </>
            )}
          </div>

          <div className="lift bg-surface border border-line rounded-3xl p-6">
            <div className="mb-4">
              <span className="text-xs font-semibold text-muted uppercase tracking-widest">Twój plan</span>
            </div>
            {loading ? (
              <div className="h-10 bg-surface-2 rounded-lg animate-pulse" />
            ) : <>
            <div className="text-3xl font-extrabold text-ink capitalize mb-2">{plan}</div>
            {plan === 'free' ? (
              <button
                onClick={() => router.push('/pro')}
                className="text-xs text-accent-2 font-semibold hover:underline text-left"
              >
                Przejdź na Pro — 39 zł/mies →
              </button>
            ) : (
              <div>
                <span className="text-xs text-green-400 font-semibold block mb-1">Aktywny ✓</span>
                <button
                  onClick={async () => {
                    const res = await fetch('/api/stripe/portal', { method: 'POST' })
                    const data = await res.json()
                    if (data.url) window.location.href = data.url
                    else alert(data.error || 'Nie udało się otworzyć zarządzania subskrypcją.')
                  }}
                  className="text-xs text-muted hover:text-ink-2 hover:underline transition-colors"
                >
                  Zarządzaj / anuluj →
                </button>
              </div>
            )}
            </>}
          </div>

          <div className="lift bg-surface border border-line rounded-3xl p-6">
            <div className="mb-4">
              <span className="text-xs font-semibold text-muted uppercase tracking-widest">Wszystkich wycen</span>
            </div>
            {loading ? <div className="h-10 bg-surface-2 rounded-lg animate-pulse" /> : <div className="text-5xl font-extrabold tracking-tight tabular-nums text-ink">{totalQuotes}</div>}
            <div className="text-xs text-muted mt-2">od początku</div>
          </div>
        </div>

        {/* CTA — NOWA WYCENA */}
        {credits === 0 && plan === 'free' ? (
          <div className="glow-ring rounded-3xl mb-8"><div className="relative bg-surface rounded-[23px] p-8 overflow-hidden">
            <div className="dot-grid absolute inset-0" aria-hidden="true" />
            <Spotlight x={80} y={50} />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-2">Limit wycen</div>
                <h2 className="text-3xl font-extrabold text-ink mb-2">Wykorzystałeś 3/3 wyceny</h2>
                <p className="text-ink-2 text-sm max-w-sm">Przejdź na Pro — nielimitowane wyceny i pobieranie PDF za 39 zł/mies.</p>
              </div>
              <button
                onClick={() => router.push('/pro')}
                className="flex-shrink-0 bg-accent text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-accent-hover btn-glow whitespace-nowrap"
              >
                Przejdź na Pro →
              </button>
            </div>
          </div></div>
        ) : (
          <div className="glow-ring rounded-3xl mb-8"><div className="relative bg-surface rounded-[23px] p-8 overflow-hidden">
            <div className="dot-grid absolute inset-0" aria-hidden="true" />
            <Spotlight x={80} y={50} />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-2">Nowa wycena</div>
                <h2 className="text-3xl font-extrabold text-ink mb-2">Wyceń swój remont</h2>
                <p className="text-ink-2 text-sm max-w-sm">Zrób zdjęcie pomieszczenia, podaj miasto. Wynik w 30 sekund.</p>
              </div>
              <button
                onClick={() => router.push('/wycena')}
                className="flex-shrink-0 bg-accent text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-accent-hover btn-glow flex items-center gap-2 whitespace-nowrap"
              >
                Wyceń teraz <span aria-hidden="true">→</span>
              </button>
            </div>
          </div></div>
        )}

        {/* HISTORIA */}
        <div className="bg-surface border border-line rounded-3xl overflow-hidden">
          <div className="px-6 py-5 border-b border-line">
            <h2 className="text-xl font-bold text-ink">Historia wycen</h2>
          </div>

          {loading ? (
            <div className="divide-y divide-line">
              {[1, 2, 3].map(i => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface-2 rounded-xl animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 bg-surface-2 rounded animate-pulse w-40 mb-2" />
                    <div className="h-3 bg-surface-2 rounded animate-pulse w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : quotes.length === 0 ? (
            <div className="py-16 text-center">
                            <div className="font-semibold text-ink mb-2">Brak wycen</div>
              <div className="text-sm text-muted mb-6">Twoje wyceny pojawią się tutaj po pierwszej analizie</div>
              <button
                onClick={() => router.push('/wycena')}
                className="bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent-hover transition"
              >
                Zrób pierwszą wycenę →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {quotes.map((q) => (
                <div key={q.id} className="px-6 py-4 flex items-center justify-between hover:bg-surface-2 transition">
                  <div className="flex items-center gap-4">
                    <div aria-hidden="true" className="w-10 h-10 bg-accent-2/10 border border-accent-2/30 text-accent-2 rounded-xl flex items-center justify-center font-bold flex-shrink-0">
                      {(q.pomieszczenie || '?').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-ink text-sm">{q.pomieszczenie}</div>
                      <div className="text-xs text-muted">{q.miasto} · {formatDate(q.created_at)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold tabular-nums text-ink text-sm">
                      {q.wynik.total_min?.toLocaleString('pl-PL')} – {q.wynik.total_max?.toLocaleString('pl-PL')} zł
                    </div>
                    {plan === 'pro' && (
                      <a href={`/api/pdf?id=${q.id}`} target="_blank" rel="noopener" className="inline-block text-xs text-accent-2 font-medium mt-0.5 py-2 hover:underline">PDF ↓</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <Dashboard />
    </Suspense>
  )
}
