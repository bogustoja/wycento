import type { Metadata } from 'next'
import { LegalPage } from '../components/LegalPage'
import { CONTACT_EMAIL, SELLER_LINE } from '../lib/site'

export const metadata: Metadata = {
  title: 'Polityka prywatności — WyceńTo',
  description: 'Jakie dane zbiera WyceńTo, w jakim celu, komu je powierzamy i jakie masz prawa (RODO). Zdjęć pomieszczeń nie zapisujemy.',
}

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>

export default function Prywatnosc() {
  return (
    <LegalPage title="Polityka prywatności" effective="8 listopada 2026" current="/prywatnosc">
      <section>
        <h2>1. Administrator danych</h2>
        <p>Administratorem danych osobowych użytkowników serwisu WyceńTo (wycento.app) jest {SELLER_LINE}, prowadzący działalność pod marką WyceńTo. Kontakt w sprawach danych osobowych: <Mail />.</p>
      </section>

      <section>
        <h2>2. Jakie dane zbieramy</h2>
        <ul>
          <li><strong>Adres e-mail</strong> — przy zakładaniu konta (lub z konta Google, jeśli logujesz się przez Google).</li>
          <li><strong>Zdjęcia pomieszczeń</strong> — wysyłane do analizy przez Anthropic (model Claude). Nie zapisujemy ich na naszych serwerach.</li>
          <li><strong>Wyniki wycen</strong> — miasto, rodzaj pomieszczenia, opis i wynik wyceny, zapisane na Twoim koncie.</li>
          <li><strong>Dane płatności</strong> — obsługuje je wyłącznie Stripe; nie widzimy numerów kart.</li>
          <li><strong>Dane techniczne</strong> — adres IP i informacje o przeglądarce w logach serwera.</li>
        </ul>
      </section>

      <section>
        <h2>3. Cele i podstawy prawne</h2>
        <ul>
          <li>Świadczenie usług Serwisu, prowadzenie konta, wyceny i historia — art. 6 ust. 1 lit. b RODO (wykonanie umowy).</li>
          <li>Płatności i rozliczenia podatkowe — art. 6 ust. 1 lit. b i c RODO.</li>
          <li>Bezpieczeństwo, zapobieganie nadużyciom, statystyki odwiedzin — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes).</li>
          <li>Odpowiedzi na wiadomości — art. 6 ust. 1 lit. f RODO.</li>
        </ul>
        <p>Podanie adresu e-mail jest dobrowolne, ale bez niego nie da się założyć konta.</p>
      </section>

      <section>
        <h2>4. Komu powierzamy dane</h2>
        <ul>
          <li><strong>Supabase</strong> — baza danych i logowanie (serwery w Irlandii, UE).</li>
          <li><strong>Vercel</strong> — hosting aplikacji (funkcje uruchamiane we Frankfurcie, UE) i anonimowe statystyki odwiedzin.</li>
          <li><strong>Anthropic</strong> — analiza zdjęć i generowanie wycen (USA).</li>
          <li><strong>Stripe</strong> — obsługa płatności.</li>
          <li><strong>Google</strong> — tylko jeśli logujesz się przez konto Google.</li>
        </ul>
        <p>Część tych firm ma siedzibę w USA lub korzysta z infrastruktury poza Europejskim Obszarem Gospodarczym. Przekazanie danych odbywa się na podstawie decyzji Komisji Europejskiej w sprawie EU-US Data Privacy Framework lub standardowych klauzul umownych zatwierdzonych przez Komisję.</p>
      </section>

      <section>
        <h2>5. Jak długo przechowujemy dane</h2>
        <p>Dane konta i wycen — do usunięcia konta. Dokumenty rozliczeniowe — przez 5 lat od końca roku podatkowego, zgodnie z przepisami podatkowymi. Logi serwera — przez krótki okres ustalony przez dostawcę hostingu.</p>
      </section>

      <section>
        <h2>6. Twoje prawa</h2>
        <p>Masz prawo do:</p>
        <ul>
          <li>dostępu do swoich danych i otrzymania ich kopii,</li>
          <li>sprostowania danych,</li>
          <li>usunięcia danych („prawo do bycia zapomnianym”),</li>
          <li>ograniczenia przetwarzania i przenoszenia danych,</li>
          <li>sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,</li>
          <li>skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO).</li>
        </ul>
        <p>Aby skorzystać z praw, napisz na <Mail />.</p>
      </section>

      <section>
        <h2>7. Pliki cookies i statystyki</h2>
        <p>Używamy wyłącznie plików cookies niezbędnych do działania Serwisu — utrzymują zalogowanie (Supabase Auth). Nie używamy cookies reklamowych ani śledzących, dlatego nie wyświetlamy banera zgody.</p>
        <p>Do liczenia odwiedzin używamy Vercel Web Analytics, które nie zapisuje cookies i nie identyfikuje użytkowników — zlicza zanonimizowane odsłony stron.</p>
      </section>

      <section>
        <h2>8. Zmiany polityki</h2>
        <p>O istotnych zmianach poinformujemy e-mailem z 14-dniowym wyprzedzeniem.</p>
      </section>
    </LegalPage>
  )
}
