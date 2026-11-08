import type { Metadata } from 'next'
import SiteHeader from './components/SiteHeader'
import Spotlight from './components/Spotlight'
import { SEO_LINKS } from './components/seoLinks'

export const metadata: Metadata = {
  title: 'Nie ma takiej strony — WyceńTo',
  robots: { index: false },
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg text-ink flex flex-col">
      <SiteHeader />

      <div className="relative flex-1 flex items-center justify-center overflow-hidden px-6 py-16">
        <div className="dot-grid absolute inset-0" aria-hidden="true" />
        <Spotlight x={50} y={35} />
        <div className="relative max-w-lg text-center">
          <p className="text-[120px] leading-none font-extrabold tracking-tighter text-accent-2 mb-4">404</p>
          <h1 className="text-3xl font-extrabold mb-3">Tej strony nie ma</h1>
          <p className="text-muted leading-relaxed mb-8">
            Link mógł się zmienić albo w adresie jest literówka. Jak na budowie — czasem trzeba wrócić do planu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a href="/" className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-hover hover:text-white transition btn-glow">
              Strona główna
            </a>
            <a href="/login" className="border border-line bg-surface px-6 py-3 rounded-xl font-semibold text-ink-2 hover:bg-surface-2 transition">
              Wyceń remont ze zdjęcia
            </a>
          </div>
          <p className="text-sm text-muted mb-3">Albo sprawdź ceny remontów:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SEO_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="bg-surface border border-line rounded-full px-3 py-1.5 text-sm text-ink-2 hover:border-accent-2 hover:text-accent-2 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
