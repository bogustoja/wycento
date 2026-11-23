// Darmowy kalkulator remontu (bez logowania, bez AI).
// Stawki = STAWKI BAZOWE 2026 z promptu wyceny (app/lib/wycenaCore.js), żeby kalkulator
// i wycena ze zdjęcia nie dawały sprzecznych liczb. Mnożnik lokalizacji tylko na robociznę.
// Kontrola sum (średni standard): łazienka 4–6 m² ≈ 16–36 tys., kuchnia 10 m² z meblami i AGD ≈ 25–55 tys.,
// bez mebli ≈ 8–18 tys., pokój 15–20 m² ≈ 6–15 tys.

export type Room = 'lazienka' | 'kuchnia' | 'pokoj' | 'mieszkanie'
export type Standard = 'ekonomiczny' | 'sredni' | 'premium'
export type CityTier = 'warszawa' | 'duze' | 'wojewodzkie' | 'male'
export type Zakres = 'pelny' | 'odswiezenie'

export type CalcInput = {
  room: Room
  area: number // m² podłogi
  standard: Standard
  city: CityTier
  zakres: Zakres
  meble: boolean // kuchnia: nowe meble na wymiar / z marketu
  agd: boolean // kuchnia: nowe AGD do zabudowy
}

export type Range = { min: number; max: number }
export type Line = { name: string; kind: 'robocizna' | 'materialy'; min: number; max: number }
export type CalcResult = {
  lines: Line[]
  robocizna: Range
  materialy: Range
  total: Range
  czas: string
}

export const CITY_TIERS: { value: CityTier; label: string; mult: [number, number] }[] = [
  { value: 'warszawa', label: 'Warszawa', mult: [1.25, 1.4] },
  { value: 'duze', label: 'Kraków, Wrocław, Trójmiasto, Poznań', mult: [1.15, 1.25] },
  { value: 'wojewodzkie', label: 'Inne miasto wojewódzkie (np. Łódź, Lublin, Białystok)', mult: [1.0, 1.1] },
  { value: 'male', label: 'Mniejsze miasto lub wieś', mult: [0.85, 0.95] },
]

export const ROOMS: { value: Room; label: string; defaultArea: number; minArea: number; maxArea: number }[] = [
  { value: 'lazienka', label: 'Łazienka', defaultArea: 5, minArea: 2, maxArea: 20 },
  { value: 'kuchnia', label: 'Kuchnia', defaultArea: 10, minArea: 4, maxArea: 30 },
  { value: 'pokoj', label: 'Pokój', defaultArea: 17, minArea: 6, maxArea: 50 },
  { value: 'mieszkanie', label: 'Całe mieszkanie', defaultArea: 50, minArea: 20, maxArea: 200 },
]

export const STANDARDS: { value: Standard; label: string }[] = [
  { value: 'ekonomiczny', label: 'Ekonomiczny' },
  { value: 'sredni', label: 'Średni' },
  { value: 'premium', label: 'Premium' },
]

const H = 2.6 // wysokość pomieszczenia
const r = (min: number, max: number): Range => ({ min, max })
const mul = (a: Range, k: number): Range => r(a.min * k, a.max * k)

// Materiały zależne od standardu (zł, ceny jednolite w całej Polsce).
const MAT = {
  plytki: { ekonomiczny: r(50, 80), sredni: r(80, 150), premium: r(150, 300) }, // zł/m² płytek
  zestawLazienka: { ekonomiczny: r(3000, 5000), sredni: r(5000, 9000), premium: r(9000, 18000) }, // WC+stelaż, umywalka z szafką, kabina/odpływ, baterie
  panele: { ekonomiczny: r(35, 60), sredni: r(60, 100), premium: r(100, 180) }, // zł/m² podłogi
  meble10m: { ekonomiczny: r(8000, 14000), sredni: r(14000, 25000), premium: r(25000, 50000) }, // zabudowa dla kuchni ~10 m²
  agd: { ekonomiczny: r(4000, 7000), sredni: r(6000, 12000), premium: r(12000, 25000) },
}

function perimeter(area: number) {
  // Przyjmujemy pomieszczenie zbliżone do prostokąta 1:1,3.
  const a = Math.sqrt(area / 1.3)
  return 2 * (a + a * 1.3)
}

type Parts = { lab: Line[]; mat: Line[] }
const L = (name: string, x: Range): Line => ({ name, kind: 'robocizna', min: x.min, max: x.max })
const M = (name: string, x: Range): Line => ({ name, kind: 'materialy', min: x.min, max: x.max })

function lazienka(area: number, s: Standard, zakres: Zakres): Parts {
  const walls = Math.max(perimeter(area) * 2.5 - 2, area * 2.5) // płytki do ok. 2,5 m minus drzwi
  const tiled = area + walls
  const wielkiFormat = s === 'premium'
  if (zakres === 'odswiezenie') {
    // Bez kucia: nowa armatura, malowanie sufitu, fugi/silikony, drobne poprawki.
    return {
      lab: [
        L('Wymiana białego montażu i baterii', r(900, 2400)),
        L('Odświeżenie fug i silikonów', mul(r(25, 45), tiled)),
        L('Malowanie sufitu farbą łazienkową', mul(r(20, 35), area)),
        L('Elektryka: oświetlenie i wentylator', r(300, 500)),
      ],
      mat: [
        M('Armatura i ceramika', mul(MAT.zestawLazienka[s], 0.7)),
        M('Fugi, silikony, farba, drobne materiały', r(400, 900)),
      ],
    }
  }
  return {
    lab: [
      L('Skucie płytek i wywóz gruzu', { min: tiled * 50 + 500, max: tiled * 90 + 1000 }),
      L('Hydroizolacja i przygotowanie podłoża', mul(r(40, 80), area + 4)),
      L(wielkiFormat ? 'Glazura i terakota (wielki format)' : 'Glazura i terakota', mul(wielkiFormat ? r(220, 380) : r(120, 200), tiled)),
      L('Hydraulika (ok. 5 punktów)', mul(r(300, 700), 5)),
      L('Biały montaż i stelaż WC', { min: 3 * 300 + 800, max: 3 * 800 + 1500 }),
      L('Elektryka (ok. 4 punkty)', mul(r(150, 250), 4)),
      L('Sufit: malowanie farbą łazienkową', mul(r(20, 35), area)),
    ],
    mat: [
      M('Płytki', mul(MAT.plytki[s], tiled * 1.1)),
      M('Ceramika, kabina, armatura', MAT.zestawLazienka[s]),
      M('Chemia budowlana (kleje, fugi, hydroizolacja)', mul(r(25, 40), tiled)),
    ],
  }
}

function kuchnia(area: number, s: Standard, zakres: Zakres, meble: boolean, agd: boolean): Parts {
  const walls = Math.max(perimeter(area) * H - 4, 0)
  const lab: Line[] = []
  const mat: Line[] = []
  if (zakres === 'pelny') {
    lab.push(
      L('Demontaż starej zabudowy i wywóz', r(800, 2000)),
      L('Hydraulika (zlew, zmywarka)', mul(r(300, 700), 2)),
      L('Elektryka (ok. 6 punktów)', mul(r(150, 250), 6)),
      L('Płytki na podłodze', mul(r(120, 200), area)),
      L('Gładź na ścianach', mul(r(40, 56), walls)),
    )
    mat.push(M('Płytki (podłoga i nad blatem)', mul(MAT.plytki[s], (area + 4) * 1.1)))
  }
  lab.push(
    L('Płytki lub panel nad blatem', mul(r(120, 200), 4)),
    L('Malowanie ścian i sufitu', mul(r(20, 35), walls + area)),
  )
  if (meble) lab.push(L('Montaż mebli kuchennych', mul(r(1500, 3500), Math.max(area / 10, 0.6))))
  lab.push(L('Podłączenie zlewu i AGD', r(500, 1200)))
  mat.push(M('Farby, gładź, chemia', mul(r(12, 20), walls + area)))
  if (zakres === 'odswiezenie') mat.push(M('Płytki nad blatem', mul(MAT.plytki[s], 4.4)))
  if (meble) mat.push(M('Meble kuchenne z blatem', mul(MAT.meble10m[s], Math.max(area / 10, 0.6))))
  if (agd) mat.push(M('AGD do zabudowy', MAT.agd[s]))
  return { lab, mat }
}

function pokoj(area: number, s: Standard, zakres: Zakres, nazwa = ''): Parts {
  const walls = Math.max(perimeter(area) * H - 3, 0) // okno i drzwi
  const paint = walls + area
  const sfx = nazwa ? ` — ${nazwa}` : ''
  const lab: Line[] = [L(`Malowanie ścian i sufitu, 2 warstwy${sfx}`, mul(r(20, 35), paint))]
  const mat: Line[] = []
  if (zakres === 'pelny') {
    lab.push(
      L(`Gładź na ścianach i suficie${sfx}`, mul(r(40, 56), paint)),
      L(`Zerwanie starej podłogi${sfx}`, mul(r(15, 30), area)),
      L(`Montaż paneli z listwami${sfx}`, mul(r(45, 85), area)),
      L(`Elektryka: przeróbki gniazdek${sfx}`, mul(r(100, 150), Math.max(2, Math.round(area / 8)))),
    )
    mat.push(
      M(`Panele, podkład, listwy${sfx}`, { min: area * (MAT.panele[s].min + 15), max: area * (MAT.panele[s].max + 25) }),
      M(`Farby, gładź, grunt${sfx}`, mul(r(10, 15), paint)),
    )
  } else {
    mat.push(M(`Farby i grunt${sfx}`, mul(r(5, 9), paint)))
  }
  return { lab, mat }
}

function mieszkanie(area: number, s: Standard, zakres: Zakres): Parts {
  const lazArea = area < 45 ? 4 : area < 80 ? 5.5 : 7
  const kuchArea = area < 45 ? 7 : area < 80 ? 9 : 12
  const reszta = Math.max(area - lazArea - kuchArea, 10)
  const parts: Parts[] = []
  if (zakres === 'pelny') {
    const l = lazienka(lazArea, s, 'pelny')
    const k = kuchnia(kuchArea, s, 'pelny', true, false)
    parts.push(
      { lab: l.lab.map((x) => ({ ...x, name: `Łazienka: ${x.name.toLowerCase()}` })), mat: l.mat.map((x) => ({ ...x, name: `Łazienka: ${x.name.toLowerCase()}` })) },
      { lab: k.lab.map((x) => ({ ...x, name: `Kuchnia: ${x.name.toLowerCase()}` })), mat: k.mat.map((x) => ({ ...x, name: `Kuchnia: ${x.name.toLowerCase()}` })) },
    )
  }
  // Pokoje i przedpokój liczone jako jedna powierzchnia; ściany jak dla kilku pomieszczeń (×1,5).
  const p = pokoj(reszta, s, zakres, 'pokoje i przedpokój')
  const wallsFactor = 1.5
  parts.push({
    lab: p.lab.map((x) => (x.name.startsWith('Malowanie') || x.name.startsWith('Gładź') ? { ...x, min: x.min * wallsFactor, max: x.max * wallsFactor } : x)),
    mat: p.mat.map((x) => (x.name.startsWith('Farby') ? { ...x, min: x.min * wallsFactor, max: x.max * wallsFactor } : x)),
  })
  return { lab: parts.flatMap((x) => x.lab), mat: parts.flatMap((x) => x.mat) }
}

function czasRealizacji(room: Room, zakres: Zakres, area: number): string {
  if (zakres === 'odswiezenie') return room === 'mieszkanie' ? '1–3 tygodnie' : '2–5 dni'
  if (room === 'lazienka') return area > 7 ? '3–5 tygodni' : '2–4 tygodnie'
  if (room === 'kuchnia') return '2–4 tygodnie (plus czas na meble na wymiar)'
  if (room === 'pokoj') return '1–2 tygodnie'
  return area > 70 ? '2–4 miesiące' : '6–10 tygodni'
}

const round100 = (n: number) => Math.round(n / 100) * 100

export function calculate(input: CalcInput): CalcResult {
  const roomDef = ROOMS.find((x) => x.value === input.room) ?? ROOMS[0]
  const area = Math.min(Math.max(Number(input.area) || roomDef.defaultArea, roomDef.minArea), roomDef.maxArea)
  const tier = CITY_TIERS.find((c) => c.value === input.city) ?? CITY_TIERS[2]
  const [kMin, kMax] = tier.mult

  const parts =
    input.room === 'lazienka'
      ? lazienka(area, input.standard, input.zakres)
      : input.room === 'kuchnia'
        ? kuchnia(area, input.standard, input.zakres, input.meble, input.agd)
        : input.room === 'pokoj'
          ? pokoj(area, input.standard, input.zakres)
          : mieszkanie(area, input.standard, input.zakres)

  // Premium = droższa ekipa i staranniejsze wykończenie: +15% robocizny; ekonomiczny −5%.
  const stdK = input.standard === 'premium' ? 1.15 : input.standard === 'ekonomiczny' ? 0.95 : 1

  const lines: Line[] = [
    ...parts.lab.map((l) => ({ ...l, min: round100(l.min * kMin * stdK), max: round100(l.max * kMax * stdK) })),
    ...parts.mat.map((l) => ({ ...l, min: round100(l.min), max: round100(l.max) })),
  ].filter((l) => l.max > 0)

  const sum = (kind: Line['kind']) =>
    lines.filter((l) => l.kind === kind).reduce((a, l) => r(a.min + l.min, a.max + l.max), r(0, 0))
  const robocizna = sum('robocizna')
  const materialy = sum('materialy')
  // Minimum za samo przyjście ekipy: 300–600 zł.
  const total = r(Math.max(robocizna.min + materialy.min, 300), Math.max(robocizna.max + materialy.max, 600))

  return { lines, robocizna, materialy, total, czas: czasRealizacji(input.room, input.zakres, area) }
}
