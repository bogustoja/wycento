import { SeoFooter, FaqJsonLd } from '../components/SeoLanding'
import SiteHeader from '../components/SiteHeader'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ile kosztuje remont łazienki? Ceny 2026 — WyceńTo',
  description: 'Sprawdź aktualne ceny remontu łazienki w 2026 roku. Widełki robocizny, materiałów i ukrytych kosztów. Wycena ze zdjęcia w 30 sekund.',
  keywords: ['ile kosztuje remont łazienki', 'koszt remontu łazienki 2026', 'wycena remontu łazienki', 'kosztorys łazienki', 'ceny remontu łazienki'],
}

const ITEMS = [
  { name: 'Skucie starych płytek i wywóz gruzu', min: 1800, max: 3500 },
  { name: 'Hydroizolacja, gruntowanie i wyrównanie podłoża', min: 1200, max: 2500 },
  { name: 'Glazura i terakota — robocizna', min: 3500, max: 7500 },
  { name: 'Hydraulika (punkty wodne, odpływy, stelaż WC)', min: 2500, max: 5500 },
  { name: 'Biały montaż (WC, umywalka, prysznic lub wanna)', min: 1200, max: 3000 },
  { name: 'Elektryka (oświetlenie, gniazdka, wentylator)', min: 600, max: 1500 },
  { name: 'Materiały: płytki, chemia, armatura (średni standard)', min: 7000, max: 14000 },
]

const FAQ = [
  {
    q: 'Ile kosztuje remont łazienki 4m²?',
    a: 'Pełny remont łazienki 4 m² w średnim standardzie to zwykle 16 000–25 000 zł razem z materiałami. W dużych miastach (Warszawa, Kraków, Wrocław) ceny są o 15–25% wyższe niż w mniejszych miejscowościach.',
  },
  {
    q: 'Ile kosztuje remont łazienki 6m²?',
    a: 'Remont łazienki 6 m² kosztuje orientacyjnie 20 000–36 000 zł z materiałami. Największy wpływ mają zakres prac hydraulicznych, format płytek i klasa armatury. W starym bloku lub kamienicy z wymianą pionów łatwo przekroczyć 36 000 zł.',
  },
  {
    q: 'Co jest najdroższe w remoncie łazienki?',
    a: 'Robocizna glazurnicza i hydrauliczna to zazwyczaj 50–60% całkowitego kosztu. Ukryte koszty takie jak wywóz gruzu, folia uszczelniająca czy gruntowanie bywają pomijane w pierwszych wycenach.',
  },
  {
    q: 'Ile trwa remont łazienki?',
    a: 'Standardowy remont łazienki trwa 2–4 tygodnie. Przy bardziej skomplikowanych pracach hydraulicznych lub niestandardowych formatach płytek czas może się wydłużyć.',
  },
  {
    q: 'Czy wycena ze zdjęcia jest dokładna?',
    a: 'Wycena ze zdjęcia jest orientacyjna — taka, jaką doświadczony wykonawca poda „z głowy” po obejrzeniu pomieszczenia. Dlatego podajemy widełki min–max, a nie jedną liczbę. Dokładny kosztorys da dopiero ekipa po wizycie na miejscu.',
  },
]

export default function RemontLazienki() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <FaqJsonLd faq={FAQ} />
      <SiteHeader cta={{ href: '/login', label: 'Wyceń swoją łazienkę →' }} />

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* HERO */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-surface border border-line rounded-full px-3 py-1 mb-6 text-xs font-semibold text-muted">
            Aktualne ceny 2026
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            Ile kosztuje remont łazienki?<br />
            <span className="text-accent-2">Ceny i widełki na 2026 rok</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            Remont łazienki to jedna z najczęstszych i najbardziej kosztownych inwestycji w mieszkaniu. Zebraliśmy aktualne stawki robocizny i materiałów z całej Polski, żebyś wiedział czego się spodziewać — zanim zadzwonisz po pierwszą ofertę.
          </p>
        </div>

        {/* SZYBKA WYCENA CTA */}
        <div className="bg-surface rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-2">Wycena ze zdjęcia</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Zrób zdjęcie swojej łazienki</div>
            <div className="text-sm text-muted">Nasz system wyceni remont z cenami dla Twojego miasta w 30 sekund.</div>
          </div>
          <a
            href="/login"
            className="flex-shrink-0 bg-accent text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-accent-hover transition shadow-lg shadow-accent/30 whitespace-nowrap"
          >
            Wyceń za darmo →
          </a>
        </div>

        {/* WIDEŁKI CENOWE */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Orientacyjne koszty remontu łazienki</h2>
          <p className="text-muted text-sm mb-6">Ceny dla łazienki o powierzchni 5–7m². Przy wyższym standardzie lub dużych miastach spodziewaj się wyższego przedziału.</p>

          <div className="bg-surface border border-line rounded-2xl overflow-hidden">
            <div className="divide-y divide-line">
              {ITEMS.map((item) => (
                <div key={item.name} className="px-6 py-4 flex justify-between items-center">
                  <span className="text-sm text-ink-2">{item.name}</span>
                  <span className="font-semibold text-sm text-ink tabular-nums whitespace-nowrap ml-4">
                    {item.min.toLocaleString('pl-PL')} – {item.max.toLocaleString('pl-PL')} zł
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 bg-surface flex justify-between items-center">
              <span className="font-semibold text-white">Łącznie (orientacyjnie)</span>
              <span className="font-serif text-xl font-bold text-accent-2">17 800 – 37 500 zł</span>
            </div>
          </div>

          <p className="text-xs text-muted mt-3">* Podane widełki dotyczą standardowego zakresu prac. Ceny w Warszawie, Wrocławiu i Krakowie są zazwyczaj 15–25% wyższe niż w mniejszych miastach. Stan na listopad 2026.</p>
        </section>

        {/* CO WPŁYWA NA CENĘ */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Co najbardziej wpływa na cenę remontu łazienki?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Lokalizacja', desc: 'Stawki robocizny w dużych miastach są o 15–25% wyższe niż w mniejszych miejscowościach. Warszawa jest zwykle na górnej granicy.' },
              { title: 'Zakres prac hydraulicznych', desc: 'Przeniesienie rur, zmiana układu armatury czy wymiana pionów to najdroższa część remontu. Sama wymiana baterii to 200–500 zł.' },
              { title: 'Format i gatunek płytek', desc: 'Duże formaty (60×60 i większe) wymagają więcej pracy i generują więcej odpadu. Drogie płytki włoskie czy hiszpańskie znacznie podnoszą koszty materiałów.' },
              { title: 'Stan istniejący', desc: 'Jeśli pod starymi płytkami kryją się wilgoć, grzyb lub nierówne ściany — koszty przygotowania podłoża mogą zaskoczyć. Dobre zdjęcie pomaga to wycenić z wyprzedzeniem.' },
              { title: 'Termin wykonania', desc: 'Pilne zlecenia zwykle kosztują więcej. Ekipy z dłuższym terminem oczekiwania zazwyczaj pracują lepiej i taniej.' },
              { title: 'Ukryte koszty', desc: 'Wywóz gruzu, folia uszczelniająca (hydroizolacja), taśmy uszczelniające, kleje, fugi, silikon — często pomijane w pierwszych wycenach, a razem z transportem i wniesieniem materiałów mogą wynieść 2 000–4 000 zł.' },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-line rounded-xl p-5">
                <div aria-hidden="true" className="mb-3 h-1 w-8 rounded-full bg-accent-2" />
                <div className="font-semibold text-ink mb-1 text-sm">{item.title}</div>
                <div className="text-xs text-muted leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Najczęstsze pytania</h2>
          <div className="bg-surface border border-line rounded-2xl divide-y divide-line">
            {FAQ.map((item, i) => (
              <details key={i} className="group px-6 py-5 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-ink text-sm select-none list-none">
                  {item.q}
                  <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-surface-2 flex items-center justify-center text-accent-2 text-xs font-bold group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bg-surface-2 border border-line rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">Wycena ze zdjęcia Twojej łazienki</h2>
          <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
            Zamiast tabelek — wrzuć zdjęcie swojej łazienki i podaj miasto. Nasz system poda widełki dopasowane do Twojej lokalizacji w 30 sekund. 3 pierwsze wyceny za darmo.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-hover transition shadow-lg shadow-accent/30"
          >
            Wyceń moją łazienkę za darmo →
          </a>
          <div className="flex justify-center gap-5 mt-4 text-xs text-muted">
            <span>✓ Bez karty kredytowej</span>
            <span>✓ Wynik w 30 sekund</span>
            <span>✓ 3 wyceny gratis</span>
          </div>
        </section>
      </div>

      <SeoFooter current="/ile-kosztuje-remont-lazienki" />
    </main>
  )
}
