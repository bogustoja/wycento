export default function Prywatnosc() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <nav className="bg-white border-b border-[#E7E0D8]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <a href="/" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">← Strona główna</a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl font-bold text-[#1C1917] mb-2">Polityka prywatności</h1>
        <p className="text-sm text-[#A8A29E] mb-12">Obowiązuje od 1 maja 2026</p>

        <div className="space-y-10 text-[#44403C] text-sm leading-relaxed">

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">1. Administrator danych</h2>
            <p>Administratorem danych osobowych użytkowników serwisu WyceńTo (wycento.vercel.app) jest osoba fizyczna prowadząca działalność pod marką WyceńTo. Kontakt: <a href="mailto:kontakt@wycento.pl" className="text-[#C85A2A] hover:underline">kontakt@wycento.pl</a></p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">2. Jakie dane zbieramy</h2>
            <ul className="list-disc list-inside space-y-2 ml-3">
              <li><strong>Adres e-mail</strong> — przy rejestracji konta</li>
              <li><strong>Zdjęcia pomieszczeń</strong> — przesyłane do analizy (nie są przechowywane po wygenerowaniu wyceny)</li>
              <li><strong>Wyniki wycen</strong> — przechowywane na Twoim koncie w formie zaszyfrowanej</li>
              <li><strong>Dane płatności</strong> — obsługiwane wyłącznie przez Stripe; nie mamy dostępu do numerów kart</li>
              <li><strong>Dane techniczne</strong> — adres IP, przeglądarka (logi systemowe)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">3. W jakim celu przetwarzamy dane</h2>
            <ul className="list-disc list-inside space-y-2 ml-3">
              <li>Świadczenie usług Serwisu (wyceny, historia, PDF)</li>
              <li>Obsługa konta i uwierzytelnianie</li>
              <li>Realizacja płatności i zarządzanie subskrypcją</li>
              <li>Kontakt w sprawach technicznych i obsługi klienta</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">4. Podstawa prawna (RODO)</h2>
            <p>Przetwarzamy dane na podstawie:</p>
            <ul className="list-disc list-inside mt-3 space-y-2 ml-3">
              <li>Art. 6 ust. 1 lit. b RODO — wykonanie umowy (świadczenie usług)</li>
              <li>Art. 6 ust. 1 lit. c RODO — obowiązki prawne (np. przepisy podatkowe)</li>
              <li>Art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes (bezpieczeństwo)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">5. Podmioty zewnętrzne</h2>
            <ul className="list-disc list-inside space-y-2 ml-3">
              <li><strong>Supabase</strong> — przechowywanie kont i wycen (serwery w UE)</li>
              <li><strong>Anthropic (Claude)</strong> — analiza zdjęć i generowanie wycen</li>
              <li><strong>Stripe</strong> — obsługa płatności</li>
              <li><strong>Vercel</strong> — hosting aplikacji</li>
            </ul>
            <p className="mt-3">Wszystkie podmioty zapewniają odpowiedni poziom ochrony danych zgodnie z RODO.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">6. Czas przechowywania</h2>
            <p>Dane konta i wycen przechowujemy do momentu usunięcia konta. Dane płatnicze (faktury) przechowujemy przez 5 lat zgodnie z przepisami podatkowymi.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">7. Twoje prawa</h2>
            <p>Masz prawo do:</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5 ml-3">
              <li>dostępu do swoich danych</li>
              <li>sprostowania danych</li>
              <li>usunięcia danych („prawo do bycia zapomnianym")</li>
              <li>przenoszenia danych</li>
              <li>ograniczenia przetwarzania</li>
              <li>wniesienia skargi do UODO (Urząd Ochrony Danych Osobowych)</li>
            </ul>
            <p className="mt-3">Aby skorzystać z praw, napisz na: <a href="mailto:kontakt@wycento.pl" className="text-[#C85A2A] hover:underline">kontakt@wycento.pl</a></p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">8. Pliki cookies</h2>
            <p>Serwis używa plików cookies sesyjnych niezbędnych do działania uwierzytelniania (Supabase Auth). Nie używamy cookies reklamowych ani śledzących.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-3">9. Zmiany polityki</h2>
            <p>O istotnych zmianach Polityki prywatności poinformujemy drogą e-mail z 14-dniowym wyprzedzeniem.</p>
          </section>

        </div>
      </div>

      <footer className="border-t border-[#E7E0D8] mt-8">
        <div className="max-w-4xl mx-auto px-6 py-6 flex gap-6 text-sm text-[#78716C]">
          <a href="/regulamin" className="hover:text-[#1C1917] transition-colors">Regulamin</a>
          <a href="/prywatnosc" className="hover:text-[#1C1917] transition-colors font-medium">Prywatność</a>
          <a href="/" className="hover:text-[#1C1917] transition-colors">Strona główna</a>
        </div>
      </footer>
    </main>
  )
}
