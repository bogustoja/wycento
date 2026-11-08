import type { Metadata } from 'next'
import SeoLanding from '../components/SeoLanding'

export const metadata: Metadata = {
  title: 'Wycena remontu Wrocław — ceny 2026 | WyceńTo',
  description: 'Ile kosztuje remont we Wrocławiu w 2026? Stawki glazurnika, malarza, hydraulika i elektryka, przykładowe koszty łazienki, kuchni i pokoju. Wycena ze zdjęcia w 30 sekund.',
}

export default function WycenaWroclaw() {
  return (
    <SeoLanding
      path="/wycena-remontu-wroclaw"
      badge="Wrocław · Ceny 2026"
      h1="Wycena remontu we Wrocławiu —"
      h1Accent="ile to kosztuje w 2026?"
      intro="Wrocław należy do droższych rynków remontowych w Polsce — stawki ekip są zwykle o 15–25% wyższe niż w mniejszych miastach. Poniżej aktualne widełki robocizny i przykładowe koszty całych pomieszczeń, żebyś wiedział, czy oferta, którą dostałeś, jest rozsądna."
      ctaNav="Wyceń remont we Wrocławiu →"
      stawkiTitle="Stawki robocizny we Wrocławiu 2026"
      stawkiNote="Ceny brutto za robociznę (hydraulik i elektryk — z drobnym materiałem), stan na listopad 2026. Dolna granica to zwykle prosty zakres i dostępna ekipa, górna — trudne podłoże, duży format płytek, pilny termin."
      stawki={[
        { name: 'Glazurnik — płytki standardowe', min: 115, max: 170, jednostka: 'zł/m²' },
        { name: 'Glazurnik — gres, duży format', min: 165, max: 260, jednostka: 'zł/m²' },
        { name: 'Malarz — 2 warstwy', min: 23, max: 35, jednostka: 'zł/m²' },
        { name: 'Gładź gipsowa', min: 50, max: 62, jednostka: 'zł/m²' },
        { name: 'Panele — montaż', min: 40, max: 65, jednostka: 'zł/m²' },
        { name: 'Hydraulik — punkt wod-kan', min: 500, max: 900, jednostka: 'zł/pkt' },
        { name: 'Elektryk — nowy punkt', min: 190, max: 300, jednostka: 'zł/pkt' },
      ]}
      przykladyTitle="Przykładowe koszty remontu we Wrocławiu"
      przyklady={[
        { room: 'Łazienka 5 m²', range: '18 000 – 30 000 zł', note: 'pełny remont z materiałami, średni standard' },
        { room: 'Kuchnia 10 m²', range: '25 000 – 50 000 zł', note: 'z meblami na wymiar, bez AGD' },
        { room: 'Pokój 16 m²', range: '7 000 – 15 000 zł', note: 'gładzie, malowanie, panele' },
      ]}
      lokalneTitle="Na co uważać przy remoncie we Wrocławiu"
      lokalne={[
        'W przedwojennych kamienicach (Nadodrze, Ołbin, Przedmieście Oławskie) licz się z krzywymi ścianami i starą instalacją — wyrównanie i wymiana pionów potrafią podnieść koszt łazienki o kilka tysięcy złotych.',
        'W blokach z wielkiej płyty sprawdź przed skuciem, którędy idą piony i wentylacja — przeniesienie odpływu to często najdroższa część łazienki.',
        'Dobre ekipy mają terminy na kilka tygodni do przodu. Kto „może jutro” i jest wyraźnie tańszy od widełek powyżej, często nie daje faktury ani gwarancji.',
        'Wywóz gruzu i transport materiałów na wyższe piętra bez windy to osobne pozycje — dopytaj, czy są w ofercie.',
      ]}
      faq={[
        { q: 'Ile kosztuje remont łazienki we Wrocławiu?', a: 'Pełny remont łazienki 4–6 m² w średnim standardzie to we Wrocławiu zwykle 18 000–32 000 zł razem z materiałami. W kamienicy z wymianą pionów i wyrównaniem ścian kwota rośnie.' },
        { q: 'Ile bierze glazurnik we Wrocławiu za m²?', a: 'Za układanie standardowych płytek najczęściej 115–170 zł/m² brutto. Gres i duże formaty (60×120 i większe) to zwykle 165–260 zł/m², mozaika jeszcze więcej.' },
        { q: 'Ile kosztuje malowanie mieszkania we Wrocławiu?', a: 'Malowanie dwiema warstwami to ok. 23–35 zł za m² ściany. Pokój 16 m² ma ok. 50–55 m² ścian i sufitu, więc sama robocizna wychodzi ok. 1 200–1 900 zł plus farby.' },
        { q: 'Czy wycena ze zdjęcia jest dokładna?', a: 'To wycena orientacyjna — taka, jaką doświadczony wykonawca poda po obejrzeniu zdjęcia. Dlatego dostajesz widełki min–max, a nie jedną liczbę. Dokładny kosztorys zrobi ekipa po wizycie na miejscu.' },
      ]}
      ctaTitle="Wycena Twojego remontu we Wrocławiu"
      ctaText="Wrzuć zdjęcie pomieszczenia i wpisz „Wrocław”. Dostaniesz widełki z podziałem na robociznę, materiały i koszty, których nie widać na zdjęciu."
      ctaButton="Wyceń mój remont →"
    />
  )
}
