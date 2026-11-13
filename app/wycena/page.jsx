'use client'

import Brand from '../components/Brand'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { wyceńRemont } from '../actions/wycena'
import { createClient } from '../lib/supabase'

// Wycena trwa zwykle 23–30 s (pomiar 7.11.2026) (Claude analizuje zdjęcie i składa kosztorys).
// Pasek rośnie asymptotycznie do 95% i dobija do 100% dopiero po odpowiedzi.
function PasekPostepu({ miasto }) {
  const [sek, setSek] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const t = setInterval(() => setSek((Date.now() - start) / 1000), 250)
    return () => clearInterval(t)
  }, [])

  const procent = Math.min(95, 95 * (1 - Math.exp(-sek / 11)))
  const etap =
    sek < 3 ? 'Wysyłam zdjęcie…' :
    sek < 12 ? 'Analizuję zdjęcie pomieszczenia…' :
    sek < 20 ? `Liczę robociznę i materiały${miasto ? ` dla: ${miasto}` : ''}…` :
    sek < 60 ? 'Sprawdzam ukryte koszty i składam kosztorys…' :
    'Trwa dłużej niż zwykle — jeszcze chwila…'
  const zostalo = Math.max(0, Math.round(30 - sek))

  return (
    <div className="mt-4" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(procent)}>
      <div className="flex justify-between text-xs text-muted mb-2">
        <span>{etap}</span>
        <span className="tabular-nums">{Math.round(procent)}%</span>
      </div>
      <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${procent}%` }}
        />
      </div>
      <p className="text-xs text-center text-muted mt-2 tabular-nums">
        {zostalo > 0 ? `Zwykle 20–40 sekund · zostało ok. ${zostalo} s` : 'Zwykle 20–40 sekund · kończę…'}
      </p>
    </div>
  )
}

export default function WycenaPage() {
  const [miasto, setMiasto] = useState('')
  const [pomieszczenie, setPomieszczenie] = useState('Łazienka')
  const [opis, setOpis] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [wynik, setWynik] = useState(null)
  const [quoteId, setQuoteId] = useState(null)
  const [error, setError] = useState(null)
  // Plan usera: PDF jest tylko w Pro (tak mówi cennik). null = jeszcze nie wiemy.
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase.from('profiles').select('plan').eq('user_id', user.id).single()
      setPlan(data?.plan ?? 'free')
    })
  }, [])
  const router = useRouter()

  // Zdjęcia z telefonu mają 3–8 MB. Zmniejszamy do max 1600 px i JPEG ~80%,
  // bo limit Server Action to 1 MB, a Claude przyjmuje max 5 MB na obraz.
  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () => {
        const MAX = 1600
        const scale = Math.min(1, MAX / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        URL.revokeObjectURL(url)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('decode'))
      }
      img.src = url
    })
  }

  async function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setError(null)
    try {
      const dataUrl = await compressImage(file)
      setImage(dataUrl)
      setPreview(dataUrl)
    } catch {
      setImage(null)
      setPreview(null)
      setError('Nie udało się wczytać zdjęcia. Użyj JPG lub PNG (zdjęcia HEIC z iPhone’a najlepiej wrzucać przez Safari).')
    }
  }

  async function handleSubmit() {
    if (!miasto.trim() || !image) { setError('Dodaj zdjęcie i podaj miasto'); return }
    setLoading(true); setError(null)
    try {
      const formData = new FormData()
      formData.append('miasto', miasto.trim())
      formData.append('pomieszczenie', pomieszczenie)
      formData.append('opis', opis)
      formData.append('image', image)
      const result = await wyceńRemont(formData)
      if (!result || result.error) setError(result?.error || 'Błąd podczas wyceny. Spróbuj ponownie.')
      else { setWynik(result.wynik); setQuoteId(result.quoteId ?? null) }
    } catch (err) {
      console.error(err)
      setError('Brak połączenia z serwerem. Sprawdź internet i spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  // PAYWALL
  if (error === 'BRAK_KREDYTOW') {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
                    <h1 className="text-4xl font-extrabold text-ink mb-3">Limit wycen wyczerpany</h1>
          <p className="text-muted mb-8">Wykorzystałeś wszystkie 3 darmowe wyceny. Przejdź na plan Pro — nielimitowane wyceny i pobieranie PDF za 39 zł miesięcznie.</p>
          <div className="bg-surface border border-line rounded-3xl p-7 mb-6 text-left">
            <ul className="space-y-3">
              {['Nielimitowane wyceny', 'Pobieranie raportów PDF', 'Historia wszystkich wycen', 'Priorytetowa obsługa'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-2">
                  <span className="w-5 h-5 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-line flex items-end gap-1">
              <span className="text-5xl font-extrabold tracking-tight">39</span>
              <span className="text-muted pb-1">zł / miesiąc</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/pro')}
            className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-base hover:bg-accent-hover btn-glow mb-3"
          >
            Przejdź na Pro →
          </button>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-muted hover:text-ink transition">
            Wróć do panelu
          </button>
        </div>
      </main>
    )
  }

  // WYNIK
  if (wynik) {
    return (
      <main className="min-h-screen bg-bg">
        <nav className="bg-bg/80 backdrop-blur-md border-b border-line sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Brand />
            <button onClick={() => router.push('/dashboard')} className="text-sm text-muted hover:text-ink transition-colors border border-line-strong px-3.5 py-1.5 rounded-full hover:bg-surface-2">
              ← Panel
            </button>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-10">
          <button onClick={() => setWynik(null)} className="text-sm text-muted hover:text-ink transition-colors mb-6 block">
            ← Nowa wycena
          </button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-ink">Wycena gotowa</h1>
              <p className="text-sm text-muted mt-1">{pomieszczenie} · {miasto}</p>
            </div>
            <span className="shrink-0 whitespace-nowrap text-xs bg-green-500/10 text-green-400 border border-green-400/30 px-3 py-1.5 rounded-full font-semibold">Gotowa ✓</span>
          </div>

          <div className="bg-surface border border-line rounded-3xl p-6 mb-4">
            <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Analiza zdjęcia</div>
            <p className="text-ink-2 leading-relaxed text-sm">{wynik.summary}</p>
          </div>

          <div className="bg-surface border border-line rounded-3xl overflow-hidden mb-4">
            <div className="px-6 py-4 border-b border-line">
              <h2 className="text-lg font-bold text-ink">Kosztorys — {miasto}</h2>
            </div>
            <div className="divide-y divide-line">
              {wynik.items.map((item, i) => (
                <div key={i} className="px-6 py-4 flex justify-between items-center">
                  <span className="text-sm text-ink-2">{item.name}</span>
                  <span className="font-semibold text-ink text-sm tabular-nums whitespace-nowrap ml-4">
                    {item.min.toLocaleString('pl-PL')} – {item.max.toLocaleString('pl-PL')} {item.jednostka}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 bg-accent text-white flex justify-between items-center gap-3 flex-wrap">
              <span className="font-semibold">Łącznie</span>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums whitespace-nowrap">
                {wynik.total_min.toLocaleString('pl-PL')} – {wynik.total_max.toLocaleString('pl-PL')} zł
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-surface border border-line rounded-3xl p-6">
              <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Na co uważać</div>
              <ul className="space-y-3">
                {wynik.uwagi.map((u, i) => (
                  <li key={i} className="text-sm text-ink-2 flex gap-2 leading-relaxed">
                    <span className="text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true">⚠</span>{u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface border border-line rounded-3xl p-6">
              <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Warto dodać przy okazji</div>
              <ul className="space-y-3">
                {wynik.co_warto_dodac.map((c, i) => (
                  <li key={i} className="text-sm text-ink-2 flex gap-2 leading-relaxed">
                    <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-surface border border-line rounded-3xl p-6 flex flex-wrap gap-4 items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-1">Czas realizacji</div>
              <div className="text-2xl font-extrabold text-ink">{wynik.czas_realizacji}</div>
            </div>
            {plan === 'pro' ? (
              quoteId && (
                <a
                  href={`/api/pdf?id=${quoteId}`}
                  target="_blank"
                  rel="noopener"
                  className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-hover btn-glow flex items-center gap-2"
                >
                  Pobierz PDF <span aria-hidden="true">↓</span>
                </a>
              )
            ) : plan === 'free' ? (
              <a
                href="/pro"
                className="border border-line-strong text-ink px-5 py-3 rounded-xl font-semibold hover:bg-surface-2 transition text-sm text-center"
              >
                Raport PDF w planie Pro →
              </a>
            ) : null}
          </div>
        </div>
      </main>
    )
  }

  // FORMULARZ
  return (
    <main className="min-h-screen bg-bg">
      <nav className="bg-bg/80 backdrop-blur-md border-b border-line sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Brand />
          <button onClick={() => router.push('/dashboard')} className="text-sm text-muted hover:text-ink transition-colors border border-line-strong px-3.5 py-1.5 rounded-full hover:bg-surface-2">
            ← Panel
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-ink mb-2">Nowa wycena</h1>
          <p className="text-ink-2">Zrób zdjęcie pomieszczenia i podaj lokalizację</p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2 gap-8">

          {/* FORMULARZ */}
          <div className="min-w-0 bg-surface border border-line rounded-3xl p-5 sm:p-8">
            <h2 className="text-xl font-bold text-ink mb-6">Twoje pomieszczenie</h2>

            <div className="flex gap-3 mb-6">
              <label htmlFor="miasto" className="sr-only">Miasto lub kod pocztowy</label>
              <input
                id="miasto"
                name="miasto"
                autoComplete="address-level2"
                maxLength={80}
                type="text"
                placeholder="Miasto lub kod pocztowy"
                value={miasto}
                onChange={(e) => setMiasto(e.target.value)}
                className="min-w-0 flex-1 bg-bg border border-line-strong rounded-xl px-4 py-3 text-sm text-ink placeholder-muted outline-none focus:border-accent-2 focus:ring-2 focus:ring-accent-2/20 transition"
              />
              <label htmlFor="pomieszczenie" className="sr-only">Rodzaj pomieszczenia</label>
              <select
                id="pomieszczenie"
                value={pomieszczenie}
                onChange={(e) => setPomieszczenie(e.target.value)}
                className="bg-bg border border-line-strong rounded-xl px-4 py-3 text-sm text-ink outline-none focus:border-accent-2 transition"
              >
                <option>Łazienka</option>
                <option>Kuchnia</option>
                <option>Pokój</option>
                <option>Salon</option>
                <option>Przedpokój</option>
                <option>Sypialnia</option>
                <option>Taras</option>
                <option>Całe mieszkanie</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="opis" className="block text-sm font-medium text-ink-2 mb-2">
                Co chcesz zrobić? <span className="text-muted font-normal">(opcjonalnie)</span>
              </label>
              <textarea
                id="opis"
                maxLength={500}
                placeholder="np. położyć płytki na podłodze, wymienić wannę na prysznic, pomalować ściany i wymienić okno..."
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                rows={3}
                className="w-full bg-bg border border-line-strong rounded-xl px-4 py-3 text-sm text-ink placeholder-muted outline-none focus:border-accent-2 focus:ring-2 focus:ring-accent-2/20 transition resize-none"
              />
            </div>

            <label className={`block border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all mb-6 group ${preview ? 'border-line p-3' : 'border-line-strong p-10 hover:border-accent-2 hover:bg-surface-2 focus-within:border-accent-2 focus-within:bg-surface-2'} ${loading ? 'pointer-events-none' : ''}`}>
              {preview ? (
                <div>
                  {/* Podczas analizy: ten sam skan co na stronie głównej, na zdjęciu usera. */}
                  <div className="relative overflow-hidden rounded-2xl bg-bg">
                    <img src={preview} alt="Podgląd dodanego zdjęcia pomieszczenia" className={`mx-auto w-full object-cover transition-all duration-500 ${loading ? 'max-h-96 brightness-75' : 'max-h-64'}`} />
                    {loading && (
                      <>
                        <div aria-hidden="true" className="absolute inset-0 dot-grid" />
                        <div className="scan-glow" />
                        <div className="scan-line" />
                        <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full border border-line bg-bg/80 px-3 py-1.5 text-xs font-semibold text-ink">
                          <span className="pulse-dot h-2 w-2 rounded-full bg-accent-2" />
                          Analiza zdjęcia…
                        </div>
                      </>
                    )}
                  </div>
                  {!loading && <p className="text-xs text-muted mt-3">Kliknij, żeby zmienić zdjęcie</p>}
                </div>
              ) : (
                <>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent-2/40 bg-accent-2/10 text-accent-2 transition-transform group-hover:scale-110">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></svg>
                  </div>
                  <div className="text-base font-semibold text-ink mb-1">Dodaj zdjęcie pomieszczenia</div>
                  <div className="text-sm text-muted">Kliknij, żeby wybrać zdjęcie lub zrobić je telefonem · JPG lub PNG</div>
                </>
              )}
              {/* sr-only zamiast hidden: ukryte pole nie dostawało fokusu z klawiatury */}
              <input type="file" accept="image/*" onChange={handleImage} disabled={loading} className="sr-only" aria-label="Dodaj zdjęcie pomieszczenia" />
            </label>

            {error && error !== 'BRAK_KREDYTOW' && (
              <div role="alert" className="bg-surface-2 border border-accent-2/40 text-accent-2 text-sm rounded-xl px-4 py-3 mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !miasto || !image}
              className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-base hover:bg-accent-hover btn-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analizuję zdjęcie...
                </>
              ) : 'Wyceń mój remont →'}
            </button>

            {loading && <PasekPostepu miasto={miasto.trim()} />}
          </div>

          {/* SIDEBAR */}
          <div className="min-w-0 flex flex-col gap-6">
            <div className="bg-surface border border-line rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-line flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-0.5">Przykładowy wynik</div>
                  <div className="text-base font-bold text-ink">Łazienka 6m² · Kraków</div>
                </div>
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-400/30 px-2 py-0.5 rounded-full font-medium">Demo</span>
              </div>
              <div className="divide-y divide-line">
                {[
                  { name: 'Skucie płytek i wywóz gruzu', min: 2000, max: 3200 },
                  { name: 'Hydroizolacja i przygotowanie podłoża', min: 1200, max: 2000 },
                  { name: 'Glazura i terakota — robocizna (ok. 25 m²)', min: 3800, max: 6000 },
                  { name: 'Hydraulika i biały montaż', min: 3000, max: 5000 },
                  { name: 'Materiały: płytki, chemia, armatura (średni standard)', min: 8000, max: 14000 },
                ].map((item, i) => (
                  <div key={i} className="px-6 py-3 flex justify-between items-center">
                    <span className="text-sm text-ink-2">{item.name}</span>
                    <span className="text-sm font-semibold text-ink tabular-nums">{item.min.toLocaleString('pl-PL')} – {item.max.toLocaleString('pl-PL')} zł</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-accent text-white flex justify-between items-center gap-3 flex-wrap">
                <span className="font-semibold">Łącznie</span>
                <span className="text-xl font-extrabold tracking-tight tabular-nums">18 000 – 30 200 zł</span>
              </div>
            </div>

            <div className="bg-surface border border-line rounded-3xl p-7">
              <h3 className="text-lg font-bold text-ink mb-5">Co bierzemy pod uwagę</h3>
              <div className="space-y-4">
                {[
                  { t: 'Lokalizacja', d: 'Stawki w Warszawie są 20–35% wyższe niż w mniejszych miastach.' },
                  { t: 'Ukryte koszty', d: 'Wywóz gruzu, folia, taśmy, kleje — wszystko w wycenie.' },
                  { t: 'Widełki, nie liczba', d: 'Przedział min-max bo remont zawsze ma zmienne.' },
                  { t: 'Co zrobić przy okazji', d: 'Wiemy kiedy warto coś wymienić teraz zamiast płacić dwa razy.' },
                ].map((item) => (
                  <div key={item.t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-2" />
                    <div>
                      <div className="font-semibold text-ink text-sm mb-0.5">{item.t}</div>
                      <div className="text-xs text-muted leading-relaxed">{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
