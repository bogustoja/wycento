import { SeoFooter } from '../components/SeoLanding'
import LogoIcon from '../components/LogoIcon'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wycena remontu Warszawa — ceny 2026 | WyceńTo',
  description: 'Ile kosztuje remont w Warszawie? Aktualne stawki robocizny i materiałów na 2026 rok. Wycena ze zdjęcia w 30 sekund.',
  keywords: ['wycena remontu Warszawa', 'ile kosztuje remont Warszawa', 'ceny remontu Warszawa 2026', 'kosztorys remontu Warszawa', 'remont mieszkania Warszawa cena'],
}

const DZIELNICE = [
  { name: 'Śródmieście, Mokotów, Żoliborz', mnoznik: '+25–35%' },
  { name: 'Ursynów, Wilanów, Wola', mnoznik: '+20–30%' },
  { name: 'Praga Południe, Białołęka', mnoznik: '+15–25%' },
  { name: 'Targówek, Rembertów, Wawer', mnoznik: '+10–20%' },
]

const ITEMS = [
  { name: 'Glazurnik — płytki standardowe (m²)', min: 120, max: 280, jednostka: 'zł/m²' },
  { name: 'Malarz — 2 warstwy (m² ściany)', min: 30, max: 50, jednostka: 'zł/m²' },
  { name: 'Hydraulik (punkt wodny lub kanalizacyjny)', min: 400, max: 1000, jednostka: 'zł/pkt' },
  { name: 'Elektryk (nowy punkt)', min: 180, max: 350, jednostka: 'zł/pkt' },
  { name: 'Posadzkarz — panele (m²)', min: 50, max: 90, jednostka: 'zł/m²' },
  { name: 'Wywóz gruzu (m³)', min: 200, max: 450, jednostka: 'zł/m³' },
]

export default function WycenaWarszawa() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <nav className="bg-white border-b border-[#E7E0D8] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <a href="/login" className="bg-[#C85A2A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B04E24] transition">
            Wyceń remont w Warszawie →
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E7E0D8] rounded-full px-3 py-1 mb-6 text-xs font-semibold text-[#78716C]">
            📍 Warszawa · Ceny 2026
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            Wycena remontu w Warszawie —<br />
            <span className="text-[#C85A2A]">ile to naprawdę kosztuje?</span>
          </h1>
          <p className="text-lg text-[#78716C] leading-relaxed max-w-2xl">
            Warszawa jest najdroższym miastem remontowym w Polsce. Stawki robocizny są tu zwykle 15–35% wyższe niż średnia krajowa — i różnią się znacząco między dzielnicami. Poniżej aktualne widełki, żebyś wiedział, czego się spodziewać.
          </p>
        </div>

        <div className="bg-[#1C1917] rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-2">Wycena ze zdjęcia · Warszawa</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Wrzuć zdjęcie, wpisz miasto</div>
            <div className="text-sm text-[#78716C]">Widełki z podziałem na robociznę i materiały w ok. 30 sekund, za darmo.</div>
          </div>
          <a href="/login" className="flex-shrink-0 bg-[#C85A2A] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20 whitespace-nowrap">
            Wyceń za darmo →
          </a>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Stawki robocizny w Warszawie 2026</h2>
          <p className="text-[#78716C] text-sm mb-6">Widełki dla doświadczonych ekip, stan na listopad 2026. Tańsze oferty zazwyczaj oznaczają brak doświadczenia lub szarą strefę bez gwarancji.</p>
          <div className="bg-white border border-[#E7E0D8] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[#E7E0D8]">
              {ITEMS.map((item) => (
                <div key={item.name} className="px-6 py-4 flex justify-between items-center">
                  <span className="text-sm text-[#44403C]">{item.name}</span>
                  <span className="font-semibold text-sm text-[#1C1917] tabular-nums whitespace-nowrap ml-4">
                    {item.min} – {item.max} {item.jednostka}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Różnice między dzielnicami</h2>
          <p className="text-[#78716C] text-sm mb-6">Porównanie do średniej krajowej. Ekipy z centralnych dzielnic pracują drożej — krótszy dojazd, wyższe koszty życia wykonawców.</p>
          <div className="bg-white border border-[#E7E0D8] rounded-2xl overflow-hidden">
            <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E7E0D8] grid grid-cols-2">
              <span className="text-xs font-semibold text-[#A8A29E] uppercase tracking-wide">Dzielnica</span>
              <span className="text-xs font-semibold text-[#A8A29E] uppercase tracking-wide text-right">Różnica vs. średnia krajowa</span>
            </div>
            <div className="divide-y divide-[#E7E0D8]">
              {DZIELNICE.map((d) => (
                <div key={d.name} className="px-6 py-4 grid grid-cols-2 items-center">
                  <span className="text-sm text-[#44403C]">{d.name}</span>
                  <span className="text-sm font-semibold text-[#C85A2A] text-right">{d.mnoznik}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Przykładowe koszty remontów w Warszawie</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { room: 'Łazienka 5m²', range: '22 000 – 36 000 zł', note: 'z materiałami, średni standard' },
              { room: 'Kuchnia 12m²', range: '30 000 – 60 000 zł', note: 'ze sprzętem i meblami' },
              { room: 'Pokój 16m²', range: '8 000 – 18 000 zł', note: 'malowanie + podłoga + gładzie' },
            ].map((item) => (
              <div key={item.room} className="bg-white border border-[#E7E0D8] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#A8A29E] uppercase tracking-wide mb-2">{item.room}</div>
                <div className="font-serif text-xl font-bold text-[#1C1917] mb-1">{item.range}</div>
                <div className="text-xs text-[#78716C]">{item.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F2EDE6] border border-[#E7E0D8] rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">Wycena Twojego remontu w Warszawie</h2>
          <p className="text-[#78716C] text-sm mb-6 max-w-lg mx-auto">
            Wrzuć zdjęcie pomieszczenia i wpisz "Warszawa". Nasz system poda widełki z uwzględnieniem lokalnych stawek — 3 pierwsze wyceny za darmo.
          </p>
          <a href="/login" className="inline-flex items-center gap-2 bg-[#C85A2A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20">
            Wyceń mój remont w Warszawie →
          </a>
          <div className="flex justify-center gap-5 mt-4 text-xs text-[#A8A29E]">
            <span>✓ Bez karty kredytowej</span><span>✓ Wynik w 30 sekund</span><span>✓ 3 wyceny gratis</span>
          </div>
        </section>
      </div>

      <SeoFooter current="/wycena-remontu-warszawa" />
    </main>
  )
}
