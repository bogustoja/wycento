'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [credits, setCredits] = useState(3)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
      else setUser(user)
    }
    getUser()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const recentQuotes = [
    { id: 1, name: 'Remont kuchni', location: 'Warszawa, Ursus', price: '12 000 – 18 000 zł', date: '10 maj 2026', emoji: '🍳' },
    { id: 2, name: 'Łazienka 6m²', location: 'Kraków, Krowodrza', price: '6 500 – 9 000 zł', date: '8 maj 2026', emoji: '🚿' },
    { id: 3, name: 'Malowanie salonu', location: 'Warszawa, Mokotów', price: '1 800 – 2 400 zł', date: '5 maj 2026', emoji: '🎨' },
  ]

  return (
    <main className="min-h-screen" style={{backgroundColor: '#FAF8F5', backgroundImage: 'radial-gradient(#E7E0D8 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
      {/* NAV */}
      <nav className="bg-white border-b border-[#E7E0D8] px-8 h-16 flex items-center justify-between">
        <div>
          <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
          <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm text-[#78716C]">{user?.email}</span>
          <button onClick={handleLogout} className="text-sm text-[#78716C] hover:text-[#1C1917] transition">
            Wyloguj
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-10">

        {/* POWITANIE */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[#1C1917] mb-1">Dzień dobry!</h1>
          <p className="text-[#78716C]">Co dziś wyceniamy?</p>
        </div>

        {/* STATYSTYKI */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-[#E7E0D8] rounded-xl p-5">
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-2">Wyceny w tym miesiącu</div>
            <div className="font-serif text-4xl font-bold text-[#1C1917]">0<span className="text-xl text-[#78716C]">/3</span></div>
            <div className="bg-[#F2EDE6] rounded-full h-1.5 mt-3">
              <div className="bg-[#C85A2A] rounded-full h-1.5" style={{ width: '0%' }} />
            </div>
          </div>
          <div className="bg-white border border-[#E7E0D8] rounded-xl p-5">
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-2">Twój plan</div>
            <div className="font-serif text-2xl font-bold text-[#1C1917] mt-2">Free</div>
            <button className="text-xs text-[#C85A2A] font-semibold mt-2 hover:underline">
              Przejdź na Pro →
            </button>
          </div>
          <div className="bg-white border border-[#E7E0D8] rounded-xl p-5">
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-2">Wszystkich wycen</div>
            <div className="font-serif text-4xl font-bold text-[#1C1917]">0</div>
            <div className="text-xs text-[#78716C] mt-2">od początku</div>
          </div>
        </div>

        {/* NOWA WYCENA */}
        <div className="bg-[#1C1917] rounded-xl p-8 mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white mb-2">Nowa wycena</h2>
            <p className="text-[#A8A29E] text-sm max-w-sm">
              Zrób zdjęcie pomieszczenia, podaj lokalizację. Wynik w 30 sekund.
            </p>
          </div>
          <button onClick={() => router.push('/wycena')} className="bg-[#C85A2A] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#B04E24] transition flex items-center gap-3 whitespace-nowrap">
            <span className="text-2xl">📸</span>
            Wyceń teraz
          </button>
        </div>

        {/* HISTORIA */}
        <div className="bg-white border border-[#E7E0D8] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E7E0D8] flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">Ostatnie wyceny</h2>
            <span className="text-xs text-[#78716C]">Przykładowe dane</span>
          </div>
          <div className="divide-y divide-[#E7E0D8]">
            {recentQuotes.map((q) => (
              <div key={q.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#FAF8F5] transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F2EDE6] rounded-lg flex items-center justify-center text-xl">
                    {q.emoji}
                  </div>
                  <div>
                    <div className="font-medium text-[#1C1917] text-sm">{q.name}</div>
                    <div className="text-xs text-[#78716C]">{q.location} · {q.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif font-bold text-[#1C1917] text-sm">{q.price}</div>
                  <div className="text-xs text-[#C85A2A] font-medium mt-0.5">Zobacz PDF</div>
                </div>
              </div>
            ))}
          </div>
        </div>
{/* KONTAKT */}
        <div className="mt-8 bg-white border border-[#E7E0D8] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E7E0D8]">
            <h2 className="font-serif text-lg font-bold text-[#1C1917]">Potrzebujesz pomocy?</h2>
<p className="text-sm text-[#78716C] mt-1">Skontaktuj się z nami — odpowiadamy w godzinach pracy</p>          </div>
          <div className="px-6 py-5 grid grid-cols-3 gap-4">
            <a href="mailto:kontakt@wycento.pl" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FAF8F5] transition">
              <div className="w-9 h-9 bg-[#F5EBE4] rounded-lg flex items-center justify-center text-lg">✉️</div>
              <div>
                <div className="text-xs font-semibold text-[#1C1917]">Email</div>
                <div className="text-xs text-[#78716C]">kontakt@wycento.pl</div>
              </div>
            </a>
            <a href="https://wycento.pl" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FAF8F5] transition">
              <div className="w-9 h-9 bg-[#F5EBE4] rounded-lg flex items-center justify-center text-lg">🌐</div>
              <div>
                <div className="text-xs font-semibold text-[#1C1917]">Strona</div>
                <div className="text-xs text-[#78716C]">wycento.pl</div>
              </div>
            </a>
            <div className="flex items-center gap-3 p-3 rounded-lg">
              <div className="w-9 h-9 bg-[#F5EBE4] rounded-lg flex items-center justify-center text-lg">⏰</div>
              <div>
                <div className="text-xs font-semibold text-[#1C1917]">Godziny</div>
                <div className="text-xs text-[#78716C]">Pon–Pt, 9:00–17:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}