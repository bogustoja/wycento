import { SeoFooter, FaqJsonLd } from '../components/SeoLanding'
import SiteHeader from '../components/SiteHeader'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ile kosztuje remont kuchni? Ceny 2026 — WyceńTo',
  description: 'Aktualne ceny remontu kuchni w 2026 roku. Meble, AGD, glazura, hydraulika — wszystko w jednym zestawieniu. Wycena ze zdjęcia w 30 sekund.',
  keywords: ['ile kosztuje remont kuchni', 'koszt remontu kuchni 2026', 'wycena remontu kuchni', 'kosztorys kuchni', 'ceny remontu kuchni'],
}

const ITEMS = [
  { name: 'Meble kuchenne (gotowe moduły lub zabudowa na wymiar)', min: 5000, max: 20000 },
  { name: 'Blat roboczy (laminat/granit/kompozyt)', min: 800, max: 4000 },
  { name: 'Glazura i terakota — robocizna', min: 2000, max: 4000 },
  { name: 'Hydraulika (podłączenia AGD, zlewozmywak)', min: 1200, max: 3000 },
  { name: 'Elektryka (oświetlenie, gniazdka, okap)', min: 1000, max: 2200 },
  { name: 'Malowanie ścian i sufitu', min: 600, max: 1500 },
  { name: 'Materiały (płytki, kleje, fugi, farby)', min: 1500, max: 3000 },
]

const FAQ = [
  {
    q: 'Ile kosztuje remont kuchni 10m²?',
    a: 'Remont kuchni 10 m² bez mebli i AGD to zwykle 8 000–18 000 zł. Z meblami na wymiar i sprzętem AGD w średnim standardzie całość to najczęściej 25 000–55 000 zł.',
  },
  {
    q: 'Czy warto remontować kuchnię przed sprzedażą mieszkania?',
    a: 'Odświeżenie kuchni (malowanie, nowe fronty, blat) za 3 000–6 000 zł może podnieść cenę mieszkania o 15 000–30 000 zł. Pełny remont jest opłacalny tylko jeśli kuchnia jest w złym stanie technicznym.',
  },
  {
    q: 'Meble gotowe czy na wymiar?',
    a: 'Meble gotowe (IKEA, Forte) to koszt 3 000–8 000 zł plus montaż. Meble na wymiar to 6 000–20 000 zł, ale lepiej wykorzystują przestrzeń. Przy niestandardowych wymiarach kuchni zabudowa na wymiar się opłaca.',
  },
  {
    q: 'Ile trwa remont kuchni?',
    a: 'Sam remont (bez mebli) trwa 1–2 tygodnie. Z zabudową meblową na wymiar łącznie 3–5 tygodni. Meble produkowane są zazwyczaj 4–6 tygodni po złożeniu zamówienia.',
  },
  {
    q: 'Co jest najtańszą opcją odświeżenia kuchni?',
    a: 'Malowanie ścian + nowe fronty meblowe to koszt 2 000–5 000 zł i wygląda jak nowa kuchnia. Naklejenie okleiny na frontach to jeszcze tańsza opcja — 800–2 000 zł.',
  },
]

export default function RemontKuchni() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <FaqJsonLd faq={FAQ} />
      <SiteHeader cta={{ href: '/login', label: 'Wyceń swoją kuchnię →' }} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-surface border border-line rounded-full px-3 py-1 mb-6 text-xs font-semibold text-muted">
            Aktualne ceny 2026
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            Ile kosztuje remont kuchni?<br />
            <span className="text-accent-2">Ceny i widełki na 2026 rok</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">
            Kuchnia to najdroższy remont w mieszkaniu — meble, AGD, hydraulika, elektryka, glazura. Zebraliśmy realne widełki z polskiego rynku, żebyś nie dał się zaskoczyć pierwszą ofertą ekipy.
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-2">Wycena ze zdjęcia</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Zrób zdjęcie swojej kuchni</div>
            <div className="text-sm text-muted">Nasz system wyceni remont z cenami dla Twojego miasta w 30 sekund.</div>
          </div>
          <a href="/login" className="flex-shrink-0 bg-accent text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-accent-hover transition shadow-lg shadow-accent/30 whitespace-nowrap">
            Wyceń za darmo →
          </a>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Orientacyjne koszty remontu kuchni</h2>
          <p className="text-muted text-sm mb-6">Ceny dla kuchni o powierzchni 10–15m², bez sprzętu AGD. Meble podane są jako zabudowa na wymiar w średnim standardzie.</p>
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
              <span className="font-serif text-xl font-bold text-accent-2">12 100 – 37 700 zł</span>
            </div>
          </div>
          <p className="text-xs text-muted mt-3">* Bez sprzętu AGD. W dużych miastach ceny są wyższe o 15–25%. Stan na listopad 2026.</p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Co wpływa na cenę remontu kuchni?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Standard mebli', desc: 'Największa różnica cenowa. Fronty akrylowe, szuflady z cichym domykaniem, blat granitowy — każdy wybór podwaja lub trzykrotnie zwiększa koszt segmentu.' },
              { title: 'Miasto', desc: 'W Warszawie ta sama ekipa glazurnicza zwykle weźmie 15–30% więcej niż w Łodzi czy Rzeszowie. Wyceniamy zawsze z uwzględnieniem Twojej lokalizacji.' },
              { title: 'Elektryka i okap', desc: 'Okap wyciągowy z odświeżaniem to dodatkowy przewód elektryczny i kanał wentylacyjny — rzadko uwzględniany w pierwszej wycenie, kosztuje 500–1 500 zł.' },
              { title: 'Przeniesienie instalacji', desc: 'Zmiana położenia zlewozmywaka lub zmywarka w innym miejscu niż pion — to prace hydrauliczne za 1 500–4 000 zł extra.' },
            ].map((item) => (
              <div key={item.title} className="bg-surface border border-line rounded-xl p-5">
                <div aria-hidden="true" className="mb-3 h-1 w-8 rounded-full bg-accent-2" />
                <div className="font-semibold text-ink mb-1 text-sm">{item.title}</div>
                <div className="text-xs text-muted leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

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

        <section className="bg-surface-2 border border-line rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">Wycena kuchni ze zdjęcia</h2>
          <p className="text-muted text-sm mb-6 max-w-lg mx-auto">
            Wrzuć zdjęcie kuchni, podaj miasto. Nasz system poda widełki dopasowane do Twojej lokalizacji — w 30 sekund, za darmo.
          </p>
          <a href="/login" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-hover transition shadow-lg shadow-accent/30">
            Wyceń moją kuchnię za darmo →
          </a>
          <div className="flex justify-center gap-5 mt-4 text-xs text-muted">
            <span>✓ Bez karty kredytowej</span>
            <span>✓ Wynik w 30 sekund</span>
            <span>✓ 3 wyceny gratis</span>
          </div>
        </section>
      </div>

      <SeoFooter current="/ile-kosztuje-remont-kuchni" />
    </main>
  )
}
