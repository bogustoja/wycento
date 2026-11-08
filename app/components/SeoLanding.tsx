import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { SEO_LINKS } from './seoLinks'

// Wspólny szablon stron SEO (miasta i typy remontu).
// Treść każdej strony musi być własna — inaczej Google traktuje je jako duplikaty.

export type Stawka = { name: string; min: number; max: number; jednostka: string }
export type Przyklad = { room: string; range: string; note: string }
export type Faq = { q: string; a: string }

export { SEO_LINKS }

export function FaqJsonLd({ faq }: { faq: Faq[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function SeoFooter({ current }: { current: string }) {
  return <SiteFooter current={current} />
}

type Props = {
  path: string
  badge: string
  h1: string
  h1Accent: string
  intro: string
  ctaNav: string
  stawkiTitle: string
  stawkiNote: string
  stawki: Stawka[]
  przykladyTitle: string
  przyklady: Przyklad[]
  lokalneTitle: string
  lokalne: string[]
  faq: Faq[]
  ctaTitle: string
  ctaText: string
  ctaButton: string
}

export default function SeoLanding(p: Props) {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <FaqJsonLd faq={p.faq} />
      <SiteHeader cta={{ href: '/login', label: p.ctaNav }} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-surface border border-line rounded-full px-3 py-1 mb-6 text-xs font-semibold text-muted">
            {p.badge}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            {p.h1}<br />
            <span className="text-accent-2">{p.h1Accent}</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">{p.intro}</p>
        </div>

        <div className="bg-surface rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-2">Wycena ze zdjęcia</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Wrzuć zdjęcie, wpisz miasto</div>
            <div className="text-sm text-muted">Widełki z podziałem na robociznę i materiały w ok. 30 sekund. 3 wyceny za darmo.</div>
          </div>
          <a href="/login" className="flex-shrink-0 bg-accent text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-accent-hover transition shadow-lg shadow-accent/30 whitespace-nowrap">
            Wyceń za darmo →
          </a>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">{p.stawkiTitle}</h2>
          <p className="text-muted text-sm mb-6">{p.stawkiNote}</p>
          <div className="bg-surface border border-line rounded-2xl overflow-hidden divide-y divide-line">
            {p.stawki.map((s) => (
              <div key={s.name} className="px-6 py-4 flex justify-between items-center">
                <span className="text-sm text-ink-2">{s.name}</span>
                <span className="font-semibold text-sm tabular-nums whitespace-nowrap ml-4">
                  {s.min.toLocaleString('pl-PL')} – {s.max.toLocaleString('pl-PL')} {s.jednostka}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">{p.przykladyTitle}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {p.przyklady.map((x) => (
              <div key={x.room} className="bg-surface border border-line rounded-xl p-5">
                <div className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">{x.room}</div>
                <div className="font-serif text-xl font-bold mb-1">{x.range}</div>
                <div className="text-xs text-muted">{x.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-4">{p.lokalneTitle}</h2>
          <ul className="space-y-3">
            {p.lokalne.map((t) => (
              <li key={t} className="flex gap-3 text-sm text-ink-2 leading-relaxed">
                <span className="text-accent-2 font-bold">→</span><span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Najczęstsze pytania</h2>
          <div className="bg-surface border border-line rounded-2xl divide-y divide-line">
            {p.faq.map((f) => (
              <details key={f.q} className="group px-6 py-5 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-sm select-none list-none">
                  {f.q}
                  <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-surface-2 flex items-center justify-center text-accent-2 text-xs font-bold group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-surface-2 border border-line rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">{p.ctaTitle}</h2>
          <p className="text-muted text-sm mb-6 max-w-lg mx-auto">{p.ctaText}</p>
          <a href="/login" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-hover transition shadow-lg shadow-accent/30">
            {p.ctaButton}
          </a>
          <div className="flex justify-center gap-5 mt-4 text-xs text-muted">
            <span>✓ Bez karty</span><span>✓ Wynik w ok. 30 s</span><span>✓ 3 wyceny gratis</span>
          </div>
        </section>
      </div>

      <SeoFooter current={p.path} />
    </main>
  )
}
