import type { Metadata } from 'next'
import LogoIcon from './components/LogoIcon'
import { SEO_LINKS } from './components/seoLinks'

export const metadata: Metadata = {
  title: 'Nie ma takiej strony — WyceńTo',
  robots: { index: false },
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      <nav className="bg-white border-b border-[#E7E0D8]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <a href="/" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg text-center">
          <p className="font-serif text-7xl font-bold text-[#C85A2A] mb-4">404</p>
          <h1 className="font-serif text-3xl font-bold mb-3">Tej strony nie ma</h1>
          <p className="text-[#78716C] leading-relaxed mb-8">
            Link mógł się zmienić albo w adresie jest literówka. Jak na budowie — czasem trzeba wrócić do planu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a href="/" className="bg-[#C85A2A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#B04E24] transition">
              Strona główna
            </a>
            <a href="/login" className="border border-[#E7E0D8] bg-white px-6 py-3 rounded-xl font-semibold text-[#44403C] hover:bg-[#F2EDE6] transition">
              Wyceń remont ze zdjęcia
            </a>
          </div>
          <p className="text-sm text-[#78716C] mb-3">Albo sprawdź ceny remontów:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SEO_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="bg-white border border-[#E7E0D8] rounded-full px-3 py-1.5 text-sm text-[#44403C] hover:border-[#C85A2A] hover:text-[#C85A2A] transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
