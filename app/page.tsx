import type { Metadata } from 'next'
import { FaqJsonLd } from './components/SeoLanding'
import { CONTACT_EMAIL } from './lib/site'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Spotlight from './components/Spotlight'
import ScanDemo from './components/ScanDemo'

// hreflang: polska strona główna <-> angielska /en
export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: { 'pl-PL': '/', en: '/en', 'x-default': '/' },
  },
}

const HOME_FAQ = [
  {
    q: 'Jak dokładna jest wycena?',
    a: 'To wycena orientacyjna — taka, jaką doświadczony wykonawca da „z głowy” po obejrzeniu zdjęcia. Dlatego podajemy widełki min–max, a nie jedną liczbę. Nie zastępuje kosztorysu po wizycie ekipy na miejscu, ale pozwala sprawdzić, czy oferta, którą dostajesz, jest z tej planety.',
  },
  {
    q: 'Skąd bierzecie ceny?',
    a: 'Zdjęcie analizuje model AI (Anthropic Claude) według wytycznych przygotowanych przez osobę z praktyką w wykończeniach: aktualne stawki robocizny, typowe koszty materiałów i różnice między miastami. Wycena uwzględnia też koszty, których na zdjęciu nie widać — wywóz gruzu, chemię budowlaną, przygotowanie podłoża.',
  },
  {
    q: 'Co się dzieje z moim zdjęciem?',
    a: 'Zdjęcie trafia wyłącznie do analizy przez model AI (Anthropic) w celu wyceny — nie zapisujemy go na naszych serwerach. Na Twoim koncie zostaje tylko wynik wyceny (bez zdjęcia).',
  },
  {
    q: 'Czy mogę anulować subskrypcję?',
    a: 'Tak, w każdej chwili z panelu użytkownika — jedno kliknięcie. Dostęp do Pro trwa do końca opłaconego miesiąca. Żadnych ukrytych opłat ani zobowiązań.',
  },
  {
    q: 'Jakie pomieszczenia można wycenić?',
    a: 'Łazienkę, kuchnię, pokój, sypialnię, przedpokój, taras i całe mieszkanie. Najlepsza wycena wychodzi przy dobrym oświetleniu i zdjęciu pokazującym cały pokój.',
  },
  {
    q: 'Co jeśli wycena jest daleko od rzeczywistości?',
    a: `Napisz do nas na ${CONTACT_EMAIL} i podaj, ile ostatecznie zapłaciłeś. Każde takie porównanie poprawia wytyczne, według których liczymy wyceny.`,
  },
]

const NAV = [
  { href: '#jak-dziala', label: 'Jak działa' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#pytania', label: 'Pytania' },
  { href: '/en', label: 'English' },
]

const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties

// Ikony liniowe zamiast emoji: wyglądają tak samo na każdym telefonie.
function Icon({ path }: { path: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}
const ICONS = {
  camera: 'M4 8h3l2-3h6l2 3h3v11H4z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  list: 'M9 6h11 M9 12h11 M9 18h11 M4.5 6h.01 M4.5 12h.01 M4.5 18h.01',
  check: 'M5 12.5l4.5 4.5L19 7.5',
}

const STEPS = [
  { n: '01', icon: ICONS.camera, title: 'Zrób zdjęcie', desc: 'Sfotografuj pomieszczenie z progu, przy dobrym świetle. Im więcej widać, tym węższe widełki.' },
  { n: '02', icon: ICONS.pin, title: 'Podaj miasto', desc: 'Robocizna w Warszawie i w Radomiu różni się o 20–35%. Liczymy według stawek z Twojej okolicy.' },
  { n: '03', icon: ICONS.list, title: 'Dostań kosztorys', desc: 'Pozycja po pozycji: robocizna, materiały i koszty dodatkowe, z widełkami min–max.' },
]

const HIDDEN = ['Wywóz gruzu', 'Gruntowanie', 'Folia w płynie', 'Kleje i fugi', 'Taśmy narożne', 'Wyrównanie podłoża', 'Zabezpieczenie mieszkania']

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-bg text-ink">
      <FaqJsonLd faq={HOME_FAQ} />
      <SiteHeader links={NAV} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0" aria-hidden="true" />
        <Spotlight x={25} y={15} />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
            <div className="flex min-w-0 flex-[1_1_680px] flex-col gap-6">
              <span className="rise self-start rounded-full border border-line-strong px-3.5 py-1.5 text-[13px] text-ink-2">
                Wycena ze zdjęcia · stawki z Twojego miasta
              </span>
              <h1 className="rise text-[clamp(2.75rem,6vw,5.25rem)] leading-[0.95] font-extrabold tracking-[-0.045em]" style={d(0.08)}>
                Pokaż pokój. Zobacz, ile <span className="text-accent-2">naprawdę</span> kosztuje remont.
              </h1>
            </div>
            <div className="rise flex min-w-0 flex-[0_1_360px] flex-col gap-5" style={d(0.18)}>
              <p className="text-[17px] leading-relaxed text-ink-2">
                System ogląda zdjęcie jak wykonawca: liczy metry płytek, zauważa stare instalacje i dolicza gruz, chemię i przygotowanie podłoża.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="/login" className="btn-glow inline-flex min-h-14 items-center gap-2 rounded-2xl bg-accent px-7 text-[17px] font-bold text-white hover:bg-accent-hover hover:text-white">
                  Wyceń za darmo <span aria-hidden="true">→</span>
                </a>
                <span className="text-sm text-muted">3 wyceny gratis, bez karty</span>
              </div>
            </div>
          </div>
          <div className="rise" style={d(0.3)}>
            <ScanDemo />
          </div>
        </div>
      </section>

      {/* JAK DZIAŁA */}
      <section id="jak-dziala" className="scroll-mt-20 border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl text-4xl font-extrabold sm:text-5xl">Trzy kroki. Około 30 sekund.</h2>
            <p className="max-w-sm text-ink-2">Nie musisz nic mierzyć ani znać się na remontach. Zdjęcie z telefonu wystarczy.</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="lift relative overflow-hidden rounded-3xl border border-line bg-surface p-7">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-2/40 bg-accent-2/10 text-accent-2">
                  <Icon path={s.icon} />
                </div>
                <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-ink-2">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CO LICZYMY — bento */}
      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-14 max-w-2xl text-4xl font-extrabold sm:text-5xl">
            Koniec z remontem, który kosztuje <span className="text-accent-2">dwa razy więcej</span>, niż planowałeś.
          </h2>
          <div className="grid gap-4 md:grid-cols-6">
            <div className="lift flex flex-col gap-5 rounded-3xl border border-line bg-surface p-7 md:col-span-4">
              <div>
                <h3 className="mb-2 text-2xl font-bold">Ukryte koszty na wierzchu</h3>
                <p className="max-w-lg text-ink-2">To, o czym ekipa mówi dopiero na końcu. Na zdjęciu tego nie widać, w kosztorysie jest.</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {HIDDEN.map((h) => (
                  <li key={h} className="rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-sm text-ink-2">{h}</li>
                ))}
              </ul>
            </div>
            <div className="lift flex flex-col justify-between gap-6 rounded-3xl bg-accent p-7 text-white md:col-span-2">
              <span className="text-5xl font-extrabold tracking-tight">min–max</span>
              <p className="text-white">Uczciwa wycena to przedział. Nie obiecujemy precyzji, której nikt nie ma bez wizyty na miejscu.</p>
            </div>
            <div className="lift rounded-3xl border border-line bg-surface p-7 md:col-span-2">
              <h3 className="mb-2 text-lg font-bold">Ceny lokalne</h3>
              <p className="text-[15px] leading-relaxed text-ink-2">Stawki robocizny w Warszawie są o 20–35% wyższe niż w mniejszych miastach. Uwzględniamy to.</p>
            </div>
            <div className="lift rounded-3xl border border-line bg-surface p-7 md:col-span-2">
              <h3 className="mb-2 text-lg font-bold">Czas realizacji</h3>
              <p className="text-[15px] leading-relaxed text-ink-2">Każda wycena podaje orientacyjny czas prac, żebyś wiedział, czego oczekiwać od ekipy.</p>
            </div>
            <div className="lift rounded-3xl border border-line bg-surface p-7 md:col-span-2">
              <h3 className="mb-2 text-lg font-bold">Co zrobić przy okazji</h3>
              <p className="text-[15px] leading-relaxed text-ink-2">Podpowiadamy, co wymienić teraz, żeby nie płacić za powrót ekipy za rok.</p>
            </div>
          </div>
        </div>
      </section>

      {/* KTO ZA TYM STOI */}
      <section className="border-t border-line py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 md:grid-cols-[1fr_2fr]">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Kto za tym stoi</p>
          <div>
            <h2 className="mb-6 text-3xl leading-tight font-extrabold sm:text-4xl">
              Robione przez kogoś, kto <span className="text-accent-2">kładł płytki</span>.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
              WyceńTo tworzy osoba, która pracowała na budowach przy wykończeniach wnętrz, tarasach i altanach w Polsce i w Wielkiej Brytanii.
              Wiedza o tym, co ekipy faktycznie liczą i co klienci pomijają w budżecie (gruz, gruntowanie, poprawki po starych instalacjach), jest wbudowana w sposób, w jaki system liczy wycenę.
            </p>
          </div>
        </div>
      </section>

      {/* CENNIK */}
      <section id="cennik" className="scroll-mt-20 border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-4xl font-extrabold sm:text-5xl">Proste zasady, bez niespodzianek</h2>
            <p className="text-ink-2">Zacznij za darmo. Płać, kiedy potrzebujesz więcej.</p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2">
            <div className="flex flex-col rounded-3xl border border-line bg-surface p-8">
              <h3 className="mb-4 text-xs font-semibold tracking-[0.14em] text-muted uppercase">Bezpłatny</h3>
              <div className="mb-1 flex items-end gap-1">
                <span className="text-6xl font-extrabold tracking-tight">0</span>
                <span className="pb-2 text-lg font-semibold text-muted">zł</span>
              </div>
              <div className="mb-7 text-sm text-muted">na zawsze</div>
              <ul className="mb-8 space-y-3">
                {[
                  { text: '3 darmowe wyceny', ok: true },
                  { text: 'Podgląd na ekranie', ok: true },
                  { text: 'Historia wycen', ok: true },
                  { text: 'Raport PDF', ok: false },
                  { text: 'Priorytetowa obsługa', ok: false },
                ].map((item) => (
                  <li key={item.text} className={`flex items-center gap-3 text-sm ${item.ok ? 'text-ink-2' : 'text-muted line-through'}`}>
                    <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs ${item.ok ? 'bg-green-500/15 text-green-400' : 'bg-white/5 text-muted'}`}>
                      {item.ok ? '✓' : '–'}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <a href="/login" className="mt-auto block w-full rounded-2xl border border-line-strong py-3.5 text-center text-sm font-semibold text-ink transition hover:bg-white/5 hover:text-ink">
                Zacznij za darmo
              </a>
            </div>

            <div className="glow-ring rounded-3xl">
              <div className="flex h-full flex-col rounded-[23px] bg-surface p-8">
                <h3 className="mb-4 text-xs font-semibold tracking-[0.14em] text-accent-2 uppercase">Pro</h3>
                <div className="mb-1 flex items-end gap-1">
                  <span className="text-6xl font-extrabold tracking-tight">39</span>
                  <span className="pb-2 text-lg font-semibold text-muted">zł</span>
                </div>
                <div className="mb-7 text-sm text-muted">miesięcznie · anuluj, kiedy chcesz</div>
                <ul className="mb-8 space-y-3">
                  {['Nielimitowane wyceny', 'Podgląd na ekranie', 'Historia wycen', 'Raport PDF do pobrania', 'Priorytetowa obsługa'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-2/15 text-xs text-accent-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="/login" className="btn-glow mt-auto block w-full rounded-2xl bg-accent py-3.5 text-center text-sm font-semibold text-white hover:bg-accent-hover hover:text-white">
                  Zacznij od 3 darmowych wycen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="pytania" className="scroll-mt-20 border-t border-line py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_2fr]">
          <h2 className="text-4xl font-extrabold">Najczęstsze pytania</h2>
          <div className="divide-y divide-line border-y border-line">
            {HOME_FAQ.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold select-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden="true" className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-line-strong text-accent-2 transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line py-28">
        <div className="dot-grid absolute inset-0" aria-hidden="true" />
        <Spotlight x={50} y={40} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-5 text-5xl leading-[0.95] font-extrabold sm:text-6xl">
            Nie płać ekipie <span className="text-accent-2">za dużo.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-md text-lg text-ink-2">
            Sprawdź, ile powinien kosztować remont, zanim zadzwonisz po oferty. Pierwsze 3 wyceny za darmo.
          </p>
          <a href="/login" className="btn-glow inline-flex min-h-14 items-center gap-2 rounded-2xl bg-accent px-9 text-[17px] font-bold text-white hover:bg-accent-hover hover:text-white">
            Wyceń mój remont <span aria-hidden="true">→</span>
          </a>
          <p className="mt-5 text-sm text-muted">Bez karty · wynik w ok. 30 s · pytania: {CONTACT_EMAIL}</p>
        </div>
      </section>

      <SiteFooter current="/" />
    </main>
  )
}
