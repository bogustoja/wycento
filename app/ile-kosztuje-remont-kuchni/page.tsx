import LogoIcon from '../components/LogoIcon'

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
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <nav className="bg-white border-b border-[#E7E0D8] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <a href="/login" className="bg-[#C85A2A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B04E24] transition">
            Wyceń swoją kuchnię →
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E7E0D8] rounded-full px-3 py-1 mb-6 text-xs font-semibold text-[#78716C]">
            📅 Aktualne ceny 2026
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-5">
            Ile kosztuje remont kuchni?<br />
            <span className="text-[#C85A2A]">Ceny i widełki na 2026 rok</span>
          </h1>
          <p className="text-lg text-[#78716C] leading-relaxed max-w-2xl">
            Kuchnia to najdroższy remont w mieszkaniu — meble, AGD, hydraulika, elektryka, glazura. Zebraliśmy realne widełki z polskiego rynku, żebyś nie dał się zaskoczyć pierwszą ofertą ekipy.
          </p>
        </div>

        <div className="bg-[#1C1917] rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-2">Wycena ze zdjęcia</div>
            <div className="font-serif text-xl font-bold text-white mb-1">Zrób zdjęcie swojej kuchni</div>
            <div className="text-sm text-[#78716C]">Nasz system wyceni remont z cenami dla Twojego miasta w 30 sekund.</div>
          </div>
          <a href="/login" className="flex-shrink-0 bg-[#C85A2A] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20 whitespace-nowrap">
            Wyceń za darmo →
          </a>
        </div>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-2">Orientacyjne koszty remontu kuchni</h2>
          <p className="text-[#78716C] text-sm mb-6">Ceny dla kuchni o powierzchni 10–15m², bez sprzętu AGD. Meble podane są jako zabudowa na wymiar w średnim standardzie.</p>
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
              <span className="font-serif text-xl font-bold text-[#E8A07A]">12 100 – 37 700 zł</span>
            </div>
          </div>
          <p className="text-xs text-[#A8A29E] mt-3">* Bez sprzętu AGD. W dużych miastach ceny są wyższe o 15–25%. Stan na listopad 2026.</p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Co wpływa na cenę remontu kuchni?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🪵', title: 'Standard mebli', desc: 'Największa różnica cenowa. Fronty akrylowe, szuflady z cichym domykaniem, blat granitowy — każdy wybór podwaja lub trzykrotnie zwiększa koszt segmentu.' },
              { icon: '📍', title: 'Miasto', desc: 'W Warszawie ta sama ekipa glazurnicza zwykle weźmie 15–30% więcej niż w Łodzi czy Rzeszowie. Wyceniamy zawsze z uwzględnieniem Twojej lokalizacji.' },
              { icon: '🔌', title: 'Elektryka i okap', desc: 'Okap wyciągowy z odświeżaniem to dodatkowy przewód elektryczny i kanał wentylacyjny — rzadko uwzględniany w pierwszej wycenie, kosztuje 500–1 500 zł.' },
              { icon: '🚰', title: 'Przeniesienie instalacji', desc: 'Zmiana położenia zlewozmywaka lub zmywarka w innym miejscu niż pion — to prace hydrauliczne za 1 500–4 000 zł extra.' },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-[#E7E0D8] rounded-xl p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-semibold text-[#1C1917] mb-1 text-sm">{item.title}</div>
                <div className="text-xs text-[#78716C] leading-relaxed">{item.desc}</div>
              </div>
            ))}
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
          <h2 className="font-serif text-2xl font-bold mb-3">Wycena kuchni ze zdjęcia</h2>
          <p className="text-[#78716C] text-sm mb-6 max-w-lg mx-auto">
            Wrzuć zdjęcie kuchni, podaj miasto. Nasz system poda widełki dopasowane do Twojej lokalizacji — w 30 sekund, za darmo.
          </p>
          <a href="/login" className="inline-flex items-center gap-2 bg-[#C85A2A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20">
            Wyceń moją kuchnię za darmo →
          </a>
          <div className="flex justify-center gap-5 mt-4 text-xs text-[#A8A29E]">
            <span>✓ Bez karty kredytowej</span>
            <span>✓ Wynik w 30 sekund</span>
            <span>✓ 3 wyceny gratis</span>
          </div>
        </section>
      </div>

      <footer className="bg-white border-t border-[#E7E0D8] mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <LogoIcon size={24} className="mr-2" />
            <span className="font-serif text-lg font-bold">Wyceń</span>
            <span className="font-serif text-lg font-bold text-[#C85A2A]">To</span>
            <span className="text-[#A8A29E] text-sm ml-2">· Made in Poland 🇵🇱</span>
          </div>
          <div className="flex gap-5 text-sm text-[#78716C]">
            <a href="/ile-kosztuje-remont-lazienki" className="hover:text-[#1C1917]">Remont łazienki</a>
            <a href="/wycena-remontu-pokoju" className="hover:text-[#1C1917]">Remont pokoju</a>
            <a href="/wycena-remontu-warszawa" className="hover:text-[#1C1917]">Warszawa</a>
            <a href="/wycena-remontu-krakow" className="hover:text-[#1C1917]">Kraków</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
