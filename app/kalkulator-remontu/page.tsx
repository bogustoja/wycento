import type { Metadata } from 'next'
import RenovationCalculator from '../components/RenovationCalculator'
import { FaqJsonLd, SeoFooter } from '../components/SeoLanding'
import SiteHeader from '../components/SiteHeader'
import { SITE_URL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Kalkulator remontu 2026 — łazienka, kuchnia, mieszkanie | WyceńTo',
  description:
    'Darmowy kalkulator kosztów remontu bez logowania. Podaj metraż, miasto i standard — zobaczysz widełki robocizny i materiałów na 2026 rok, z ukrytymi kosztami.',
  keywords: [
    'kalkulator remontu',
    'kalkulator remontu łazienki',
    'kalkulator remontu mieszkania',
    'kalkulator remontu kuchni',
    'koszt remontu 2026',
    'kosztorys remontu online',
  ],
  alternates: { canonical: `${SITE_URL}/kalkulator-remontu` },
  openGraph: {
    title: 'Kalkulator remontu 2026 — WyceńTo',
    description: 'Policz koszt remontu łazienki, kuchni, pokoju lub mieszkania. Za darmo, bez logowania, ze stawkami dla Twojego miasta.',
    url: `${SITE_URL}/kalkulator-remontu`,
  },
}

const STAWKI = [
  { name: 'Skucie płytek', value: '50–90 zł/m²' },
  { name: 'Wywóz gruzu z łazienki', value: '500–1000 zł' },
  { name: 'Hydroizolacja', value: '40–80 zł/m²' },
  { name: 'Glazura i terakota (do 60×60)', value: '120–200 zł/m²' },
  { name: 'Płytki wielkoformatowe (60×120 i większe)', value: '220–380 zł/m²' },
  { name: 'Punkt hydrauliczny', value: '300–700 zł' },
  { name: 'Biały montaż (za sztukę)', value: '300–800 zł' },
  { name: 'Stelaż WC z montażem', value: '800–1500 zł' },
  { name: 'Nowy punkt elektryczny', value: '150–250 zł' },
  { name: 'Gładź', value: '40–56 zł/m²' },
  { name: 'Malowanie, 2 warstwy', value: '20–35 zł/m²' },
  { name: 'Montaż paneli', value: '45–85 zł/m²' },
]

const MIASTA = [
  { name: 'Warszawa', value: '+25–40%' },
  { name: 'Kraków, Wrocław, Trójmiasto, Poznań', value: '+15–25%' },
  { name: 'Pozostałe miasta wojewódzkie', value: '0–10%' },
  { name: 'Mniejsze miasta i wsie', value: '−5–15%' },
]

const FAQ = [
  {
    q: 'Czy kalkulator remontu jest darmowy?',
    a: 'Tak. Kalkulator działa bez logowania i bez podawania e-maila. Jeśli chcesz wycenę konkretnego pomieszczenia ze zdjęcia, po założeniu konta dostajesz 3 wyceny AI za darmo.',
  },
  {
    q: 'Skąd są stawki w kalkulatorze?',
    a: 'To typowe stawki robocizny brutto na 2026 rok dla miasta 100–300 tys. mieszkańców, przeliczane dla Twojej lokalizacji. Materiały liczymy w trzech standardach — ich ceny są podobne w całej Polsce, więc mnożnik miasta dotyczy tylko robocizny.',
  },
  {
    q: 'Ile kosztuje remont łazienki 5 m² w 2026 roku?',
    a: 'Generalny remont łazienki 5 m² w średnim standardzie to zwykle około 17–34 tys. zł z materiałami w mieście wojewódzkim. W Warszawie, przy płytkach wielkoformatowych i armaturze premium, kwota może przekroczyć 50 tys. zł.',
  },
  {
    q: 'Czym różni się kalkulator od wyceny ze zdjęcia?',
    a: 'Kalkulator zakłada typowe pomieszczenie o danym metrażu. Wycena ze zdjęcia patrzy na Twoje pomieszczenie: stan płytek, rodzaj instalacji, to, co już jest zrobione — i dolicza tylko prace, które faktycznie zostały do wykonania.',
  },
  {
    q: 'Czy wynik kalkulatora to oferta wykonawcy?',
    a: 'Nie. To orientacyjne widełki, które pomagają zaplanować budżet i ocenić, czy oferta ekipy jest rozsądna. Ostateczną cenę ustala wykonawca po oględzinach. Warto doliczyć 10–15% rezerwy na niespodzianki po skuciu.',
  },
]

const APP_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Kalkulator remontu WyceńTo',
  url: `${SITE_URL}/kalkulator-remontu`,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  inLanguage: 'pl',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'PLN' },
}

export default function KalkulatorRemontu() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <FaqJsonLd faq={FAQ} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_JSON_LD) }} />
      <SiteHeader cta={{ href: '/login', label: 'Wyceń ze zdjęcia →' }} />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted">
            Stawki 2026 · bez logowania
          </div>
          <h1 className="mb-5 font-serif text-4xl font-bold leading-tight md:text-5xl">
            Kalkulator remontu<br />
            <span className="text-accent-2">łazienki, kuchni, pokoju i mieszkania</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Podaj metraż, miasto i standard. Zobaczysz widełki kosztów z podziałem na robociznę i materiały — razem z tym, o czym łatwo zapomnieć: skuciem, wywozem gruzu, hydroizolacją i chemią budowlaną.
          </p>
        </div>

        <RenovationCalculator initialRoom="lazienka" initialCity="wojewodzkie" title="Policz koszt remontu" />

        <section className="mb-12">
          <h2 className="mb-2 font-serif text-2xl font-bold">Stawki robocizny, na których liczymy</h2>
          <p className="mb-6 text-sm text-muted">Ceny brutto na 2026 rok, miasto 100–300 tys. mieszkańców. Materiały liczone osobno.</p>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {STAWKI.map((s) => (
              <div key={s.name} className="flex items-center justify-between px-6 py-3.5">
                <span className="text-sm text-ink-2">{s.name}</span>
                <span className="ml-4 whitespace-nowrap text-sm font-semibold tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-2 font-serif text-2xl font-bold">Ile drożej w dużym mieście?</h2>
          <p className="mb-6 text-sm text-muted">
            Różnica dotyczy robocizny. Płytki, kabina czy armatura kosztują podobnie w całym kraju.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {MIASTA.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-4">
                <span className="text-sm text-ink-2">{m.name}</span>
                <span className="ml-4 font-serif text-lg font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 font-serif text-2xl font-bold">Jak czytać wynik</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-ink-2">
            <li><strong className="text-ink">Dolna granica</strong> — sprawna ekipa, proste pomieszczenie, bez niespodzianek pod płytkami.</li>
            <li><strong className="text-ink">Górna granica</strong> — krzywe ściany, wymiana odcinków instalacji, droższa ekipa w sezonie.</li>
            <li><strong className="text-ink">Rezerwa 10–15%</strong> — doliczaj ją zawsze. W blokach z lat 60–80 i kamienicach stan instalacji wychodzi dopiero po skuciu.</li>
            <li><strong className="text-ink">Oferta dużo poniżej dolnej granicy</strong> — zapytaj, czego w niej brakuje (gruz, hydroizolacja, chemia często „wypadają”).</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-bold">Najczęstsze pytania</h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-xl border border-line bg-surface p-5">
                <h3 className="mb-2 font-semibold text-ink">{f.q}</h3>
                <p className="text-sm leading-relaxed text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl border border-accent bg-surface-2 p-8 text-center">
          <h2 className="mb-2 font-serif text-2xl font-bold">Masz zdjęcie pomieszczenia?</h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-muted">
            AI obejrzy je jak kierownik ekipy przy pierwszych oględzinach i rozpisze wycenę dla Twojego pomieszczenia i miasta. 3 wyceny za darmo, bez karty.
          </p>
          <a
            href="/login?utm_source=kalkulator&utm_medium=bottom"
            className="inline-block rounded-xl bg-accent px-7 py-3.5 font-semibold text-white transition hover:bg-accent-hover hover:text-white"
          >
            Wyceń ze zdjęcia za darmo →
          </a>
        </div>
      </div>

      <SeoFooter current="/kalkulator-remontu" />
    </main>
  )
}
