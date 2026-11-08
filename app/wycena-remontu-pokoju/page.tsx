import { SeoFooter, FaqJsonLd } from '../components/SeoLanding'
import LogoIcon from '../components/LogoIcon'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ile kosztuje remont pokoju? Ceny 2026 — WyceńTo',
  description: 'Sprawdź koszt remontu pokoju w 2026 roku. Malowanie, podłogi, sufity, elektryka — realne widełki dla całej Polski. Wycena ze zdjęcia.',
  keywords: ['ile kosztuje remont pokoju', 'koszt remontu pokoju 2026', 'wycena remontu pokoju', 'malowanie pokoju cena', 'remont sypialni cena'],
}

const ITEMS = [
  { name: 'Malowanie ścian i sufitu (robocizna + farby)', min: 1500, max: 3500 },
  { name: 'Panele podłogowe lub parkiet (materiał + montaż)', min: 1500, max: 4000 },
  { name: 'Gładzie gipsowe i szpachlowanie', min: 2500, max: 4000 },
  { name: 'Elektryka (punkty świetlne, gniazdka)', min: 400, max: 1200 },
  { name: 'Listwy przypodłogowe i wykończenia', min: 200, max: 600 },
  { name: 'Materiały (grunt, kleje, podkład, taśmy)', min: 400, max: 1000 },
]

const FAQ = [
  {
    q: 'Ile kosztuje malowanie pokoju?',
    a: 'Pokój 15–20 m² to ok. 50–60 m² ścian i sufitu do malowania. Robocizna to 20–50 zł/m² (Warszawa na górnej granicy), czyli ok. 1 200–2 800 zł, plus farby 300–800 zł. Jeśli ściany wymagają gładzi, dolicz 2 500–4 000 zł.',
  },
  {
    q: 'Ile kosztuje wymiana podłogi w pokoju?',
    a: 'Panele podłogowe to 40–120 zł/m² za materiał i 45–85 zł/m² za montaż. Dla pokoju 15 m² to ok. 600–1 800 zł za materiał i 700–1 300 zł za ułożenie. Parkiet drewniany jest 2–3 razy droższy.',
  },
  {
    q: 'Czy warto robić gładzie na całe mieszkanie?',
    a: 'Gładź to zwykle 40–60 zł/m² ścian i sufitu za robociznę. Dla pokoju 15 m² ze standardową wysokością (ok. 50 m² powierzchni) to 2 000–3 000 zł plus materiał.',
  },
  {
    q: 'Ile trwa remont pokoju?',
    a: 'Odświeżenie pokoju (malowanie + nowa podłoga) to 3–7 dni roboczych. Pełny remont z gładziami, elektryka i nową podłogą zajmuje 2–3 tygodnie.',
  },
]

export default function RemontPokoju() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <FaqJsonLd faq={FAQ} />
      <nav className="bg-white border-b border-[#E7E0D8] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <a href="/login" className="bg-[#C85A2A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B04E24] transition">
            Wyceń swój pokój →
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E7E0D8] rounded-full px-3 py-1 mb-6 text-xs font-semibold text-[#78716C]">
            📅 Aktualne ceny 2026
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            Ile kosztuje remont pokoju?<br />
            <span className="text-[#C85A2A]">Ceny i widełki na 2026 rok</span>
          </h1>
          <p className="text-lg text-[#78716C] leading-relaxed max-w-2xl">
            Remont pokoju to najczęstsza i zazwyczaj najtańsza forma remontu w mieszkaniu. Ale i tu koszty potrafią zaskoczyć — zwłaszcza gdy ściany wymagają gładzi lub elektryka okazuje się przestarzała.
          </p>
        </div>

        <div className="bg-[#1C1917] rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-2">Wycena ze zdjęcia</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Zrób zdjęcie swojego pokoju</div>
            <div className="text-sm text-[#78716C]">Nasz system wyceni remont z cenami dla Twojego miasta w 30 sekund.</div>
          </div>
          <a href="/login" className="flex-shrink-0 bg-[#C85A2A] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20 whitespace-nowrap">
            Wyceń za darmo →
          </a>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Orientacyjne koszty remontu pokoju</h2>
          <p className="text-[#78716C] text-sm mb-6">Ceny dla pokoju o powierzchni 15–20m². Zakres: malowanie, nowa podłoga, gładzie, elektryka.</p>
          <div className="bg-white border border-[#E7E0D8] rounded-2xl overflow-hidden">
            <div className="divide-y divide-[#E7E0D8]">
              {ITEMS.map((item) => (
                <div key={item.name} className="px-6 py-4 flex justify-between items-center">
                  <span className="text-sm text-[#44403C]">{item.name}</span>
                  <span className="font-semibold text-sm text-[#1C1917] tabular-nums whitespace-nowrap ml-4">
                    {item.min.toLocaleString('pl-PL')} – {item.max.toLocaleString('pl-PL')} zł
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 bg-[#1C1917] flex justify-between items-center">
              <span className="font-semibold text-white">Łącznie (orientacyjnie)</span>
              <span className="font-serif text-xl font-bold text-[#E8A07A]">6 500 – 14 300 zł</span>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Najczęstsze pytania</h2>
          <div className="bg-white border border-[#E7E0D8] rounded-2xl divide-y divide-[#E7E0D8]">
            {FAQ.map((item, i) => (
              <details key={i} className="group px-6 py-5 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-[#1C1917] text-sm select-none list-none">
                  {item.q}
                  <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-[#F2EDE6] flex items-center justify-center text-[#C85A2A] text-xs font-bold group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="mt-3 text-sm text-[#78716C] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-[#F2EDE6] border border-[#E7E0D8] rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-3">Wycena pokoju ze zdjęcia</h2>
          <p className="text-[#78716C] text-sm mb-6 max-w-lg mx-auto">3 pierwsze wyceny za darmo, bez karty kredytowej. Wynik w 30 sekund z cenami dla Twojego miasta.</p>
          <a href="/login" className="inline-flex items-center gap-2 bg-[#C85A2A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20">
            Wyceń mój pokój za darmo →
          </a>
        </section>
      </div>

      <SeoFooter current="/wycena-remontu-pokoju" />
    </main>
  )
}
