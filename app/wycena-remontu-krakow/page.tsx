import LogoIcon from '../components/LogoIcon'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wycena remontu Kraków — ceny 2026 | WyceńTo',
  description: 'Ile kosztuje remont w Krakowie? Aktualne stawki robocizny 2026. Różnice między dzielnicami — Stare Miasto, Krowodrza, Nowa Huta. Wycena ze zdjęcia.',
  keywords: ['wycena remontu Kraków', 'ile kosztuje remont Kraków', 'ceny remontu Kraków 2026', 'kosztorys remontu Kraków', 'remont mieszkania Kraków cena'],
}

const DZIELNICE = [
  { name: 'Stare Miasto, Kazimierz, Podgórze', mnoznik: '+20–30%' },
  { name: 'Krowodrza, Bronowice, Zwierzyniec', mnoznik: '+15–25%' },
  { name: 'Prądnik Czerwony, Czyżyny', mnoznik: '+10–18%' },
  { name: 'Nowa Huta, Swoszowice', mnoznik: '+5–12%' },
]

const ITEMS = [
  { name: 'Glazurnik — płytki standardowe (m²)', min: 105, max: 170, jednostka: 'zł/m²' },
  { name: 'Malarz — 2 warstwy (m² ściany)', min: 22, max: 35, jednostka: 'zł/m²' },
  { name: 'Hydraulik (punkt wodny lub kanalizacyjny)', min: 350, max: 850, jednostka: 'zł/pkt' },
  { name: 'Elektryk (nowy punkt)', min: 190, max: 300, jednostka: 'zł/pkt' },
  { name: 'Posadzkarz — panele (m²)', min: 45, max: 70, jednostka: 'zł/m²' },
  { name: 'Wywóz gruzu (m³)', min: 180, max: 380, jednostka: 'zł/m³' },
]

export default function WycenaKrakow() {
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
            Wyceń remont w Krakowie →
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E7E0D8] rounded-full px-3 py-1 mb-6 text-xs font-semibold text-[#78716C]">
            📍 Kraków · Ceny 2026
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            Wycena remontu w Krakowie —<br />
            <span className="text-[#C85A2A]">ile to naprawdę kosztuje?</span>
          </h1>
          <p className="text-lg text-[#78716C] leading-relaxed max-w-2xl">
            Kraków jest drugim najdroższym miastem remontowym w Polsce. Stawki w centrum są zbliżone do Warszawy, ale poza Starym Miastem różnica jest już znacząca. Zebraliśmy aktualne dane dla każdej dzielnicy.
          </p>
        </div>

        <div className="bg-[#1C1917] rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-2">Wycena ze zdjęcia · Kraków</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Podaj adres, wrzuć zdjęcie</div>
            <div className="text-sm text-[#78716C]">Wycena z cenami dla Twojej dzielnicy — 30 sekund, za darmo.</div>
          </div>
          <a href="/login" className="flex-shrink-0 bg-[#C85A2A] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20 whitespace-nowrap">
            Wyceń za darmo →
          </a>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Stawki robocizny w Krakowie 2026</h2>
          <p className="text-[#78716C] text-sm mb-6">Widełki dla sprawdzonych ekip z Krakowa, stan na listopad 2026. Ceny niższe niż podane często oznaczają brak doświadczenia lub pracę bez faktury.</p>
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
          <h2 className="font-serif text-2xl font-bold mb-2">Różnice między dzielnicami Krakowa</h2>
          <p className="text-[#78716C] text-sm mb-6">Porównanie do średniej krajowej. Ekipy z centrum mają wyższe koszty dojazdu i parkowania.</p>
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
          <h2 className="font-serif text-2xl font-bold mb-6">Przykładowe koszty remontów w Krakowie</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { room: 'Łazienka 5m²', range: '18 000 – 30 000 zł', note: 'z materiałami, średni standard' },
              { room: 'Kuchnia 12m²', range: '26 000 – 50 000 zł', note: 'ze sprzętem i meblami' },
              { room: 'Pokój 16m²', range: '7 000 – 16 000 zł', note: 'malowanie + podłoga + gładzie' },
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
          <h2 className="font-serif text-2xl font-bold mb-3">Wycena Twojego remontu w Krakowie</h2>
          <p className="text-[#78716C] text-sm mb-6 max-w-lg mx-auto">
            Wrzuć zdjęcie pomieszczenia i wpisz "Kraków". Nasz system poda widełki z uwzględnieniem lokalnych stawek — 3 pierwsze wyceny za darmo.
          </p>
          <a href="/login" className="inline-flex items-center gap-2 bg-[#C85A2A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20">
            Wyceń mój remont w Krakowie →
          </a>
          <div className="flex justify-center gap-5 mt-4 text-xs text-[#A8A29E]">
            <span>✓ Bez karty kredytowej</span><span>✓ Wynik w 30 sekund</span><span>✓ 3 wyceny gratis</span>
          </div>
        </section>
      </div>

      <footer className="bg-white border-t border-[#E7E0D8] mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <LogoIcon size={24} className="mr-2" />
            <span className="font-serif text-lg font-bold">Wyceń</span>
            <span className="font-serif text-lg font-bold text-[#C85A2A]">To</span>
            <span className="text-[#A8A29E] text-sm ml-2">· Made in Poland 🇵🇱</span>
          </div>
          <div className="flex gap-5 text-sm text-[#78716C]">
            <a href="/ile-kosztuje-remont-lazienki" className="hover:text-[#1C1917]">Remont łazienki</a>
            <a href="/ile-kosztuje-remont-kuchni" className="hover:text-[#1C1917]">Remont kuchni</a>
            <a href="/wycena-remontu-warszawa" className="hover:text-[#1C1917]">Warszawa</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
