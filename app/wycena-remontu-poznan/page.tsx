import type { Metadata } from 'next'
import SeoLanding from '../components/SeoLanding'

export const metadata: Metadata = {
  title: 'Wycena remontu Poznań — ceny 2026 | WyceńTo',
  description: 'Ile kosztuje remont w Poznaniu w 2026? Stawki glazurnika, malarza, hydraulika i elektryka, przykładowe koszty łazienki, kuchni i pokoju. Darmowy kalkulator i wycena ze zdjęcia.',
}

export default function WycenaPoznan() {
  return (
    <SeoLanding
      calculator={{ room: 'lazienka', city: 'duze', title: 'Kalkulator remontu — stawki dla Poznania' }}
      path="/wycena-remontu-poznan"
      badge="Poznań · Ceny 2026"
      h1="Wycena remontu w Poznaniu —"
      h1Accent="ile to kosztuje w 2026?"
      intro="Poznań ma niskie bezrobocie i dużo budów, więc dobre ekipy są zajęte, a stawki są o ok. 15–20% wyższe niż w mniejszych miastach Wielkopolski. Poniżej aktualne widełki robocizny i przykładowe koszty całych pomieszczeń."
      ctaNav="Wyceń remont w Poznaniu →"
      stawkiTitle="Stawki robocizny w Poznaniu 2026"
      stawkiNote="Ceny brutto za robociznę (hydraulik i elektryk z drobnym materiałem), stan na listopad 2026. Górna granica to trudne podłoże, duży format płytek albo krótki termin."
      stawki={[
        { name: 'Glazurnik — płytki standardowe', min: 110, max: 165, jednostka: 'zł/m²' },
        { name: 'Glazurnik — gres, duży format', min: 160, max: 250, jednostka: 'zł/m²' },
        { name: 'Malarz — 2 warstwy', min: 22, max: 34, jednostka: 'zł/m²' },
        { name: 'Gładź gipsowa', min: 45, max: 60, jednostka: 'zł/m²' },
        { name: 'Panele — montaż', min: 40, max: 65, jednostka: 'zł/m²' },
        { name: 'Hydraulik — punkt wod-kan', min: 450, max: 850, jednostka: 'zł/pkt' },
        { name: 'Elektryk — nowy punkt', min: 180, max: 280, jednostka: 'zł/pkt' },
      ]}
      przykladyTitle="Przykładowe koszty remontu w Poznaniu"
      przyklady={[
        { room: 'Łazienka 5 m²', range: '18 000 – 30 000 zł', note: 'pełny remont z materiałami, średni standard' },
        { room: 'Kuchnia 10 m²', range: '24 000 – 48 000 zł', note: 'z meblami na wymiar, bez AGD' },
        { room: 'Pokój 16 m²', range: '7 000 – 14 000 zł', note: 'gładzie, malowanie, panele' },
      ]}
      lokalneTitle="Na co uważać przy remoncie w Poznaniu"
      lokalne={[
        'Kamienice na Jeżycach, Łazarzu i Wildzie mają wysokie stropy (3–3,5 m), więc powierzchnia ścian do gładzi i malowania jest nawet o 30% większa niż w bloku o tym samym metrażu.',
        'Bloki z wielkiej płyty na Ratajach, Winogradach i Piątkowie: przed planowaniem łazienki sprawdź położenie pionów i stan wentylacji. Przeniesienie odpływu to najdroższy element.',
        'Na nowych osiedlach (Naramowice, Strzeszyn) wykończenie od stanu deweloperskiego zwykle nie wymaga skuwania, więc łazienka wychodzi o kilka tysięcy złotych taniej niż remont.',
        'Wywóz gruzu i wniesienie materiałów bez windy to osobne pozycje. Dopytaj, czy są w ofercie.',
      ]}
      faq={[
        { q: 'Ile kosztuje remont łazienki w Poznaniu?', a: 'Pełny remont łazienki 4–6 m² w średnim standardzie to w Poznaniu zwykle 17 000–31 000 zł z materiałami. Wykończenie od stanu deweloperskiego bez skuwania jest tańsze o ok. 2–4 tys. zł.' },
        { q: 'Ile bierze glazurnik w Poznaniu za m²?', a: 'Za standardowe płytki najczęściej 110–165 zł/m² brutto. Gres wielkoformatowy 60×120 i większy to zwykle 160–250 zł/m².' },
        { q: 'Ile kosztuje malowanie mieszkania w Poznaniu?', a: 'Dwie warstwy to ok. 22–34 zł za m² ściany i sufitu. Mieszkanie 50 m² w bloku ma ok. 150–170 m² do malowania, więc robocizna to ok. 3 500–5 500 zł plus farby.' },
        { q: 'Czy wycena ze zdjęcia jest dokładna?', a: 'To wycena orientacyjna, jaką doświadczony wykonawca poda po obejrzeniu zdjęcia, dlatego dostajesz widełki min–max. Dokładny kosztorys zrobi ekipa po wizycie na miejscu.' },
      ]}
      ctaTitle="Wycena Twojego remontu w Poznaniu"
      ctaText="Wrzuć zdjęcie pomieszczenia i wpisz „Poznań”. Dostaniesz widełki z podziałem na robociznę, materiały i koszty, których nie widać na zdjęciu."
      ctaButton="Wyceń mój remont →"
    />
  )
}
