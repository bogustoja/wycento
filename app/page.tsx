export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur border-b border-[#E7E0D8] px-12 h-16 flex items-center justify-between">
        <div className="font-serif text-xl font-bold">
          Wyceń<span className="text-[#C85A2A]">To</span>
        </div>
        <button className="bg-[#C85A2A] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#B04E24] transition">
          Wypróbuj za darmo
        </button>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-12 py-20">
        <div className="inline-flex items-center gap-2 bg-[#F5EBE4] text-[#C85A2A] text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
          🇵🇱 Polskie ceny, polskie realia
        </div>
        <h1 className="font-serif text-6xl font-bold leading-tight tracking-tight mb-6">
          Ile naprawdę<br />
          kosztuje Twój<br />
          <span className="text-[#C85A2A] italic">remont?</span>
        </h1>
        <p className="text-lg text-[#78716C] max-w-xl mb-10 leading-relaxed">
          Zrób zdjęcie pomieszczenia, podaj miasto. AI wyceni remont
          z prawdziwymi cenami dla Twojej okolicy — zanim zdążysz
          zadzwonić do ekipy.
        </p>

        {/* FORMULARZ */}
        <div className="bg-white border border-[#E7E0D8] rounded-xl p-6 max-w-xl shadow-sm">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Twoje miasto (np. Warszawa...)"
              className="flex-1 bg-[#FAF8F5] border border-[#E7E0D8] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C85A2A]"
            />
            <select className="bg-[#FAF8F5] border border-[#E7E0D8] rounded-lg px-4 py-2.5 text-sm outline-none">
              <option>Łazienka</option>
              <option>Kuchnia</option>
              <option>Pokój</option>
              <option>Całe mieszkanie</option>
            </select>
          </div>
          <div className="border-2 border-dashed border-[#E7E0D8] rounded-lg p-6 text-center mb-4 cursor-pointer hover:border-[#C85A2A] hover:bg-[#F5EBE4] transition">
            <div className="text-3xl mb-2">📷</div>
            <p className="text-sm text-[#78716C]">
              <strong className="text-[#44403C]">Dodaj zdjęcie pomieszczenia</strong><br />
              Kliknij lub przeciągnij plik
            </p>
          </div>
          <button className="w-full bg-[#C85A2A] text-white py-3 rounded-lg font-semibold hover:bg-[#B04E24] transition">
            Wyceń mój remont →
          </button>
        </div>

        <div className="flex gap-6 mt-6 text-sm text-[#78716C]">
          <span>✓ 3 wyceny za darmo</span>
          <span>✓ Bez karty kredytowej</span>
          <span>✓ Wyniki w 30 sekund</span>
        </div>
      </section>

      {/* KROKI */}
      <section className="bg-[#F2EDE6] border-y border-[#E7E0D8] py-20 px-12">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-[#C85A2A] uppercase tracking-widest mb-3">Jak to działa</p>
          <h2 className="font-serif text-4xl font-bold mb-12">Trzy kroki do wyceny</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { n: "01", icon: "📸", t: "Zrób zdjęcie", d: "Sfotografuj pomieszczenie które chcesz remontować." },
              { n: "02", icon: "📍", t: "Podaj miasto", d: "Ceny w Warszawie różnią się od Radomia — uwzględniamy to." },
              { n: "03", icon: "📋", t: "Dostaj wycenę", d: "Szczegółowy kosztorys: robocizna, materiały, czas realizacji." },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-8">
                <div className="font-serif text-5xl font-bold text-[#C85A2A]/20 mb-4">{s.n}</div>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-serif text-xl font-bold mb-2">{s.t}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E7E0D8] px-12 py-8 flex justify-between items-center bg-[#F2EDE6]">
        <div className="font-serif font-bold text-lg">
          Wyceń<span className="text-[#C85A2A]">To</span>
        </div>
        <p className="text-sm text-[#78716C]">© 2026 WyceńTo · Made in Poland 🇵🇱</p>
      </footer>

    </main>
  );
}
