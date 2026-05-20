'use client'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E7E0D8]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#jak-dziala" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">Jak działa</a>
            <a href="#cennik" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">Cennik</a>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/login'}
              className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors font-medium"
            >
              Zaloguj się
            </button>
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-[#C85A2A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B04E24] transition-all shadow-sm"
            >
              Wypróbuj za darmo
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#D4C9BE 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF8F5]/60 to-[#FAF8F5]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E7E0D8] rounded-full px-4 py-1.5 mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-xs font-semibold text-[#78716C]">🇵🇱 Polskie ceny, polskie realia</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Heading */}
            <div>
              <h1 className="font-serif text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                Ile naprawdę<br />
                kosztuje Twój<br />
                <span className="text-[#C85A2A] italic">remont?</span>
              </h1>
              <p className="text-lg text-[#78716C] leading-relaxed mb-10 max-w-lg">
                Wrzuć zdjęcie pomieszczenia, podaj miasto. AI wyceni remont z prawdziwymi cenami dla Twojej okolicy — zanim zdążysz zadzwonić do ekipy.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-serif text-2xl font-bold">30s</div>
                  <div className="text-xs text-[#A8A29E]">czas wyceny</div>
                </div>
                <div className="w-px h-8 bg-[#E7E0D8]" />
                <div>
                  <div className="font-serif text-2xl font-bold">±15%</div>
                  <div className="text-xs text-[#A8A29E]">dokładność</div>
                </div>
                <div className="w-px h-8 bg-[#E7E0D8]" />
                <div>
                  <div className="font-serif text-2xl font-bold">0 zł</div>
                  <div className="text-xs text-[#A8A29E]">na start</div>
                </div>
              </div>
            </div>

            {/* Form card */}
            <div className="bg-white border border-[#E7E0D8] rounded-2xl p-7 shadow-xl shadow-[#1C1917]/5">
              <div className="flex gap-3 mb-5">
                <input
                  type="text"
                  placeholder="Miasto (np. Warszawa)"
                  onClick={() => window.location.href = '/login'}
                  readOnly
                  className="flex-1 bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm placeholder-[#A8A29E] outline-none cursor-pointer"
                />
                <select
                  onClick={() => window.location.href = '/login'}
                  className="bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-3 py-3 text-sm outline-none cursor-pointer"
                >
                  <option>Łazienka</option>
                  <option>Kuchnia</option>
                  <option>Przedpokój</option>
                  <option>Sypialnia</option>
                  <option>Całe mieszkanie</option>
                </select>
              </div>

              <div
                onClick={() => window.location.href = '/login'}
                className="group border-2 border-dashed border-[#E7E0D8] rounded-xl p-8 text-center cursor-pointer hover:border-[#C85A2A] hover:bg-[#FEF8F4] transition-all mb-5"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">📷</div>
                <div className="text-sm font-semibold text-[#44403C] mb-1">Dodaj zdjęcie pomieszczenia</div>
                <div className="text-xs text-[#A8A29E]">Kliknij lub przeciągnij · JPG, PNG, HEIC</div>
              </div>

              <button
                onClick={() => window.location.href = '/login'}
                className="w-full bg-[#C85A2A] text-white py-3.5 rounded-xl font-semibold hover:bg-[#B04E24] transition-all shadow-lg shadow-[#C85A2A]/25 mb-4"
              >
                Wyceń mój remont →
              </button>

              <div className="flex justify-center gap-5 text-xs text-[#A8A29E]">
                <span>✓ 3 wyceny gratis</span>
                <span>✓ Bez karty kredytowej</span>
                <span>✓ Wynik w 30s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRZYKŁADOWA WYCENA */}
      <section className="bg-white border-y border-[#E7E0D8] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest text-center mb-10">Przykładowy wynik wyceny</p>
          <div className="max-w-2xl mx-auto bg-[#FAF8F5] border border-[#E7E0D8] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-white border-b border-[#E7E0D8] flex items-center justify-between">
              <div>
                <div className="font-semibold text-[#1C1917]">Łazienka 6m²</div>
                <div className="text-xs text-[#A8A29E]">Kraków, Krowodrza</div>
              </div>
              <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full font-medium">Gotowa ✓</span>
            </div>
            <div className="divide-y divide-[#E7E0D8]">
              {[
                { name: 'Glazura i terakota (robocizna)', min: 1800, max: 2600 },
                { name: 'Hydraulika — armatura', min: 900, max: 1400 },
                { name: 'Materiały (kleje, fugi, uszczelki)', min: 800, max: 1200 },
                { name: 'Wywóz gruzu i sprzątanie', min: 300, max: 500 },
              ].map((item, i) => (
                <div key={i} className="px-6 py-3.5 flex justify-between items-center">
                  <span className="text-sm text-[#44403C]">{item.name}</span>
                  <span className="text-sm font-semibold text-[#1C1917]">{item.min.toLocaleString('pl-PL')} – {item.max.toLocaleString('pl-PL')} zł</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-[#1C1917] flex justify-between items-center">
              <span className="font-semibold text-white">Łącznie</span>
              <span className="font-serif text-xl font-bold text-[#E8A07A]">3 800 – 5 700 zł</span>
            </div>
          </div>
        </div>
      </section>

      {/* JAK DZIAŁA */}
      <section id="jak-dziala" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#C85A2A] uppercase tracking-widest mb-3">Jak to działa</p>
            <h2 className="font-serif text-4xl font-bold">Trzy kroki do wyceny</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '📸', title: 'Zrób zdjęcie', desc: 'Sfotografuj pomieszczenie które chcesz remontować. Im więcej widać, tym lepsza wycena.' },
              { n: '02', icon: '📍', title: 'Podaj lokalizację', desc: 'Wpisz miasto. Ceny w Warszawie różnią się od Radomia o 20–35% — uwzględniamy to.' },
              { n: '03', icon: '📋', title: 'Dostaj wycenę', desc: 'Szczegółowy kosztorys z podziałem na robociznę, materiały i koszty dodatkowe.' },
            ].map((s) => (
              <div key={s.n} className="bg-white border border-[#E7E0D8] rounded-2xl p-8 hover:shadow-lg hover:shadow-[#1C1917]/5 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#F5EBE4] rounded-xl flex items-center justify-center text-2xl">{s.icon}</div>
                  <span className="font-serif text-4xl font-bold text-[#F2EDE6]">{s.n}</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DLACZEGO */}
      <section className="bg-[#1C1917] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-3">Dlaczego WyceńTo</p>
            <h2 className="font-serif text-4xl font-bold text-white leading-tight">
              Koniec z remontami które kosztują<br />
              <span className="text-[#E8A07A] italic">dwa razy więcej</span> niż planowałeś
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '📍', title: 'Ceny lokalne', desc: 'Stawki robocizny w Warszawie są 20–35% wyższe niż w mniejszych miastach. Uwzględniamy to.' },
              { icon: '🔧', title: 'Ukryte koszty na wierzch', desc: 'Wywóz gruzu, folia, taśmy, kleje, gruntowanie — wszystko co pomijają inne kalkulatory.' },
              { icon: '📊', title: 'Widełki, nie jedna liczba', desc: 'Uczciwa wycena to przedział min-max. Nie obiecujemy precyzji której nikt nie ma.' },
              { icon: '⏰', title: 'Czas realizacji', desc: 'Pilne zlecenia kosztują więcej. Wycena uwzględnia dostępność ekip w Twoim mieście.' },
              { icon: '💡', title: 'Co zrobić przy okazji', desc: 'Wiemy kiedy warto coś wymienić teraz zamiast płacić za powrót ekipy za rok.' },
              { icon: '📁', title: 'Historia wycen', desc: 'Wszystkie wyceny zapisane. Możesz wrócić, porównać i podjąć świadomą decyzję.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors">
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="font-semibold text-white mb-2 text-sm">{item.title}</div>
                <div className="text-xs text-[#78716C] leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CENNIK */}
      <section id="cennik" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#C85A2A] uppercase tracking-widest mb-3">Cennik</p>
            <h2 className="font-serif text-4xl font-bold">Proste zasady, bez niespodzianek</h2>
            <p className="text-[#78716C] mt-3">Zacznij za darmo. Płać kiedy potrzebujesz więcej.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* FREE */}
            <div className="bg-white border border-[#E7E0D8] rounded-2xl p-8">
              <div className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest mb-4">Bezpłatny</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-serif text-5xl font-bold">0</span>
                <span className="text-lg font-semibold text-[#78716C] pb-1">zł</span>
              </div>
              <div className="text-sm text-[#A8A29E] mb-7">na zawsze</div>
              <ul className="space-y-3 mb-8">
                {[
                  { text: '3 wyceny miesięcznie', ok: true },
                  { text: 'Podgląd na ekranie', ok: true },
                  { text: 'Historia wycen', ok: true },
                  { text: 'Raport PDF', ok: false },
                  { text: 'Priorytetowa obsługa', ok: false },
                ].map((item) => (
                  <li key={item.text} className={`flex items-center gap-3 text-sm ${item.ok ? 'text-[#44403C]' : 'text-[#C4BDB8]'}`}>
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${item.ok ? 'bg-green-100 text-green-600' : 'bg-[#F2EDE6] text-[#C4BDB8]'}`}>
                      {item.ok ? '✓' : '—'}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full border border-[#E7E0D8] rounded-xl py-3 text-sm font-semibold text-[#44403C] hover:bg-[#FAF8F5] transition"
              >
                Zacznij za darmo
              </button>
            </div>

            {/* PRO */}
            <div className="bg-[#1C1917] rounded-2xl p-8 relative">
              <div className="absolute top-5 right-5 bg-[#C85A2A] text-white text-xs font-bold px-3 py-1 rounded-full">Popularne</div>
              <div className="text-xs font-semibold text-[#C0A882] uppercase tracking-widest mb-4">Pro</div>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-serif text-5xl font-bold text-white">39</span>
                <span className="text-lg font-semibold text-[#A8A29E] pb-1">zł</span>
              </div>
              <div className="text-sm text-[#A8A29E] mb-7">miesięcznie · anuluj kiedy chcesz</div>
              <ul className="space-y-3 mb-8">
                {[
                  'Nielimitowane wyceny',
                  'Podgląd na ekranie',
                  'Historia wycen',
                  'Raport PDF do pobrania',
                  'Priorytetowa obsługa',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#D4C9BE]">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C85A2A]/20 border border-[#C85A2A]/40 flex items-center justify-center text-xs font-bold text-[#E8A07A]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full bg-[#C85A2A] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20"
              >
                Zacznij — pierwsze 3 wyceny gratis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F2EDE6] border-y border-[#E7E0D8] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl font-bold mb-4">Gotowy na pierwszą wycenę?</h2>
          <p className="text-[#78716C] mb-8">Dołącz za darmo. Pierwsze 3 wyceny gratis, bez karty kredytowej.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="inline-flex items-center gap-2 bg-[#C85A2A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20"
          >
            Wyceń swój remont teraz →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E7E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            <span className="font-serif text-lg font-bold">Wyceń</span>
            <span className="font-serif text-lg font-bold text-[#C85A2A]">To</span>
            <span className="text-[#A8A29E] text-sm ml-2">· Made in Poland 🇵🇱</span>
          </div>
          <div className="flex gap-6 text-sm text-[#78716C]">
            <a href="#" className="hover:text-[#1C1917] transition-colors">Regulamin</a>
            <a href="#" className="hover:text-[#1C1917] transition-colors">Prywatność</a>
            <a href="mailto:kontakt@wycento.pl" className="hover:text-[#1C1917] transition-colors">Kontakt</a>
          </div>
          <span className="text-sm text-[#A8A29E]">© 2026 WyceńTo</span>
        </div>
      </footer>
    </main>
  )
}
