'use client'

import LogoIcon from '../components/LogoIcon'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { wyceńRemont } from '../actions/wycena'

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
      <div className="flex justify-between text-xs text-[#78716C] mb-2">
        <span>{etap}</span>
        <span className="tabular-nums">{Math.round(procent)}%</span>
      </div>
      <div className="h-2 bg-[#F2EDE6] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C85A2A] rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${procent}%` }}
        />
      </div>
      <p className="text-xs text-center text-[#A8A29E] mt-2 tabular-nums">
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
  const [error, setError] = useState(null)
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
      else setWynik(result.wynik)
    } catch (err) {
      console.error(err)
      setError('Brak połączenia z serwerem. Sprawdź internet i spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  function handlePDF() {
    const win = window.open('', '_blank')
    win.document.write(`
      <!DOCTYPE html>
      <html lang="pl">
      <head>
        <meta charset="UTF-8">
        <title>Wycena — ${pomieszczenie} — ${miasto}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, Helvetica, sans-serif; max-width: 760px; margin: 40px auto; padding: 0 24px; color: #1C1917; font-size: 14px; line-height: 1.5; }
          .header { display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 2px solid #C85A2A; padding-bottom: 20px; margin-bottom: 28px; }
          .logo { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; }
          .logo span { color: #C85A2A; }
          .meta h1 { font-size: 18px; font-weight: 700; }
          .meta p { color: #78716C; font-size: 12px; margin-top: 4px; }
          .section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #A8A29E; font-weight: 700; margin: 24px 0 10px; }
          .summary { background: #FAF8F5; border: 1px solid #E7E0D8; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #44403C; }
          table { width: 100%; border-collapse: collapse; }
          tr { border-bottom: 1px solid #E7E0D8; }
          td { padding: 10px 0; }
          td:last-child { text-align: right; font-weight: 600; }
          .total-row td { background: #1C1917; color: white; padding: 12px 10px; font-weight: 700; font-size: 15px; }
          .total-row td:first-child { border-radius: 6px 0 0 6px; }
          .total-row td:last-child { border-radius: 0 6px 6px 0; color: #E8A07A; }
          .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 8px; }
          .item { display: flex; gap: 8px; font-size: 13px; margin: 6px 0; align-items: flex-start; }
          .warn { color: #D97706; font-size: 15px; flex-shrink: 0; }
          .ok { color: #16A34A; font-size: 15px; flex-shrink: 0; }
          .time-box { margin-top: 20px; background: #F5EBE4; border: 1px solid #E7E0D8; border-radius: 8px; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; }
          .time-box .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #A8A29E; font-weight: 700; }
          .time-box .value { font-size: 17px; font-weight: 700; color: #1C1917; }
          .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #E7E0D8; font-size: 11px; color: #A8A29E; text-align: center; }
          @page { size: A4 portrait; margin: 15mm; } html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } tr, .item { break-inside: avoid; } @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo"><svg width="26" height="26" viewBox="0 0 64 64" style="vertical-align:-6px;margin-right:8px"><rect width="64" height="64" rx="14" fill="#C85A2A"/><path d="M12 31 L32 14 L52 31" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 28 V48 H45 V28" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><path d="M25 38 L30.5 43 L40 33" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Wyceń<span>To</span></div>
          <div class="meta">
            <h1>${pomieszczenie} · ${miasto}</h1>
            <p>${new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <div class="section-label">Analiza zdjęcia</div>
        <div class="summary">${wynik.summary}</div>

        <div class="section-label">Kosztorys</div>
        <table>
          ${wynik.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.min.toLocaleString('pl-PL')} – ${item.max.toLocaleString('pl-PL')} ${item.jednostka}</td>
            </tr>
          `).join('')}
          <tr class="total-row">
            <td>Łącznie</td>
            <td>${wynik.total_min.toLocaleString('pl-PL')} – ${wynik.total_max.toLocaleString('pl-PL')} zł</td>
          </tr>
        </table>

        <div class="two-col">
          <div>
            <div class="section-label">Na co uważać</div>
            ${wynik.uwagi.map(u => `<div class="item"><span class="warn">⚠</span><span>${u}</span></div>`).join('')}
          </div>
          <div>
            <div class="section-label">Warto dodać przy okazji</div>
            ${wynik.co_warto_dodac.map(c => `<div class="item"><span class="ok">✓</span><span>${c}</span></div>`).join('')}
          </div>
        </div>

        <div class="time-box">
          <div>
            <div class="label">Szacowany czas realizacji</div>
            <div class="value">${wynik.czas_realizacji}</div>
          </div>
        </div>

        <div style="margin-top:24px;background:#FEF8F4;border:1px solid #F2D9C8;border-radius:8px;padding:12px 16px;text-align:center;font-size:11px;color:#C85A2A;font-weight:600;">Wygenerowano bezpłatnie na wycento.app · Sprawdź ile kosztuje Twój remont</div>
        <div class="footer">
          Wycena wygenerowana przez WyceńTo · wycento.app · Wycena ma charakter orientacyjny i nie stanowi oferty handlowej
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `)
    win.document.close()
  }

  // PAYWALL
  if (error === 'BRAK_KREDYTOW') {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917] mb-3">Limit wycen wyczerpany</h1>
          <p className="text-[#78716C] mb-8">Wykorzystałeś wszystkie 3 darmowe wyceny. Przejdź na plan Pro — nielimitowane wyceny i pobieranie PDF za 39 zł miesięcznie.</p>
          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-7 mb-6 text-left">
            <ul className="space-y-3">
              {['Nielimitowane wyceny', 'Pobieranie raportów PDF', 'Historia wszystkich wycen', 'Priorytetowa obsługa'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#44403C]">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-[#E7E0D8] flex items-end gap-1">
              <span className="font-serif text-4xl font-bold">39</span>
              <span className="text-[#78716C] pb-1">zł / miesiąc</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/pro')}
            className="w-full bg-[#C85A2A] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20 mb-3"
          >
            Przejdź na Pro →
          </button>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-[#78716C] hover:text-[#1C1917] transition">
            Wróć do panelu
          </button>
        </div>
      </main>
    )
  }

  // WYNIK
  if (wynik) {
    return (
      <main className="min-h-screen bg-[#FAF8F5]">
        <nav className="bg-white border-b border-[#E7E0D8] sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-0.5">
              <LogoIcon size={28} className="mr-2" />
              <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
              <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
            </a>
            <button onClick={() => router.push('/dashboard')} className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors border border-[#E7E0D8] px-3 py-1.5 rounded-lg hover:bg-[#F2EDE6]">
              ← Panel
            </button>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-10">
          <button onClick={() => setWynik(null)} className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors mb-6 block">
            ← Nowa wycena
          </button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#1C1917]">Wycena gotowa</h1>
              <p className="text-sm text-[#78716C] mt-1">{pomieszczenie} · {miasto}</p>
            </div>
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full font-semibold">Gotowa ✓</span>
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-6 mb-4">
            <div className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest mb-3">Analiza zdjęcia</div>
            <p className="text-[#44403C] leading-relaxed text-sm">{wynik.summary}</p>
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-2xl overflow-hidden mb-4">
            <div className="px-6 py-4 border-b border-[#E7E0D8] bg-[#FAF8F5]">
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">Kosztorys — {miasto}</h2>
            </div>
            <div className="divide-y divide-[#E7E0D8]">
              {wynik.items.map((item, i) => (
                <div key={i} className="px-6 py-4 flex justify-between items-center">
                  <span className="text-sm text-[#44403C]">{item.name}</span>
                  <span className="font-semibold text-[#1C1917] text-sm tabular-nums whitespace-nowrap ml-4">
                    {item.min.toLocaleString('pl-PL')} – {item.max.toLocaleString('pl-PL')} {item.jednostka}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 bg-[#1C1917] flex justify-between items-center">
              <span className="font-semibold text-white">Łącznie</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#E8A07A] whitespace-nowrap ml-4">
                {wynik.total_min.toLocaleString('pl-PL')} – {wynik.total_max.toLocaleString('pl-PL')} zł
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-[#E7E0D8] rounded-2xl p-6">
              <div className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest mb-4">Na co uważać</div>
              <ul className="space-y-3">
                {wynik.uwagi.map((u, i) => (
                  <li key={i} className="text-sm text-[#44403C] flex gap-2 leading-relaxed">
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠</span>{u}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#E7E0D8] rounded-2xl p-6">
              <div className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest mb-4">Warto dodać przy okazji</div>
              <ul className="space-y-3">
                {wynik.co_warto_dodac.map((c, i) => (
                  <li key={i} className="text-sm text-[#44403C] flex gap-2 leading-relaxed">
                    <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-6 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest mb-1">Czas realizacji</div>
              <div className="font-serif text-xl font-bold text-[#1C1917]">{wynik.czas_realizacji}</div>
            </div>
            <button
              onClick={handlePDF}
              className="bg-[#C85A2A] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#B04E24] transition shadow-md shadow-[#C85A2A]/20 flex items-center gap-2"
            >
              <span>📄</span> Pobierz PDF
            </button>
          </div>
        </div>
      </main>
    )
  }

  // FORMULARZ
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <nav className="bg-white border-b border-[#E7E0D8] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold text-[#1C1917]">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors border border-[#E7E0D8] px-3 py-1.5 rounded-lg hover:bg-[#F2EDE6]">
            ← Panel
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-[#1C1917] mb-2">Nowa wycena</h1>
          <p className="text-[#78716C]">Zrób zdjęcie pomieszczenia i podaj lokalizację</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* FORMULARZ */}
          <div className="bg-white border border-[#E7E0D8] rounded-2xl p-8">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-6">Twoje pomieszczenie</h2>

            <div className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Miasto lub kod pocztowy"
                value={miasto}
                onChange={(e) => setMiasto(e.target.value)}
                className="flex-1 bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-[#C85A2A] focus:ring-2 focus:ring-[#C85A2A]/10 transition"
              />
              <select
                value={pomieszczenie}
                onChange={(e) => setPomieszczenie(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm text-[#1C1917] outline-none focus:border-[#C85A2A] transition"
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
              <label className="block text-sm font-medium text-[#44403C] mb-2">
                Co chcesz zrobić? <span className="text-[#A8A29E] font-normal">(opcjonalnie)</span>
              </label>
              <textarea
                placeholder="np. położyć płytki na podłodze, wymienić wannę na prysznic, pomalować ściany i wymienić okno..."
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                rows={3}
                className="w-full bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none focus:border-[#C85A2A] focus:ring-2 focus:ring-[#C85A2A]/10 transition resize-none"
              />
            </div>

            <label className="block border-2 border-dashed border-[#E7E0D8] rounded-2xl p-10 text-center cursor-pointer hover:border-[#C85A2A] hover:bg-[#FEF8F4] transition-all mb-6 group">
              {preview ? (
                <div>
                  <img src={preview} alt="preview" className="max-h-56 mx-auto rounded-xl object-cover shadow-sm" />
                  <p className="text-xs text-[#A8A29E] mt-3">Kliknij żeby zmienić zdjęcie</p>
                </div>
              ) : (
                <>
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform inline-block">📷</div>
                  <div className="text-base font-semibold text-[#44403C] mb-1">Dodaj zdjęcie pomieszczenia</div>
                  <div className="text-sm text-[#A8A29E]">Kliknij lub przeciągnij plik · JPG, PNG, HEIC</div>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>

            {error && error !== 'BRAK_KREDYTOW' && (
              <div className="bg-[#FEF0EA] border border-[#C85A2A]/30 text-[#C85A2A] text-sm rounded-xl px-4 py-3 mb-4">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || !miasto || !image}
              className="w-full bg-[#C85A2A] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#B04E24] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#C85A2A]/20 flex items-center justify-center gap-2"
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
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-[#E7E0D8] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E7E0D8] bg-[#FAF8F5] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest mb-0.5">Przykładowy wynik</div>
                  <div className="font-serif text-base font-bold text-[#1C1917]">Łazienka 6m² · Kraków</div>
                </div>
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">Demo</span>
              </div>
              <div className="divide-y divide-[#E7E0D8]">
                {[
                  { name: 'Skucie płytek i wywóz gruzu', min: 2000, max: 3200 },
                  { name: 'Hydroizolacja i przygotowanie podłoża', min: 1200, max: 2000 },
                  { name: 'Glazura i terakota — robocizna (ok. 25 m²)', min: 3800, max: 6000 },
                  { name: 'Hydraulika i biały montaż', min: 3000, max: 5000 },
                  { name: 'Materiały: płytki, chemia, armatura (średni standard)', min: 8000, max: 14000 },
                ].map((item, i) => (
                  <div key={i} className="px-6 py-3 flex justify-between items-center">
                    <span className="text-sm text-[#44403C]">{item.name}</span>
                    <span className="text-sm font-semibold text-[#1C1917] tabular-nums">{item.min.toLocaleString('pl-PL')} – {item.max.toLocaleString('pl-PL')} zł</span>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-[#1C1917] flex justify-between items-center">
                <span className="font-semibold text-white">Łącznie</span>
                <span className="font-serif text-xl font-bold text-[#E8A07A]">18 000 – 30 200 zł</span>
              </div>
            </div>

            <div className="bg-[#1C1917] rounded-2xl p-7">
              <h3 className="font-serif text-lg font-bold text-white mb-5">Co bierzemy pod uwagę</h3>
              <div className="space-y-4">
                {[
                  { icon: '📍', t: 'Lokalizacja', d: 'Stawki w Warszawie są 20–35% wyższe niż w mniejszych miastach.' },
                  { icon: '🔧', t: 'Ukryte koszty', d: 'Wywóz gruzu, folia, taśmy, kleje — wszystko w wycenie.' },
                  { icon: '📊', t: 'Widełki, nie liczba', d: 'Przedział min-max bo remont zawsze ma zmienne.' },
                  { icon: '💡', t: 'Co zrobić przy okazji', d: 'Wiemy kiedy warto coś wymienić teraz zamiast płacić dwa razy.' },
                ].map((item) => (
                  <div key={item.t} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-white text-sm mb-0.5">{item.t}</div>
                      <div className="text-xs text-[#78716C] leading-relaxed">{item.d}</div>
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
