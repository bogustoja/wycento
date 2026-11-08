import type { Metadata } from 'next'
import { LegalPage } from '../components/LegalPage'
import { CONTACT_EMAIL } from '../lib/site'

export const metadata: Metadata = {
  title: 'Regulamin — WyceńTo',
  description: 'Zasady korzystania z serwisu WyceńTo: wyceny remontów ze zdjęcia, plan bezpłatny i Pro, płatności, reklamacje i odstąpienie od umowy.',
}

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>

export default function Regulamin() {
  return (
    <LegalPage title="Regulamin" effective="8 listopada 2026" current="/regulamin">
      <section>
        <h2>§1. Postanowienia ogólne</h2>
        <p>Regulamin określa zasady korzystania z serwisu WyceńTo dostępnego pod adresem wycento.app (dalej „Serwis”). Operatorem Serwisu jest osoba fizyczna działająca pod marką WyceńTo (dalej „Operator”). Kontakt z Operatorem: <Mail />.</p>
        <p>Regulamin jest regulaminem, o którym mowa w art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną. Przed założeniem konta należy zapoznać się z Regulaminem.</p>
      </section>

      <section>
        <h2>§2. Usługi</h2>
        <p>WyceńTo to narzędzie do orientacyjnej wyceny remontów z wykorzystaniem sztucznej inteligencji. Serwis umożliwia:</p>
        <ul>
          <li>przesłanie zdjęcia pomieszczenia i uzyskanie szacunkowej wyceny (widełki min–max),</li>
          <li>przechowywanie historii wycen na koncie,</li>
          <li>pobranie wyceny w formie raportu do druku / PDF.</li>
        </ul>
        <p>Wyceny mają charakter <strong>wyłącznie orientacyjny</strong> — nie są ofertą handlową, kosztorysem inwestorskim ani opinią rzeczoznawcy. Rzeczywiste koszty mogą się różnić, m.in. od stanu instalacji niewidocznych na zdjęciu.</p>
      </section>

      <section>
        <h2>§3. Wymagania techniczne</h2>
        <ul>
          <li>urządzenie z dostępem do internetu i aktualną przeglądarką (Chrome, Safari, Firefox, Edge, Opera) z włączonym JavaScript i plikami cookies,</li>
          <li>aktywny adres e-mail lub konto Google,</li>
          <li>zdjęcie w formacie JPG lub PNG.</li>
        </ul>
      </section>

      <section>
        <h2>§4. Konto</h2>
        <p>Korzystanie z wycen wymaga założenia bezpłatnego konta. Umowa o prowadzenie konta zostaje zawarta z chwilą potwierdzenia adresu e-mail (lub zalogowania przez Google) i trwa bezterminowo. Możesz ją rozwiązać w każdej chwili, prosząc o usunięcie konta pod adresem <Mail />.</p>
        <p>Operator może zablokować lub usunąć konto użytkownika, który narusza Regulamin, po uprzednim wezwaniu do zaprzestania naruszeń.</p>
      </section>

      <section>
        <h2>§5. Plany i płatności</h2>
        <p><strong>Plan Bezpłatny</strong> — 3 bezpłatne wyceny na konto (jednorazowo, pula nie odnawia się).</p>
        <p><strong>Plan Pro</strong> — subskrypcja miesięczna za 39 zł brutto, odnawiana automatycznie co miesiąc. Zapewnia nielimitowaną liczbę wycen. Płatności obsługuje Stripe.</p>
        <p>Subskrypcję możesz anulować w każdej chwili w panelu użytkownika. Dostęp do Pro trwa do końca opłaconego okresu rozliczeniowego.</p>
      </section>

      <section>
        <h2>§6. Odstąpienie od umowy (konsumenci)</h2>
        <p>Konsument może odstąpić od umowy subskrypcji bez podania przyczyny w terminie 14 dni od jej zawarcia, wysyłając oświadczenie na <Mail />. Jeśli przed upływem tego terminu zażądasz rozpoczęcia świadczenia usługi Pro, w razie odstąpienia zapłacisz kwotę proporcjonalną do okresu, w którym usługa była świadczona (art. 35 ustawy o prawach konsumenta). Zwrot nastąpi w ciągu 14 dni tą samą metodą płatności.</p>
      </section>

      <section>
        <h2>§7. Zasady korzystania</h2>
        <p>Zabronione jest przesyłanie treści o charakterze bezprawnym, w tym zdjęć naruszających prawa osób trzecich lub przedstawiających osoby bez ich zgody, a także udostępnianie konta innym osobom i próby obchodzenia limitów Serwisu.</p>
      </section>

      <section>
        <h2>§8. Reklamacje</h2>
        <p>Reklamacje dotyczące działania Serwisu lub płatności zgłoś na <Mail />, podając adres e-mail konta i opis problemu. Odpowiemy w ciągu 14 dni. Konsument może też skorzystać z pozasądowych sposobów rozwiązywania sporów, np. pomocy miejskiego lub powiatowego rzecznika konsumentów.</p>
      </section>

      <section>
        <h2>§9. Odpowiedzialność</h2>
        <p>Ponieważ wyceny są orientacyjne (§2), Operator nie odpowiada za różnice między wyceną a rzeczywistym kosztem remontu ani za decyzje podjęte wyłącznie na jej podstawie. Operator dokłada starań, by Serwis działał bez przerw, ale mogą wystąpić przerwy techniczne. Postanowienia tego paragrafu nie ograniczają uprawnień konsumentów wynikających z bezwzględnie obowiązujących przepisów.</p>
      </section>

      <section>
        <h2>§10. Zmiany Regulaminu</h2>
        <p>O zmianach Regulaminu poinformujemy e-mailem z co najmniej 14-dniowym wyprzedzeniem. Jeśli nie akceptujesz zmian, możesz przed ich wejściem w życie usunąć konto i anulować subskrypcję.</p>
        <p>Dane osobowe przetwarzamy zgodnie z <a href="/prywatnosc">Polityką prywatności</a>.</p>
      </section>
    </LegalPage>
  )
}
