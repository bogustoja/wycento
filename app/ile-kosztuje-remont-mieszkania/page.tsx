import type { Metadata } from 'next'
import SeoLanding from '../components/SeoLanding'

export const metadata: Metadata = {
  title: 'Ile kosztuje remont mieszkania? Ceny za m² 2026 | WyceńTo',
  description: 'Koszt remontu mieszkania w 2026: odświeżenie, remont średni i generalny — ceny za m², przykład dla 50 m², z czego składa się kwota i ile zostawić rezerwy.',
}

export default function RemontMieszkania() {
  return (
    <SeoLanding
      path="/ile-kosztuje-remont-mieszkania"
      badge="🏠 Ceny 2026"
      h1="Ile kosztuje remont mieszkania?"
      h1Accent="Ceny za m² na 2026 rok"
      intro="Koszt remontu mieszkania zależy przede wszystkim od zakresu: czy tylko odświeżasz ściany i podłogi, czy ruszasz instalacje, łazienkę i kuchnię. Poniżej realne widełki dla każdego wariantu i przykład dla mieszkania 50 m²."
      ctaNav="Wyceń swoje mieszkanie →"
      stawkiTitle="Koszt remontu mieszkania za m² (z materiałami)"
      stawkiNote="Widełki na m² powierzchni podłogi, średni standard materiałów, bez mebli i AGD. W Warszawie i Krakowie licz się z górną granicą, w mniejszych miastach z dolną."
      stawki={[
        { name: 'Odświeżenie: malowanie, drobne naprawy, nowe podłogi', min: 500, max: 900, jednostka: 'zł/m²' },
        { name: 'Remont średni: + gładzie, drzwi, częściowa elektryka', min: 1200, max: 2000, jednostka: 'zł/m²' },
        { name: 'Remont generalny: + instalacje, łazienka, kuchnia', min: 2000, max: 3500, jednostka: 'zł/m²' },
      ]}
      przykladyTitle="Przykład: mieszkanie 50 m²"
      przyklady={[
        { room: 'Odświeżenie', range: '25 000 – 45 000 zł', note: 'malowanie, podłogi, drobne poprawki, bez ruszania instalacji' },
        { room: 'Remont średni', range: '60 000 – 100 000 zł', note: 'gładzie, podłogi, drzwi, część elektryki, bez łazienki' },
        { room: 'Remont generalny', range: '100 000 – 175 000 zł', note: 'z instalacjami, łazienką i kuchnią (bez mebli i AGD)' },
      ]}
      lokalneTitle="Z czego składa się koszt generalnego remontu 50 m²"
      lokalne={[
        'Rozbiórki i wywóz gruzu: ok. 5–10 tys. zł.',
        'Instalacje elektryczne i wod-kan: ok. 12–20 tys. zł — w starym budownictwie prawie zawsze do wymiany.',
        'Łazienka: ok. 20–35 tys. zł. Kuchnia bez mebli i AGD: ok. 12–22 tys. zł.',
        'Tynki, gładzie, sufity: ok. 10–16 tys. zł. Podłogi: ok. 10–18 tys. zł. Malowanie i wykończenie: ok. 8–14 tys. zł, drzwi osobno.',
        'Rezerwa 15–20% na niespodzianki po skuciu (wilgoć, krzywe ściany, stara instalacja) — przy starych blokach i kamienicach to nie jest opcja, tylko konieczność.',
      ]}
      faq={[
        { q: 'Ile kosztuje remont mieszkania 50 m² w 2026?', a: 'Samo odświeżenie (malowanie, podłogi, drobne naprawy) to ok. 25–45 tys. zł. Remont generalny z instalacjami, łazienką i kuchnią to zwykle 100–175 tys. zł bez mebli i AGD, w Warszawie i Krakowie bliżej górnej granicy.' },
        { q: 'Ile kosztuje remont mieszkania za m²?', a: 'Od ok. 500–900 zł/m² za odświeżenie do ok. 2 000–3 500 zł/m² za remont generalny z materiałami. Największą różnicę robi to, czy wymieniasz instalacje i robisz łazienkę.' },
        { q: 'Od czego zacząć remont mieszkania?', a: 'Od instalacji i prac „brudnych”: rozbiórki, elektryka, hydraulika, tynki i wylewki. Dopiero potem gładzie, płytki, malowanie, podłogi i drzwi. Odwrotna kolejność kończy się kuciem w nowych ścianach.' },
        { q: 'Ile zostawić rezerwy na remont?', a: 'Przy generalnym remoncie 15–20% kwoty. Po skuciu płytek i zerwaniu podłóg prawie zawsze wychodzi coś, czego nie było widać — wilgoć, krzywe ściany, skorodowane rury.' },
        { q: 'Czy wycena ze zdjęcia jest dokładna?', a: 'To wycena orientacyjna, taka jaką doświadczony wykonawca poda po obejrzeniu zdjęcia — dlatego podajemy widełki min–max. Dokładny kosztorys zrobi ekipa po wizycie na miejscu.' },
      ]}
      ctaTitle="Wycena Twojego mieszkania ze zdjęć"
      ctaText="Wrzuć zdjęcie pomieszczenia, wybierz „Całe mieszkanie” lub konkretny pokój i wpisz miasto. Dostaniesz widełki z podziałem na robociznę, materiały i ukryte koszty."
      ctaButton="Wyceń mój remont →"
    />
  )
}
