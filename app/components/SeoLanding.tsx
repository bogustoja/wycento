import LogoIcon from './LogoIcon'
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
  return (
    <footer className="bg-white border-t border-[#E7E0D8] mt-12">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-1">
          <LogoIcon size={24} className="mr-2" />
          <span className="font-serif text-lg font-bold">Wyceń</span>
          <span className="font-serif text-lg font-bold text-[#C85A2A]">To</span>
        </a>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#78716C]">
          {SEO_LINKS.filter((l) => l.href !== current).map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#1C1917] transition-colors">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  )
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
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <FaqJsonLd faq={p.faq} />
      <nav className="bg-white border-b border-[#E7E0D8] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <a href="/login" className="bg-[#C85A2A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B04E24] transition whitespace-nowrap">
            <span className="sm:hidden">Wyceń za darmo →</span>
            <span className="hidden sm:inline">{p.ctaNav}</span>
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E7E0D8] rounded-full px-3 py-1 mb-6 text-xs font-semibold text-[#78716C]">
            {p.badge}
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            {p.h1}<br />
            <span className="text-[#C85A2A]">{p.h1Accent}</span>
          </h1>
          <p className="text-lg text-[#78716C] leading-relaxed max-w-2xl">{p.intro}</p>
        </div>

        <div className="bg-[#1C1917] rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-2">Wycena ze zdjęcia</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Wrzuć zdjęcie, wpisz miasto</div>
            <div className="text-sm text-[#A8A29E]">Widełki z podziałem na robociznę i materiały w ok. 30 sekund. 3 wyceny za darmo.</div>
          </div>
          <a href="/login" className="flex-shrink-0 bg-[#C85A2A] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20 whitespace-nowrap">
            Wyceń za darmo →
          </a>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">{p.stawkiTitle}</h2>
          <p className="text-[#78716C] text-sm mb-6">{p.stawkiNote}</p>
          <div className="bg-white border border-[#E7E0D8] rounded-2xl overflow-hidden divide-y divide-[#E7E0D8]">
            {p.stawki.map((s) => (
              <div key={s.name} className="px-6 py-4 flex justify-between items-center">
                <span className="text-sm text-[#44403C]">{s.name}</span>
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
              <div key={x.room} className="bg-white border border-[#E7E0D8] rounded-xl p-5">
                <div className="text-xs font-semibold text-[#78716C] uppercase tracking-wide mb-2">{x.room}</div>
                <div className="font-serif text-xl font-bold mb-1">{x.range}</div>
                <div className="text-xs text-[#78716C]">{x.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-4">{p.lokalneTitle}</h2>
          <ul className="space-y-3">
            {p.lokalne.map((t) => (
              <li key={t} className="flex gap-3 text-sm text-[#44403C] leading-relaxed">
                <span className="text-[#C85A2A] font-bold">→</span><span>{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Najczęstsze pytania</h2>
          <div className="bg-white border border-[#E7E0D8] rounded-2xl divide-y divide-[#E7E0D8]">
            {p.faq.map((f) => (
              <details key={f.q} className="group px-6 py-5 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-sm select-none list-none">
                  {f.q}
                  <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-[#F2EDE6] flex items-center justify-center text-[#C85A2A] text-xs font-bold group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#78716C] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#F2EDE6] border border-[#E7E0D8] rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">{p.ctaTitle}</h2>
          <p className="text-[#78716C] text-sm mb-6 max-w-lg mx-auto">{p.ctaText}</p>
          <a href="/login" className="inline-flex items-center gap-2 bg-[#C85A2A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20">
            {p.ctaButton}
          </a>
          <div className="flex justify-center gap-5 mt-4 text-xs text-[#78716C]">
            <span>✓ Bez karty</span><span>✓ Wynik w ok. 30 s</span><span>✓ 3 wyceny gratis</span>
          </div>
        </section>
      </div>

      <SeoFooter current={p.path} />
    </main>
  )
}
