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
    reader.onload = (e) => {
      setImage(e.target.result)
      setPreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  async function handleSubmit() {
    if (!miasto || !image) {
      setError('Dodaj zdjęcie i podaj miasto')
      return
    }
    setLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append('miasto', miasto)
    formData.append('pomieszczenie', pomieszczenie)
    formData.append('image', image)
    const result = await wyceńRemont(formData)
    if (result.error) {
      setError(result.error)
    } else {
      setWynik(result.wynik)
    }
    setLoading(false)
  }

  if (wynik) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setWynik(null)} className="text-sm text-[#78716C] hover:text-[#1C1917]">← Nowa wycena</button>
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-xl p-6 mb-4">
            <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-2">Analiza zdjęcia</div>
            <p className="text-[#44403C]">{wynik.summary}</p>
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
            <div className="px-6 py-4 bg-[#F2EDE6] flex justify-between items-center border-t border-[#E7E0D8]">
              <span className="font-semibold text-[#1C1917]">Łącznie</span>
              <span className="font-serif text-2xl font-bold text-[#C85A2A]">{wynik.total_min.toLocaleString()} – {wynik.total_max.toLocaleString()} zł</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-[#E7E0D8] rounded-xl p-5">
              <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-3">Uwagi</div>
              <ul className="space-y-2">
                {wynik.uwagi.map((u, i) => (
                  <li key={i} className="text-sm text-[#44403C] flex gap-2"><span className="text-[#C85A2A]">⚠</span>{u}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#E7E0D8] rounded-xl p-5">
              <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-3">Warto dodać</div>
              <ul className="space-y-2">
                {wynik.co_warto_dodac.map((c, i) => (
                  <li key={i} className="text-sm text-[#44403C] flex gap-2"><span className="text-[#4A7C59]">✓</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[#E7E0D8] rounded-xl p-5 flex justify-between items-center">
            <div>
              <div className="text-xs font-semibold text-[#78716C] uppercase tracking-widest mb-1">Czas realizacji</div>
              <div className="font-serif text-lg font-bold text-[#1C1917]">{wynik.czas_realizacji}</div>
            </div>
            <button className="bg-[#C85A2A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B04E24] transition">
              Pobierz PDF
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <button onClick={() => router.push('/dashboard')} className="text-sm text-[#78716C] hover:text-[#1C1917] mb-4 block">← Wróć do panelu</button>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917] mb-2">Nowa wycena</h1>
          <p className="text-[#78716C]">Zrób zdjęcie i podaj lokalizację</p>
        </div>

        <div className="bg-white border border-[#E7E0D8] rounded-xl p-6">
          <div className="flex gap-3 mb-4">
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

          <label className="block border-2 border-dashed border-[#E7E0D8] rounded-xl p-6 text-center cursor-pointer hover:border-[#C85A2A] hover:bg-[#F5EBE4] transition mb-4">
            {preview ? (
              <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-lg object-cover" />
            ) : (
              <>
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm font-semibold text-[#44403C]">Dodaj zdjęcie pomieszczenia</div>
                <div className="text-xs text-[#78716C] mt-1">Kliknij lub przeciągnij plik</div>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>

          {error && <div className="bg-[#F5EBE4] text-[#C85A2A] text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#C85A2A] text-white py-3 rounded-lg font-semibold hover:bg-[#B04E24] transition disabled:opacity-50"
          >
            {loading ? '⏳ Analizuję zdjęcie...' : 'Wyceń mój remont →'}
          </button>
        </div>
      </div>
    </main>
  )
}