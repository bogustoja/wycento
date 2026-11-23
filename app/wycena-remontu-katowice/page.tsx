import type { Metadata } from 'next'
import SeoLanding from '../components/SeoLanding'

export const metadata: Metadata = {
  title: 'Wycena remontu Katowice i Śląsk — ceny 2026 | WyceńTo',
  description: 'Ile kosztuje remont w Katowicach i na Śląsku w 2026? Stawki glazurnika, malarza, hydraulika i elektryka, koszty łazienki, kuchni i pokoju. Darmowy kalkulator i wycena ze zdjęcia.',
}

export default function WycenaKatowice() {
  return (
    <SeoLanding
      calculator={{ room: 'lazienka', city: 'wojewodzkie', title: 'Kalkulator remontu — stawki dla Katowic' }}
      path="/wycena-remontu-katowice"
      badge="Katowice i Śląsk · Ceny 2026"
      h1="Wycena remontu w Katowicach —"
      h1Accent="ile to kosztuje w 2026?"
      intro="Katowice i miasta aglomeracji (Chorzów, Sosnowiec, Gliwice, Zabrze) mają podobne stawki, zwykle trochę niższe niż we Wrocławiu czy Krakowie. Specyfiką regionu są familoki i budynki na terenach szkód górniczych. Poniżej aktualne widełki i przykładowe koszty."
      ctaNav="Wyceń remont w Katowicach →"
      stawkiTitle="Stawki robocizny w Katowicach 2026"
      stawkiNote="Ceny brutto za robociznę (hydraulik i elektryk z drobnym materiałem), stan na listopad 2026. W centrum Katowic i w Gliwicach bliżej górnej granicy."
      stawki={[
        { name: 'Glazurnik — płytki standardowe', min: 100, max: 155, jednostka: 'zł/m²' },
        { name: 'Glazurnik — gres, duży format', min: 150, max: 235, jednostka: 'zł/m²' },
        { name: 'Malarz — 2 warstwy', min: 20, max: 32, jednostka: 'zł/m²' },
        { name: 'Gładź gipsowa', min: 40, max: 55, jednostka: 'zł/m²' },
        { name: 'Panele — montaż', min: 38, max: 60, jednostka: 'zł/m²' },
        { name: 'Hydraulik — punkt wod-kan', min: 400, max: 750, jednostka: 'zł/pkt' },
        { name: 'Elektryk — nowy punkt', min: 160, max: 260, jednostka: 'zł/pkt' },
      ]}
      przykladyTitle="Przykładowe koszty remontu w Katowicach"
      przyklady={[
        { room: 'Łazienka 5 m²', range: '16 000 – 28 000 zł', note: 'pełny remont z materiałami, średni standard' },
        { room: 'Kuchnia 10 m²', range: '22 000 – 45 000 zł', note: 'z meblami na wymiar, bez AGD' },
        { room: 'Pokój 16 m²', range: '6 500 – 13 000 zł', note: 'gładzie, malowanie, panele' },
      ]}
      lokalneTitle="Na co uważać przy remoncie na Śląsku"
      lokalne={[
        'W budynkach na terenach szkód górniczych ściany i stropy pracują. Pęknięcia tynków wracają, jeśli nie zastosujesz siatki zbrojącej i elastycznych fug, więc warto mieć je w ofercie.',
        'Familoki (Nikiszowiec, Załęże, Szopienice) mają grube ceglane mury i często starą instalację elektryczną w aluminium. Wymiana całej elektryki w mieszkaniu to dodatkowe kilka tysięcy złotych.',
        'Bloki z wielkiej płyty (Tysiąclecie, Osiedle Paderewskiego, Sosnowiec Zagórze): piony i wentylacja wyznaczają układ łazienki, a przeniesienie odpływu jest drogie.',
        'Dobre ekipy często obsługują całą aglomerację. Zapytaj, czy dojazd jest wliczony w cenę.',
      ]}
      faq={[
        { q: 'Ile kosztuje remont łazienki w Katowicach?', a: 'Pełny remont łazienki 4–6 m² w średnim standardzie to w Katowicach zwykle 15 000–29 000 zł z materiałami. W familoku z wymianą instalacji kwota rośnie.' },
        { q: 'Ile bierze glazurnik na Śląsku za m²?', a: 'Za standardowe płytki najczęściej 100–155 zł/m² brutto. Gres wielkoformatowy to zwykle 150–235 zł/m².' },
        { q: 'Czy szkody górnicze podnoszą koszt remontu?', a: 'Tak, zwykle o kilka procent: dochodzi siatka zbrojąca, elastyczne kleje i fugi oraz staranniejsze przygotowanie podłoża. Przy widocznych pęknięciach konstrukcji najpierw skonsultuj się z zarządcą budynku.' },
        { q: 'Czy wycena ze zdjęcia jest dokładna?', a: 'To wycena orientacyjna, jaką doświadczony wykonawca poda po obejrzeniu zdjęcia, dlatego dostajesz widełki min–max. Dokładny kosztorys zrobi ekipa po wizycie na miejscu.' },
      ]}
      ctaTitle="Wycena Twojego remontu na Śląsku"
      ctaText="Wrzuć zdjęcie pomieszczenia i wpisz swoje miasto. Dostaniesz widełki z podziałem na robociznę, materiały i koszty, których nie widać na zdjęciu."
      ctaButton="Wyceń mój remont →"
    />
  )
}
