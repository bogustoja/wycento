'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { wyceńRemont } from '../actions/wycena'

export default function WycenaPage() {
  const [miasto, setMiasto] = useState('')
  const [pomieszczenie, setPomieszczenie] = useState('Łazienka')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [wynik, setWynik] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => { setImage(e.target.result); setPreview(e.target.result) }
    reader.readAsDataURL(file)
  }

  async function handleSubmit() {
    if (!miasto || !image) { setError('Dodaj zdjęcie i podaj miasto'); return }
    setLoading(true); setError(null)
    const formData = new FormData()
    formData.append('miasto', miasto)
    formData.append('pomieszczenie', pomieszczenie)
    formData.append('image', image)
    const result = await wyceńRemont(formData)
    if (result.error) setError(result.error)
    else setWynik(result.wynik)
    setLoading(false)
  }

  if (wynik) {
    return (
      <main className="min-h-screen py-10 px-8" style={{backgroundColor: '#FAF8F5', backgroundImage: 'radial-gradient(#E7E0D8 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setWynik(null)} className="text-sm text-[#78716C] hover:text-[#1C1917] mb-6 block">← Nowa wycena</button>
          <div className="bg-white border border-[#E7E0D8] rounded-xl p-6 mb-4">
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-2">Analiza zdjęcia</div>
            <p className="text-[#44403C] leading-relaxed">{wynik.summary}</p>
          </div>
          <div className="bg-white border border-[#E7E0D8] rounded-xl overflow-hidden mb-4">
            <div className="px-6 py-4 border-b border-[#E7E0D8]">
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">Kosztorys — {miasto}</h2>
            </div>
            <div className="divide-y divide-[#E7E0D8]">
              {wynik.items.map((item, i) => (
                <div key={i} className="px-6 py-4 flex justify-between items-center">
                  <span className="text-sm text-[#44403C]">{item.name}</span>
                  <span className="font-semibold text-[#1C1917] text-sm">{item.min.toLocaleString()} – {item.max.toLocaleString()} {item.jednostka}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 bg-[#F2EDE6] flex justify-between items-center border-t border-[#E7E0D8]">
              <span className="font-semibold text-[#1C1917]">Łącznie</span>
              <span className="font-serif text-2xl font-bold text-[#C85A2A]">{wynik.total_min.toLocaleString()} – {wynik.total_max.toLocaleString()} zł</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-[#E7E0D8] rounded-xl p-5">
              <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-3">Uwagi</div>
              <ul className="space-y-3">
                {wynik.uwagi.map((u, i) => (
                  <li key={i} className="text-sm text-[#44403C] flex gap-2 leading-relaxed"><span className="text-[#C85A2A] flex-shrink-0">⚠</span>{u}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#E7E0D8] rounded-xl p-5">
              <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-3">Warto dodać</div>
              <ul className="space-y-3">
                {wynik.co_warto_dodac.map((c, i) => (
                  <li key={i} className="text-sm text-[#44403C] flex gap-2 leading-relaxed"><span className="text-[#4A7C59] flex-shrink-0">✓</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white border border-[#E7E0D8] rounded-xl p-5 flex justify-between items-center">
            <div>
              <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-1">Czas realizacji</div>
              <div className="font-serif text-lg font-bold text-[#1C1917]">{wynik.czas_realizacji}</div>
            </div>
            <button className="bg-[#C85A2A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B04E24] transition">Pobierz PDF</button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-10 px-8" style={{backgroundColor: '#FAF8F5', backgroundImage: 'radial-gradient(#E7E0D8 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <button onClick={() => router.push('/dashboard')} className="text-sm text-[#78716C] hover:text-[#1C1917] mb-4 block">← Wróć do panelu</button>
          <h1 className="font-serif text-4xl font-bold text-[#1C1917] mb-2">Nowa wycena</h1>
          <p className="text-[#78716C] text-lg">Zrób zdjęcie pomieszczenia i podaj lokalizację</p>
        </div>

        {/* GŁÓWNY GRID */}
        <div className="grid grid-cols-2 gap-8 mb-8">

          {/* FORMULARZ */}
          <div className="bg-white border border-[#E7E0D8] rounded-xl p-8">
            <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-6">Twoje pomieszczenie</h2>
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="Miasto lub kod pocztowy"
                value={miasto}
                onChange={(e) => setMiasto(e.target.value)}
                className="flex-1 bg-[#FAF8F5] border border-[#E7E0D8] rounded-lg px-4 py-3 text-sm text-[#1C1917] outline-none focus:border-[#C85A2A]"
              />
              <select
                value={pomieszczenie}
                onChange={(e) => setPomieszczenie(e.target.value)}
                className="bg-[#FAF8F5] border border-[#E7E0D8] rounded-lg px-4 py-3 text-sm text-[#1C1917] outline-none"
              >
                <option>Łazienka</option>
                <option>Kuchnia</option>
                <option>Pokój</option>
                <option>Przedpokój</option>
                <option>Sypialnia</option>
                <option>Taras</option>
                <option>Całe mieszkanie</option>
              </select>
            </div>
            <label className="block border-2 border-dashed border-[#E7E0D8] rounded-xl p-10 text-center cursor-pointer hover:border-[#C85A2A] hover:bg-[#F5EBE4] transition mb-6">
              {preview ? (
                <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-lg object-cover" />
              ) : (
                <>
                  <div className="text-5xl mb-3">📷</div>
                  <div className="text-base font-semibold text-[#44403C]">Dodaj zdjęcie pomieszczenia</div>
                  <div className="text-sm text-[#78716C] mt-1">Kliknij lub przeciągnij plik · JPG, PNG, HEIC</div>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
            {error && <div className="bg-[#F5EBE4] text-[#C85A2A] text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#C85A2A] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#B04E24] transition disabled:opacity-50"
            >
              {loading ? '⏳ Analizuję zdjęcie...' : 'Wyceń mój remont →'}
            </button>
          </div>

          {/* PRZYKŁADOWA WYCENA */}
          <div className="bg-white border border-[#E7E0D8] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E7E0D8] bg-[#F2EDE6]">
              <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-1">Przykładowy wynik</div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Łazienka 6m² · Warszawa</h3>
            </div>
            <div className="divide-y divide-[#E7E0D8]">
              {[
                { name: 'Glazura i terakota (robocizna)', min: 1800, max: 2600 },
                { name: 'Hydraulik — armatura', min: 900, max: 1400 },
                { name: 'Malowanie i tynkowanie', min: 600, max: 900 },
                { name: 'Materiały (kleje, fugi, uszczelki)', min: 800, max: 1200 },
                { name: 'Wywóz gruzu i sprzątanie', min: 300, max: 500 },
              ].map((item, i) => (
                <div key={i} className="px-6 py-3 flex justify-between items-center">
                  <span className="text-sm text-[#44403C]">{item.name}</span>
                  <span className="text-sm font-semibold text-[#1C1917]">{item.min.toLocaleString()} – {item.max.toLocaleString()} zł</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-[#F2EDE6] flex justify-between items-center border-t border-[#E7E0D8]">
              <span className="font-semibold text-[#1C1917]">Łącznie</span>
              <span className="font-serif text-xl font-bold text-[#C85A2A]">4 400 – 6 600 zł</span>
            </div>
            <div className="px-6 py-4 border-t border-[#E7E0D8]">
              <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-2">Warto dodać przy okazji</div>
              <ul className="space-y-1">
                {['Wymiana rur jeśli starsze niż 20 lat', 'Wentylacja mechaniczna — oszczędność na wilgoci', 'Ogrzewanie podłogowe — montaż tylko przy wymianie płytek'].map((c, i) => (
                  <li key={i} className="text-xs text-[#44403C] flex gap-2"><span className="text-[#4A7C59]">✓</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CZĘSTO WYCENIANE */}
        <div className="bg-white border border-[#E7E0D8] rounded-xl p-6 mb-8">
          <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-4">Często wyceniane</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { emoji: '🚿', name: 'Łazienka 6m²', location: 'Warszawa', price: '4 500 – 7 000 zł' },
              { emoji: '🍳', name: 'Kuchnia 10m²', location: 'Kraków', price: '12 000 – 18 000 zł' },
              { emoji: '🛋️', name: 'Salon 20m²', location: 'Wrocław', price: '8 000 – 14 000 zł' },
              { emoji: '🏠', name: 'Całe mieszkanie 50m²', location: 'Poznań', price: '45 000 – 70 000 zł' },
            ].map((item, i) => (
              <div key={i} className="bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl p-4">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="font-semibold text-sm text-[#1C1917] mb-1">{item.name}</div>
                <div className="text-xs text-[#78716C] mb-2">{item.location}</div>
                <div className="font-serif font-bold text-[#C85A2A] text-sm">{item.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CO BIERZEMY POD UWAGĘ */}
        <div className="bg-[#1C1917] rounded-xl p-8">
          <h3 className="font-serif text-xl font-bold text-white mb-6">Co bierzemy pod uwagę przy wycenie?</h3>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: '📍', t: 'Lokalizacja', d: 'Stawki robocizny w Warszawie są 20-35% wyższe niż średnia krajowa. Uwzględniamy realia Twojego miasta.' },
              { icon: '🔍', t: 'Stan techniczny', d: 'AI analizuje widoczne usterki, stan ścian, podłóg i instalacji. Im więcej widać, tym lepsza wycena.' },
              { icon: '🔧', t: 'Ukryte koszty', d: 'Wywóz gruzu, folia, taśmy, kleje, gruntowanie — wszystko co pomijają inne kalkulatory.' },
              { icon: '⏰', t: 'Czas realizacji', d: 'Pilne zlecenia kosztują więcej. Wycena uwzględnia czas i dostępność ekip w Twoim mieście.' },
              { icon: '💡', t: 'Co zrobić przy okazji', d: 'Doświadczenie z budowlanki mówi kiedy warto coś wymienić teraz zamiast płacić dwa razy.' },
              { icon: '📊', t: 'Widełki, nie liczba', d: 'Każda wycena to przedział min-max. Uczciwie — bo remont zawsze ma zmienne.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{item.t}</div>
                  <div className="text-xs text-[#78716C] leading-relaxed">{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
