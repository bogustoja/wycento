import type { Metadata } from 'next'
import SeoLanding from '../components/SeoLanding'

export const metadata: Metadata = {
  title: 'Wycena remontu Gdańsk, Gdynia, Sopot — ceny 2026 | WyceńTo',
  description: 'Ile kosztuje remont w Trójmieście w 2026? Stawki glazurnika, malarza, hydraulika i elektryka w Gdańsku, przykładowe koszty łazienki, kuchni i pokoju. Wycena ze zdjęcia.',
}

export default function WycenaGdansk() {
  return (
    <SeoLanding
      path="/wycena-remontu-gdansk"
      badge="Gdańsk · Trójmiasto · Ceny 2026"
      h1="Wycena remontu w Gdańsku —"
      h1Accent="ceny w Trójmieście 2026"
      intro="Trójmiasto to jeden z droższych rynków remontowych w Polsce — stawki są zbliżone do Wrocławia i Krakowa. Zebraliśmy aktualne widełki robocizny i przykładowe koszty, żebyś mógł porównać je z ofertami, które dostajesz."
      ctaNav="Wyceń remont w Gdańsku →"
      stawkiTitle="Stawki robocizny w Gdańsku 2026"
      stawkiNote="Ceny brutto za robociznę (hydraulik i elektryk — z drobnym materiałem), stan na listopad 2026. W Gdyni i Sopocie stawki są podobne."
      stawki={[
        { name: 'Glazurnik — płytki standardowe', min: 115, max: 175, jednostka: 'zł/m²' },
        { name: 'Glazurnik — gres, duży format', min: 165, max: 260, jednostka: 'zł/m²' },
        { name: 'Malarz — 2 warstwy', min: 23, max: 36, jednostka: 'zł/m²' },
        { name: 'Gładź gipsowa', min: 52, max: 64, jednostka: 'zł/m²' },
        { name: 'Panele — montaż', min: 42, max: 68, jednostka: 'zł/m²' },
        { name: 'Hydraulik — punkt wod-kan', min: 500, max: 900, jednostka: 'zł/pkt' },
        { name: 'Elektryk — nowy punkt', min: 190, max: 300, jednostka: 'zł/pkt' },
      ]}
      przykladyTitle="Przykładowe koszty remontu w Trójmieście"
      przyklady={[
        { room: 'Łazienka 5 m²', range: '18 000 – 31 000 zł', note: 'pełny remont z materiałami, średni standard' },
        { room: 'Kuchnia 10 m²', range: '25 000 – 50 000 zł', note: 'z meblami na wymiar, bez AGD' },
        { room: 'Pokój 16 m²', range: '7 000 – 15 000 zł', note: 'gładzie, malowanie, panele' },
      ]}
      lokalneTitle="Na co uważać przy remoncie w Trójmieście"
      lokalne={[
        'W starych kamienicach (Wrzeszcz, Oliwa, Śródmieście Gdańska, centrum Sopotu) częste są krzywe ściany, drewniane stropy i stara instalacja — to podnosi koszt przygotowania podłoża.',
        'Przy morzu wilgoć jest większa: w łazience nie oszczędzaj na hydroizolacji, a w piwnicach i na parterze sprawdź ściany pod kątem zawilgocenia przed malowaniem.',
        'Sezon letni to dużo zleceń przy mieszkaniach na wynajem — terminy dobrych ekip się wydłużają, a ceny rosną. Remont planuj poza szczytem, jeśli możesz.',
        'Wywóz gruzu i wniesienie materiałów na wyższe piętra bez windy to osobne pozycje — dopytaj, czy są w ofercie.',
      ]}
      faq={[
        { q: 'Ile kosztuje remont łazienki w Gdańsku?', a: 'Pełny remont łazienki 4–6 m² w średnim standardzie to w Trójmieście zwykle 18 000–33 000 zł razem z materiałami. W kamienicy z wymianą pionów kwota rośnie.' },
        { q: 'Ile bierze glazurnik w Gdańsku za m²?', a: 'Za standardowe płytki najczęściej 115–175 zł/m² brutto. Gres i duże formaty to zwykle 165–260 zł/m².' },
        { q: 'Czy w Gdyni i Sopocie ceny są inne niż w Gdańsku?', a: 'Stawki ekip w całym Trójmieście są zbliżone, bo te same firmy pracują w trzech miastach. Różnice wynikają bardziej ze stanu budynku i zakresu prac niż z miasta.' },
        { q: 'Czy wycena ze zdjęcia jest dokładna?', a: 'To wycena orientacyjna — taka, jaką doświadczony wykonawca poda po obejrzeniu zdjęcia. Dlatego dostajesz widełki min–max. Dokładny kosztorys zrobi ekipa po wizycie na miejscu.' },
      ]}
      ctaTitle="Wycena Twojego remontu w Trójmieście"
      ctaText="Wrzuć zdjęcie pomieszczenia i wpisz miasto — Gdańsk, Gdynię lub Sopot. Dostaniesz widełki z podziałem na robociznę, materiały i koszty, których nie widać na zdjęciu."
      ctaButton="Wyceń mój remont →"
    />
  )
}
