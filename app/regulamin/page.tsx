import LogoIcon from '../components/LogoIcon'

export default function Regulamin() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <nav className="bg-white border-b border-[#E7E0D8]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <a href="/" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">← Strona główna</a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl font-bold text-[#1C1917] mb-2">Regulamin</h1>
        <p className="text-sm text-[#A8A29E] mb-12">Obowiązuje od 1 maja 2026</p>

        <div className="prose prose-stone max-w-none space-y-10 text-[#44403C] text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">§1. Postanowienia ogólne</h2>
            <p>Niniejszy regulamin określa zasady korzystania z serwisu WyceńTo dostępnego pod adresem wycento.vercel.app, zwanego dalej „Serwisem". Operatorem Serwisu jest osoba fizyczna prowadząca działalność pod marką WyceńTo.</p>
            <p className="mt-3">Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">§2. Opis usługi</h2>
            <p>WyceńTo to narzędzie do orientacyjnej wyceny remontów i prac budowlanych z wykorzystaniem sztucznej inteligencji. Serwis umożliwia:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-3">
              <li>przesyłanie zdjęć pomieszczeń i uzyskiwanie szacunkowych wycen</li>
              <li>przechowywanie historii wycen</li>
              <li>pobieranie raportów w formacie PDF (plan Pro)</li>
            </ul>
            <p className="mt-3">Wyceny generowane przez Serwis mają charakter <strong>wyłącznie orientacyjny</strong> i nie stanowią oferty handlowej, ani wyceny rzeczoznawcy. Rzeczywiste koszty remontu mogą różnić się od podanych wartości.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">§3. Konto użytkownika</h2>
            <p>Korzystanie z Serwisu wymaga rejestracji i założenia konta. Użytkownik zobowiązany jest do podania prawdziwych danych i zachowania poufności hasła.</p>
            <p className="mt-3">Operator zastrzega sobie prawo do usunięcia konta użytkownika naruszającego postanowienia Regulaminu.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">§4. Plany i płatności</h2>
            <p><strong>Plan Bezpłatny</strong> — umożliwia wykonanie 3 wycen miesięcznie bez opłat.</p>
            <p className="mt-3"><strong>Plan Pro</strong> — subskrypcja miesięczna za 39 zł brutto. Zapewnia nielimitowaną liczbę wycen oraz pobieranie raportów PDF. Płatności realizowane są za pośrednictwem serwisu Stripe.</p>
            <p className="mt-3">Subskrypcję można anulować w dowolnym momencie poprzez panel użytkownika. Dostęp do funkcji Pro trwa do końca opłaconego okresu rozliczeniowego.</p>
            <p className="mt-3">Operator nie zwraca opłat za niewykorzystany okres subskrypcji, chyba że wymagają tego bezwzględnie obowiązujące przepisy prawa.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">§5. Prawa i obowiązki użytkownika</h2>
            <p>Użytkownik zobowiązuje się do:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-3">
              <li>korzystania z Serwisu zgodnie z prawem i postanowieniami Regulaminu</li>
              <li>nieprzesyłania treści nielegalnych, obraźliwych lub naruszających prawa osób trzecich</li>
              <li>nieudostępniania konta osobom trzecim</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">§6. Ograniczenie odpowiedzialności</h2>
            <p>Serwis dostarcza wyceny na podstawie zdjęć i danych dostarczonych przez użytkownika przy użyciu modeli sztucznej inteligencji. Operator nie ponosi odpowiedzialności za:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-3">
              <li>rozbieżności między wyceną a rzeczywistymi kosztami remontu</li>
              <li>decyzje podejmowane przez użytkownika na podstawie wyceny</li>
              <li>przerwy w działaniu Serwisu</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">§7. Zmiany Regulaminu</h2>
            <p>Operator zastrzega sobie prawo do zmiany Regulaminu. O zmianach użytkownicy będą informowani drogą mailową z 14-dniowym wyprzedzeniem. Dalsze korzystanie z Serwisu po tym terminie oznacza akceptację nowych warunków.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">§8. Kontakt</h2>
            <p>W sprawach dotyczących Regulaminu prosimy o kontakt pod adresem: <a href="mailto:kontakt@wycento.pl" className="text-[#C85A2A] hover:underline">kontakt@wycento.pl</a></p>
          </section>

        </div>
      </div>

      <footer className="border-t border-[#E7E0D8] mt-8">
        <div className="max-w-4xl mx-auto px-6 py-6 flex gap-6 text-sm text-[#78716C]">
          <a href="/regulamin" className="hover:text-[#1C1917] transition-colors font-medium">Regulamin</a>
          <a href="/prywatnosc" className="hover:text-[#1C1917] transition-colors">Prywatność</a>
          <a href="/" className="hover:text-[#1C1917] transition-colors">Strona główna</a>
        </div>
      </footer>
    </main>
  )
}
