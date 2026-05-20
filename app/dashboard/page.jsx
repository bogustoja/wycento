'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const EMOJI = {
  'Łazienka': '🚿',
  'Kuchnia': '🍳',
  'Pokój': '🛋️',
  'Przedpokój': '🚪',
  'Sypialnia': '🛏️',
  'Taras': '🌿',
  'Całe mieszkanie': '🏠',
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [credits, setCredits] = useState(null)
  const [plan, setPlan] = useState('free')
  const [quotes, setQuotes] = useState([])
  const [totalQuotes, setTotalQuotes] = useState(0)
  const [loading, setLoading] = useState(true)
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

  function handlePDF(q) {
    const win = window.open('', '_blank')
    win.document.write(`
      <!DOCTYPE html><html lang="pl"><head>
      <meta charset="UTF-8">
      <title>Wycena — ${q.pomieszczenie} — ${q.miasto}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; max-width: 760px; margin: 40px auto; padding: 0 24px; color: #1C1917; font-size: 14px; line-height: 1.5; }
        .header { display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 2px solid #C85A2A; padding-bottom: 20px; margin-bottom: 28px; }
        .logo { font-size: 22px; font-weight: 900; } .logo span { color: #C85A2A; }
        .meta h1 { font-size: 18px; font-weight: 700; } .meta p { color: #78716C; font-size: 12px; margin-top: 4px; }
        .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #A8A29E; font-weight: 700; margin: 24px 0 10px; }
        .summary { background: #FAF8F5; border: 1px solid #E7E0D8; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #44403C; }
        table { width: 100%; border-collapse: collapse; } tr { border-bottom: 1px solid #E7E0D8; } td { padding: 10px 0; } td:last-child { text-align: right; font-weight: 600; }
        .total-row td { background: #1C1917; color: white; padding: 12px 10px; font-weight: 700; font-size: 15px; }
        .total-row td:first-child { border-radius: 6px 0 0 6px; } .total-row td:last-child { border-radius: 0 6px 6px 0; color: #E8A07A; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 8px; }
        .item { display: flex; gap: 8px; font-size: 13px; margin: 6px 0; align-items: flex-start; }
        .warn { color: #D97706; font-size: 15px; flex-shrink: 0; } .ok { color: #16A34A; font-size: 15px; flex-shrink: 0; }
        .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #E7E0D8; font-size: 11px; color: #A8A29E; text-align: center; }
        @media print { @page { margin: 20mm; } body { margin: 0; } }
      </style></head><body>
      <div class="header">
        <div class="logo">Wyceń<span>To</span></div>
        <div class="meta"><h1>${q.pomieszczenie} · ${q.miasto}</h1><p>${new Date(q.created_at).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
      </div>
      <div class="label">Analiza zdjęcia</div>
      <div class="summary">${q.wynik.summary}</div>
      <div class="label">Kosztorys</div>
      <table>
        ${q.wynik.items.map(item => `<tr><td>${item.name}</td><td>${item.min.toLocaleString('pl-PL')} – ${item.max.toLocaleString('pl-PL')} ${item.jednostka}</td></tr>`).join('')}
        <tr class="total-row"><td>Łącznie</td><td>${q.wynik.total_min.toLocaleString('pl-PL')} – ${q.wynik.total_max.toLocaleString('pl-PL')} zł</td></tr>
      </table>
      <div class="two-col">
        <div><div class="label">Na co uważać</div>${(q.wynik.uwagi || []).map(u => `<div class="item"><span class="warn">⚠</span><span>${u}</span></div>`).join('')}</div>
        <div><div class="label">Warto dodać przy okazji</div>${(q.wynik.co_warto_dodac || []).map(c => `<div class="item"><span class="ok">✓</span><span>${c}</span></div>`).join('')}</div>
      </div>
      <div class="footer">Wycena wygenerowana przez WyceńTo · wycento.pl · Wycena ma charakter orientacyjny i nie stanowi oferty handlowej</div>
      <script>window.onload = function() { window.print(); }</script>
      </body></html>
    `)
    win.document.close()
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? '?'

  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      {/* NAV */}
      <nav className="bg-white border-b border-[#E7E0D8] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#A8A29E] hidden sm:block">{user?.email}</span>
            <div className="w-8 h-8 bg-[#C85A2A] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors border border-[#E7E0D8] px-3 py-1.5 rounded-lg hover:bg-[#F2EDE6]"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#1C1917]">Dzień dobry!</h1>
          <p className="text-[#78716C] mt-1">Co dziś wyceniamy?</p>
        </div>

        {/* KARTY STATYSTYK */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest">
                {plan === 'pro' ? 'Plan Pro' : 'Pozostałe wyceny'}
              </span>
              <div className="w-9 h-9 bg-[#F5EBE4] rounded-xl flex items-center justify-center text-lg">📊</div>
            </div>
            {credits === null ? (
              <div className="h-10 bg-[#F2EDE6] rounded-lg animate-pulse" />
            ) : plan === 'pro' ? (
              <div className="font-serif text-4xl font-bold text-[#1C1917]">∞</div>
            ) : (
              <>
                <div className="font-serif text-4xl font-bold text-[#1C1917]">
                  {credits}
                  <span className="text-xl text-[#A8A29E] font-sans font-normal">/3</span>
                </div>
                <div className="mt-3 h-1.5 bg-[#F2EDE6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C85A2A] rounded-full transition-all duration-700"
                    style={{ width: `${((3 - credits) / 3) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-[#A8A29E] mt-2">{3 - credits} z 3 wykorzystanych</div>
              </>
            )}
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest">Twój plan</span>
              <div className="w-9 h-9 bg-[#F5EBE4] rounded-xl flex items-center justify-center text-lg">⭐</div>
            </div>
            <div className="font-serif text-2xl font-bold text-[#1C1917] capitalize mb-2">{plan}</div>
            {plan === 'free' ? (
              <button
                onClick={() => router.push('/pro')}
                className="text-xs text-[#C85A2A] font-semibold hover:underline text-left"
              >
                Przejdź na Pro — 39 zł/mies →
              </button>
            ) : (
              <span className="text-xs text-green-600 font-semibold">Aktywny ✓</span>
            )}
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest">Wszystkich wycen</span>
              <div className="w-9 h-9 bg-[#F5EBE4] rounded-xl flex items-center justify-center text-lg">📋</div>
            </div>
            <div className="font-serif text-4xl font-bold text-[#1C1917]">{totalQuotes}</div>
            <div className="text-xs text-[#A8A29E] mt-2">od początku</div>
          </div>
        </div>

        {/* CTA — NOWA WYCENA */}
        {credits === 0 && plan === 'free' ? (
          <div className="relative bg-[#1C1917] rounded-2xl p-8 mb-8 overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-2">Limit wycen</div>
                <h2 className="font-serif text-2xl font-bold text-white mb-2">Wykorzystałeś 3/3 wyceny</h2>
                <p className="text-[#78716C] text-sm max-w-xs">Przejdź na Pro — nielimitowane wyceny i pobieranie PDF za 39 zł/mies.</p>
              </div>
              <button
                onClick={() => router.push('/pro')}
                className="flex-shrink-0 bg-[#C85A2A] text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-[#B04E24] transition-all shadow-lg shadow-[#C85A2A]/20 whitespace-nowrap"
              >
                Przejdź na Pro →
              </button>
            </div>
          </div>
        ) : (
          <div className="relative bg-[#1C1917] rounded-2xl p-8 mb-8 overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-2">Nowa wycena</div>
                <h2 className="font-serif text-2xl font-bold text-white mb-2">Wyceń swój remont</h2>
                <p className="text-[#78716C] text-sm max-w-xs">Zrób zdjęcie pomieszczenia, podaj miasto. Wynik w 30 sekund.</p>
              </div>
              <button
                onClick={() => router.push('/wycena')}
                className="flex-shrink-0 bg-[#C85A2A] text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-[#B04E24] transition-all shadow-lg shadow-[#C85A2A]/20 flex items-center gap-2 whitespace-nowrap"
              >
                <span>📸</span> Wyceń teraz
              </button>
            </div>
          </div>
        )}

        {/* HISTORIA */}
        <div className="bg-white border border-[#E7E0D8] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E7E0D8]">
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">Historia wycen</h2>
          </div>

          {loading ? (
            <div className="divide-y divide-[#E7E0D8]">
              {[1, 2, 3].map(i => (
                <div key={i} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F2EDE6] rounded-xl animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 bg-[#F2EDE6] rounded animate-pulse w-40 mb-2" />
                    <div className="h-3 bg-[#F2EDE6] rounded animate-pulse w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : quotes.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl mb-4">🏗️</div>
              <div className="font-semibold text-[#1C1917] mb-2">Brak wycen</div>
              <div className="text-sm text-[#A8A29E] mb-6">Twoje wyceny pojawią się tutaj po pierwszej analizie</div>
              <button
                onClick={() => router.push('/wycena')}
                className="bg-[#C85A2A] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#B04E24] transition"
              >
                Zrób pierwszą wycenę →
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#E7E0D8]">
              {quotes.map((q) => (
                <div key={q.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#FAF8F5] transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F2EDE6] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      {EMOJI[q.pomieszczenie] ?? '🏠'}
                    </div>
                    <div>
                      <div className="font-medium text-[#1C1917] text-sm">{q.pomieszczenie}</div>
                      <div className="text-xs text-[#A8A29E]">{q.miasto} · {formatDate(q.created_at)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif font-bold text-[#1C1917] text-sm">
                      {q.wynik.total_min?.toLocaleString('pl-PL')} – {q.wynik.total_max?.toLocaleString('pl-PL')} zł
                    </div>
                    {plan === 'pro' && (
                      <button onClick={() => handlePDF(q)} className="text-xs text-[#C85A2A] font-medium mt-0.5 hover:underline">PDF ↓</button>
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
