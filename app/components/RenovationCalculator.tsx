'use client'

import { useMemo, useState } from 'react'
import {
  calculate,
  CITY_TIERS,
  ROOMS,
  STANDARDS,
  type CityTier,
  type Room,
  type Standard,
  type Zakres,
} from '../lib/calc'

const zl = (n: number) => `${Math.round(n).toLocaleString('pl-PL')} zł`
const range = (a: number, b: number) => `${zl(a)} – ${zl(b)}`

type Props = {
  initialRoom?: Room
  initialCity?: CityTier
  // Nagłówek sekcji — na stronach SEO można dopasować do frazy.
  title?: string
}

export default function RenovationCalculator({ initialRoom = 'lazienka', initialCity = 'wojewodzkie', title = 'Kalkulator kosztów remontu' }: Props) {
  const [room, setRoom] = useState<Room>(initialRoom)
  const [area, setArea] = useState<string>(String(ROOMS.find((r) => r.value === initialRoom)?.defaultArea ?? 5))
  const [standard, setStandard] = useState<Standard>('sredni')
  const [city, setCity] = useState<CityTier>(initialCity)
  const [zakres, setZakres] = useState<Zakres>('pelny')
  const [meble, setMeble] = useState(true)
  const [agd, setAgd] = useState(false)

  const roomDef = ROOMS.find((r) => r.value === room) ?? ROOMS[0]
  const areaNum = Number(area.replace(',', '.'))
  const areaOk = Number.isFinite(areaNum) && areaNum >= roomDef.minArea && areaNum <= roomDef.maxArea

  const result = useMemo(
    () => (areaOk ? calculate({ room, area: areaNum, standard, city, zakres, meble, agd }) : null),
    [room, areaNum, areaOk, standard, city, zakres, meble, agd],
  )

  function changeRoom(next: Room) {
    setRoom(next)
    setArea(String(ROOMS.find((r) => r.value === next)?.defaultArea ?? 10))
  }

  const pill = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
      active ? 'border-accent-2 bg-accent text-white' : 'border-line-strong bg-surface-2 text-ink-2 hover:border-accent-2'
    }`

  return (
    <section id="kalkulator" aria-labelledby="kalkulator-title" className="mb-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="mb-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-2">Za darmo · bez logowania</div>
        <h2 id="kalkulator-title" className="font-serif text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-muted">Stawki 2026 dla Twojej okolicy. Wynik zmienia się od razu.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FORMULARZ */}
        <div className="space-y-5">
          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Co remontujesz</legend>
            <div className="flex flex-wrap gap-2">
              {ROOMS.map((r) => (
                <button key={r.value} type="button" aria-pressed={room === r.value} onClick={() => changeRoom(r.value)} className={pill(room === r.value)}>
                  {r.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="calc-area" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">
              Powierzchnia podłogi (m²)
            </label>
            <input
              id="calc-area"
              type="number"
              inputMode="decimal"
              min={roomDef.minArea}
              max={roomDef.maxArea}
              step="0.5"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              aria-invalid={!areaOk}
              aria-describedby="calc-area-hint"
              className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-base text-ink outline-none focus:border-accent-2"
            />
            <p id="calc-area-hint" className={`mt-1 text-xs ${areaOk ? 'text-muted' : 'text-red-400'}`}>
              {areaOk ? `Od ${roomDef.minArea} do ${roomDef.maxArea} m²` : `Podaj wartość od ${roomDef.minArea} do ${roomDef.maxArea} m²`}
            </p>
          </div>

          <div>
            <label htmlFor="calc-city" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted">Lokalizacja</label>
            <select
              id="calc-city"
              value={city}
              onChange={(e) => setCity(e.target.value as CityTier)}
              className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-base text-ink outline-none focus:border-accent-2"
            >
              {CITY_TIERS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Standard wykończenia</legend>
            <div className="flex flex-wrap gap-2">
              {STANDARDS.map((s) => (
                <button key={s.value} type="button" aria-pressed={standard === s.value} onClick={() => setStandard(s.value)} className={pill(standard === s.value)}>
                  {s.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Zakres prac</legend>
            <div className="flex flex-wrap gap-2">
              <button type="button" aria-pressed={zakres === 'pelny'} onClick={() => setZakres('pelny')} className={pill(zakres === 'pelny')}>
                Generalny remont
              </button>
              <button type="button" aria-pressed={zakres === 'odswiezenie'} onClick={() => setZakres('odswiezenie')} className={pill(zakres === 'odswiezenie')}>
                {room === 'lazienka' ? 'Odświeżenie bez kucia' : 'Tylko malowanie / odświeżenie'}
              </button>
            </div>
          </fieldset>

          {room === 'kuchnia' && (
            <fieldset className="space-y-2">
              <legend className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Kuchnia</legend>
              <label className="flex items-center gap-3 text-sm text-ink-2">
                <input type="checkbox" checked={meble} onChange={(e) => setMeble(e.target.checked)} className="h-5 w-5 accent-[#b8501f]" />
                Nowe meble kuchenne z blatem
              </label>
              <label className="flex items-center gap-3 text-sm text-ink-2">
                <input type="checkbox" checked={agd} onChange={(e) => setAgd(e.target.checked)} className="h-5 w-5 accent-[#b8501f]" />
                Nowe AGD do zabudowy
              </label>
            </fieldset>
          )}
        </div>

        {/* WYNIK */}
        <div aria-live="polite">
          {result ? (
            <div className="rounded-2xl border border-accent bg-surface-2 p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted">Szacunkowy koszt z materiałami</div>
              <div className="mt-1 font-serif text-3xl font-extrabold text-ink sm:text-4xl">{range(result.total.min, result.total.max)}</div>
              <div className="mt-2 text-sm text-ink-2">
                Robocizna: <strong className="text-ink">{range(result.robocizna.min, result.robocizna.max)}</strong>
                <br />
                Materiały: <strong className="text-ink">{range(result.materialy.min, result.materialy.max)}</strong>
                <br />
                Czas realizacji: <strong className="text-ink">{result.czas}</strong>
              </div>

              <details className="mt-4 group">
                <summary className="cursor-pointer text-sm font-semibold text-accent-2">Pokaż pozycje kosztorysu ({result.lines.length})</summary>
                <ul className="mt-3 divide-y divide-line text-sm">
                  {result.lines.map((l, i) => (
                    <li key={i} className="flex justify-between gap-4 py-2">
                      <span className="text-ink-2">
                        {l.name}
                        <span className="ml-2 text-xs text-muted">{l.kind === 'robocizna' ? 'robocizna' : 'materiały'}</span>
                      </span>
                      <span className="whitespace-nowrap font-semibold text-ink">{range(l.min, l.max)}</span>
                    </li>
                  ))}
                </ul>
              </details>

              <div className="mt-6 rounded-xl border border-line bg-surface p-4">
                <div className="font-semibold text-ink">Chcesz wycenę Twojego pomieszczenia, a nie średnią?</div>
                <p className="mt-1 text-sm text-muted">
                  Zrób zdjęcie — AI zobaczy stan ścian, instalacji i podłogi, rozpisze, co trzeba zrobić, i doliczy ukryte koszty. 3 wyceny za darmo.
                </p>
                <a
                  href="/login?utm_source=kalkulator&utm_medium=cta"
                  className="mt-3 inline-block rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover hover:text-white"
                >
                  Wyceń ze zdjęcia za darmo →
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-surface-2 p-6 text-sm text-muted">Podaj powierzchnię, żeby zobaczyć wynik.</div>
          )}
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Wynik jest orientacyjny: przyjmujemy typowe pomieszczenie o wysokości 2,6 m i stawki z 2026 roku. Stan instalacji, wilgoć czy krzywe ściany widać dopiero na zdjęciu lub na miejscu.
          </p>
        </div>
      </div>
    </section>
  )
}
