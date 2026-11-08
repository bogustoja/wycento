import { SeoFooter } from '../components/SeoLanding'
import SiteHeader from '../components/SiteHeader'

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
    <main className="min-h-screen bg-bg text-ink">
      <SiteHeader cta={{ href: '/login', label: 'Wyceń remont w Warszawie →' }} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-surface border border-line rounded-full px-3 py-1 mb-6 text-xs font-semibold text-muted">
            Warszawa · Ceny 2026
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            Wycena remontu w Warszawie —<br />
            <span className="text-accent-2">ile to naprawdę kosztuje?</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            Warszawa jest najdroższym miastem remontowym w Polsce. Stawki robocizny są tu zwykle 15–35% wyższe niż średnia krajowa — i różnią się znacząco między dzielnicami. Poniżej aktualne widełki, żebyś wiedział, czego się spodziewać.
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-2">Wycena ze zdjęcia · Warszawa</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Wrzuć zdjęcie, wpisz miasto</div>
            <div className="text-sm text-muted">Widełki z podziałem na robociznę i materiały w ok. 30 sekund, za darmo.</div>
          </div>
          <a href="/login" className="flex-shrink-0 bg-accent text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-accent-hover transition shadow-lg shadow-accent/30 whitespace-nowrap">
            Wyceń za darmo →
          </a>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Stawki robocizny w Warszawie 2026</h2>
          <p className="text-muted text-sm mb-6">Widełki dla doświadczonych ekip, stan na listopad 2026. Tańsze oferty zazwyczaj oznaczają brak doświadczenia lub szarą strefę bez gwarancji.</p>
          <div className="bg-surface border border-line rounded-2xl overflow-hidden">
            <div className="divide-y divide-line">
              {ITEMS.map((item) => (
                <div key={item.name} className="px-6 py-4 flex justify-between items-center">
                  <span className="text-sm text-ink-2">{item.name}</span>
                  <span className="font-semibold text-sm text-ink tabular-nums whitespace-nowrap ml-4">
                    {item.min} – {item.max} {item.jednostka}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Różnice między dzielnicami</h2>
          <p className="text-muted text-sm mb-6">Porównanie do średniej krajowej. Ekipy z centralnych dzielnic pracują drożej — krótszy dojazd, wyższe koszty życia wykonawców.</p>
          <div className="bg-surface border border-line rounded-2xl overflow-hidden">
            <div className="px-6 py-3 bg-bg border-b border-line grid grid-cols-2">
              <span className="text-xs font-semibold text-muted uppercase tracking-wide">Dzielnica</span>
              <span className="text-xs font-semibold text-muted uppercase tracking-wide text-right">Różnica vs. średnia krajowa</span>
            </div>
            <div className="divide-y divide-line">
              {DZIELNICE.map((d) => (
                <div key={d.name} className="px-6 py-4 grid grid-cols-2 items-center">
                  <span className="text-sm text-ink-2">{d.name}</span>
                  <span className="text-sm font-semibold text-accent-2 text-right">{d.mnoznik}</span>
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
              <div key={item.room} className="bg-surface border border-line rounded-xl p-5">
                <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{item.room}</div>
                <div className="font-serif text-xl font-bold text-ink mb-1">{item.range}</div>
                <div className="text-xs text-muted">{item.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-2 border border-line rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">Wycena Twojego remontu w Warszawie</h2>
          <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
            Wrzuć zdjęcie pomieszczenia i wpisz „Warszawa”. Nasz system poda widełki z uwzględnieniem lokalnych stawek — 3 pierwsze wyceny za darmo.
          </p>
          <a href="/login" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-hover transition shadow-lg shadow-accent/30">
            Wyceń mój remont w Warszawie →
          </a>
          <div className="flex justify-center gap-5 mt-4 text-xs text-muted">
            <span>✓ Bez karty kredytowej</span><span>✓ Wynik w 30 sekund</span><span>✓ 3 wyceny gratis</span>
          </div>
        </section>
      </div>

      <SeoFooter current="/wycena-remontu-warszawa" />
    </main>
  )
}
