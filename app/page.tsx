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
          zadzwonić do ekipy lub majstra.
        </p>

        {/* FORMULARZ */}
        <div className="bg-white border border-[#E7E0D8] rounded-xl p-6 max-w-xl shadow-sm">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Miasto lub kod pocztowy (np. Warszawa, 02-001...)"
              className="flex-1 bg-[#FAF8F5] border border-[#E7E0D8] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C85A2A]"
            />
            <select className="bg-[#FAF8F5] border border-[#E7E0D8] rounded-lg px-4 py-2.5 text-sm outline-none">
              <option>Łazienka</option>
              <option>Kuchnia</option>
              <option>Przedpokój</option>
              <option>Sypialnia</option>
              <option>Garderoba</option>
              <option>Taras</option>
              <option>Ogród</option>
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
              { n: "02", icon: "📍", t: "Podaj lokalizację", d: "Wpisz miasto lub kod pocztowy. Ceny w Warszawie różnią się od Radomia — uwzględniamy to." },
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
{/* DLACZEGO */}
      <section className="bg-[#1C1917] text-white py-20 px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs font-semibold text-[#E8A07A] uppercase tracking-widest mb-3">Dlaczego WyceńTo</p>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-6">
              Koniec z remontami które kosztują{" "}
              <span className="text-[#E8A07A] italic">dwa razy więcej</span>{" "}
              niż planowałeś
            </h2>
            <p className="text-[#A8A29E] leading-relaxed">
              Większość problemów remontowych zaczyna się zanim ekipa wejdzie do mieszkania. WyceńTo to zmienia.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { icon: "😤", t: "Klient zmienił zdanie po robocie", d: "Ekipa wraca, przerabia, traci czas. Klient płaci 30% więcej. Nikt nie jest zadowolony." },
              { icon: "🤷", t: "Nie wiedziałem ile to kosztuje", d: "Pierwsza oferta: 8 000 zł. Druga: 14 000 zł. Jak sprawdzić która jest uczciwa?" },
              { icon: "📋", t: "Co warto zrobić od razu?", d: "Przy wymianie płytek warto też wymienić instalację — ale nikt Ci tego nie powie zanim nie zapłacisz za powrót ekipy." },
            ].map((p) => (
              <div key={p.t} className="bg-white/5 border border-white/10 rounded-xl p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">{p.icon}</span>
                <div>
                  <div className="font-semibold text-white mb-1">{p.t}</div>
                  <div className="text-sm text-[#78716C] leading-relaxed">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CENNIK */}
      <section className="py-20 px-12 max-w-5xl mx-auto">
        <p className="text-xs font-semibold text-[#C85A2A] uppercase tracking-widest mb-3">Cennik</p>
        <h2 className="font-serif text-4xl font-bold mb-12">Proste zasady,<br />bez ukrytych opłat</h2>
        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          {/* FREE */}
          <div className="bg-white border border-[#E7E0D8] rounded-xl p-7">
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-3">Bezpłatny</div>
            <div className="font-serif text-5xl font-bold mb-1">0<sup className="text-xl">zł</sup></div>
            <div className="text-sm text-[#78716C] mb-6">na zawsze</div>
            <ul className="text-sm space-y-2 mb-6">
              {["3 wyceny miesięcznie", "Zdjęcie + opis", "Ceny lokalne (PL)"].map(i => (
                <li key={i} className="flex gap-2 text-[#44403C]"><span className="text-[#4A7C59]">✓</span>{i}</li>
              ))}
              {["Raport PDF", "Historia wycen", "Wersja UK"].map(i => (
                <li key={i} className="flex gap-2 text-[#C4BDB8]"><span>—</span>{i}</li>
              ))}
            </ul>
            <button className="w-full border border-[#E7E0D8] rounded-lg py-3 text-sm font-semibold hover:bg-[#F2EDE6] transition">
              Zacznij za darmo
            </button>
          </div>
          {/* PRO */}
          <div className="bg-white border-2 border-[#C85A2A] rounded-xl p-7 relative">
            <div className="absolute -top-3 left-6 bg-[#C85A2A] text-white text-xs font-bold px-3 py-1 rounded-full">
              Najpopularniejszy
            </div>
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-3">Pro</div>
            <div className="font-serif text-5xl font-bold mb-1">39<sup className="text-xl">zł</sup></div>
            <div className="text-sm text-[#78716C] mb-6">miesięcznie · anuluj kiedy chcesz</div>
            <ul className="text-sm space-y-2 mb-6">
              {["Nielimitowane wyceny", "Zdjęcie + opis", "Ceny lokalne (PL + UK)", "Raport PDF do pobrania", "Historia wycen", "Priorytetowa obsługa"].map(i => (
                <li key={i} className="flex gap-2 text-[#44403C]"><span className="text-[#4A7C59]">✓</span>{i}</li>
              ))}
            </ul>
            <button className="w-full bg-[#C85A2A] text-white rounded-lg py-3 text-sm font-semibold hover:bg-[#B04E24] transition">
              Wybierz Pro
            </button>
          </div>
        </div>
      </section>

      {/* ZAPIS */}
      <section className="bg-[#C85A2A] py-16 px-12 text-center">
        <h2 className="font-serif text-4xl font-bold text-white mb-3">
          Zapisz się na listę oczekujących
        </h2>
        <p className="text-white/75 mb-8 text-lg">
          Dostaniesz dostęp jako pierwszy — i 3 miesiące Pro gratis przy starcie.
        </p>
        <div className="flex gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="twoj@email.pl"
            className="flex-1 bg-white rounded-lg px-4 py-3 text-sm outline-none"
          />
          <button className="bg-[#1C1917] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#3d3835] transition whitespace-nowrap">
            Zapisz mnie
          </button>
        </div>
        <p className="text-white/50 text-xs mt-4">Żadnego spamu. Tylko info o premierze.</p>
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
