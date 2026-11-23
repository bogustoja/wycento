import type { Metadata } from 'next'
import SeoLanding from '../components/SeoLanding'

export const metadata: Metadata = {
  title: 'Wycena remontu Łódź — ceny 2026 | WyceńTo',
  description: 'Ile kosztuje remont w Łodzi w 2026? Stawki glazurnika, malarza, hydraulika i elektryka, koszty łazienki, kuchni i pokoju w bloku i kamienicy. Darmowy kalkulator i wycena ze zdjęcia.',
}

export default function WycenaLodz() {
  return (
    <SeoLanding
      calculator={{ room: 'lazienka', city: 'wojewodzkie', title: 'Kalkulator remontu — stawki dla Łodzi' }}
      path="/wycena-remontu-lodz"
      badge="Łódź · Ceny 2026"
      h1="Wycena remontu w Łodzi —"
      h1Accent="ile to kosztuje w 2026?"
      intro="Łódź jest wyraźnie tańsza od Warszawy, choć leży godzinę drogi od niej. Robocizna kosztuje tu zwykle o 25–35% mniej. Dużo mieszkań to jednak stare kamienice, w których remont potrafi zaskoczyć. Poniżej aktualne widełki i przykładowe koszty."
      ctaNav="Wyceń remont w Łodzi →"
      stawkiTitle="Stawki robocizny w Łodzi 2026"
      stawkiNote="Ceny brutto za robociznę (hydraulik i elektryk z drobnym materiałem), stan na listopad 2026. W kamienicach licz się z górną granicą widełek."
      stawki={[
        { name: 'Glazurnik — płytki standardowe', min: 95, max: 145, jednostka: 'zł/m²' },
        { name: 'Glazurnik — gres, duży format', min: 140, max: 220, jednostka: 'zł/m²' },
        { name: 'Malarz — 2 warstwy', min: 18, max: 30, jednostka: 'zł/m²' },
        { name: 'Gładź gipsowa', min: 38, max: 52, jednostka: 'zł/m²' },
        { name: 'Panele — montaż', min: 35, max: 55, jednostka: 'zł/m²' },
        { name: 'Hydraulik — punkt wod-kan', min: 350, max: 700, jednostka: 'zł/pkt' },
        { name: 'Elektryk — nowy punkt', min: 150, max: 240, jednostka: 'zł/pkt' },
      ]}
      przykladyTitle="Przykładowe koszty remontu w Łodzi"
      przyklady={[
        { room: 'Łazienka 5 m²', range: '15 000 – 27 000 zł', note: 'pełny remont z materiałami, średni standard' },
        { room: 'Kuchnia 10 m²', range: '20 000 – 42 000 zł', note: 'z meblami na wymiar, bez AGD' },
        { room: 'Pokój 16 m²', range: '6 000 – 12 000 zł', note: 'gładzie, malowanie, panele' },
      ]}
      lokalneTitle="Na co uważać przy remoncie w Łodzi"
      lokalne={[
        'Kamienice w Śródmieściu i okolicach Piotrkowskiej często mają drewniane stropy. Przed położeniem płytek w łazience trzeba je usztywnić i dobrze zaizolować, co kosztuje dodatkowo 1–3 tys. zł.',
        'W starych kamienicach łazienka bywa dobudowana później albo w ogóle jej nie ma. Wtedy dochodzą nowe podejścia wod-kan i często zgoda zarządcy budynku.',
        'Wysokie stropy (powyżej 3 m) zwiększają powierzchnię ścian do gładzi i malowania nawet o 30%.',
        'Bloki na Widzewie, Retkini i Teofilowie to zwykle wielka płyta: piony i wentylacja wyznaczają, gdzie może stać wanna czy prysznic.',
      ]}
      faq={[
        { q: 'Ile kosztuje remont łazienki w Łodzi?', a: 'Pełny remont łazienki 4–6 m² w średnim standardzie to w Łodzi zwykle 14 000–28 000 zł z materiałami. W kamienicy z drewnianym stropem lub nowymi podejściami wod-kan koszt rośnie.' },
        { q: 'Ile bierze glazurnik w Łodzi za m²?', a: 'Za standardowe płytki najczęściej 95–145 zł/m² brutto. Gres wielkoformatowy to zwykle 140–220 zł/m².' },
        { q: 'Czy remont w Łodzi jest tańszy niż w Warszawie?', a: 'Tak, robocizna jest zwykle o 25–35% tańsza. Materiały kosztują podobnie w całej Polsce, więc przy drogiej armaturze różnica w całej kwocie jest mniejsza.' },
        { q: 'Czy wycena ze zdjęcia jest dokładna?', a: 'To wycena orientacyjna, jaką doświadczony wykonawca poda po obejrzeniu zdjęcia, dlatego dostajesz widełki min–max. Dokładny kosztorys zrobi ekipa po wizycie na miejscu.' },
      ]}
      ctaTitle="Wycena Twojego remontu w Łodzi"
      ctaText="Wrzuć zdjęcie pomieszczenia i wpisz „Łódź”. Dostaniesz widełki z podziałem na robociznę, materiały i koszty, których nie widać na zdjęciu."
      ctaButton="Wyceń mój remont →"
    />
  )
}
