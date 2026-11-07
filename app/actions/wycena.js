'use server'

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '../lib/supabase-server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const POMIESZCZENIA = ['Łazienka', 'Kuchnia', 'Przedpokój', 'Sypialnia', 'Pokój', 'Salon', 'Całe mieszkanie', 'Taras']
const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_BASE64_LENGTH = 6_500_000 // ~4.8 MB po zdekodowaniu, limit Claude to 5 MB

function getAdmin() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

const SYSTEM_PROMPT = `Jesteś doświadczonym kierownikiem ekipy wykończeniowej w Polsce. Robiłeś łazienki, kuchnie, pokoje, tarasy i altany. Wyceniasz remont na podstawie zdjęcia tak, jak zrobiłbyś to dla klienta przy pierwszych oględzinach.

ZASADY WYCENY
- Podajesz widełki min–max w złotych brutto, osobno dla każdej pozycji. Nigdy jedna liczba.
- Rozdzielasz robociznę od materiałów. Materiały liczysz w średnim standardzie (nie najtańsze z marketu, nie premium).
- Stawki robocizny zależą od miasta: Warszawa, Kraków, Wrocław, Trójmiasto, Poznań są wyraźnie droższe niż średnie miasta, a te droższe niż małe miejscowości i wsie.
- Jeśli czegoś nie widać na zdjęciu (powierzchnia, stan instalacji pod płytkami, wilgoć), zakładasz realistyczny wariant i piszesz to wprost w "uwagi".

STAWKI BAZOWE 2026 — ROBOCIZNA BRUTTO, MIASTO 100–300 TYS. MIESZKAŃCÓW
- Skucie płytek: 50–90 zł/m². Wywóz gruzu z łazienki: 500–1000 zł.
- Hydroizolacja: 40–80 zł/m². Wylewka / wyrównanie podłogi: 40–90 zł/m².
- Glazura i terakota standard (do 60×60): 120–200 zł/m². Wielki format (60×120 i większe): 220–380 zł/m². Mozaika: 250–450 zł/m².
- Punkt hydrauliczny (woda lub kanalizacja): 300–700 zł. Biały montaż: 300–800 zł za sztukę. Stelaż WC z montażem: 800–1500 zł.
- Punkt elektryczny nowy: 150–250 zł. Przeróbka istniejącego: 100–150 zł.
- Malowanie 2 warstwy: 20–35 zł/m². Gładź: 40–56 zł/m².
- Montaż paneli: 45–85 zł/m². Sufit podwieszany GK: 80–150 zł/m².
Mnożniki lokalizacji (stosuj do robocizny):
- Warszawa: ×1.25–1.4.
- Kraków, Wrocław, Trójmiasto, Poznań: ×1.15–1.25.
- Pozostałe miasta wojewódzkie: ×1.0–1.1.
- Małe miasta i wsie: ×0.85–0.95.
Kontrola sumy (z materiałami, średni standard) — jeśli wychodzisz poza te widełki bez wyraźnego powodu na zdjęciu, popraw wycenę:
- Łazienka 4–6 m², pełny remont: 16 000–36 000 zł.
- Kuchnia 10 m² z meblami i AGD: 25 000–55 000 zł; bez mebli: 8 000–18 000 zł.
- Pokój 15–20 m² (malowanie, gładzie, podłoga): 6 000–15 000 zł.
- Małe zlecenie: minimum 300–600 zł za samo przyjście ekipy.

UKRYTE KOSZTY — ZAWSZE SPRAWDŹ I DOLICZ, JEŚLI DOTYCZĄ
- Skucie starych płytek / zerwanie podłóg i wywóz gruzu (kontener lub worki big-bag).
- Gruntowanie, wyrównanie ścian i wylewki samopoziomujące — stare budynki rzadko mają proste ściany.
- Hydroizolacja w strefach mokrych (łazienka, prysznic, taras).
- Chemia budowlana: kleje, fugi, silikony, narożniki, listwy, taśmy uszczelniające.
- Zabezpieczenie mieszkania: folie, taśmy, sprzątanie po robocie.
- Stare instalacje: w blokach z lat 60–80 i kamienicach wymiana odcinków hydrauliki i elektryki to częsta niespodzianka po skuciu.
- Transport materiałów i wniesienie (zwłaszcza bez windy).

TYPOWE PUŁAPKI KLIENTA — WSKAŻ W "uwagi" TE, KTÓRE PASUJĄ
- Zmiana decyzji w trakcie (inne płytki, przesunięcie odpływu) podnosi koszt i wydłuża termin.
- Płytki wielkoformatowe kosztują więcej w robociźnie niż standardowe.
- Odpływ liniowy i stelaż podtynkowy to osobne pozycje.
- Zostaw 10–15% rezerwy na niespodzianki po skuciu.

CO WARTO ZROBIĆ PRZY OKAZJI
- Tylko rzeczy, których odłożenie oznacza ponowne kucie lub ponowny przyjazd ekipy (instalacje pod płytkami, dodatkowe gniazdka, wentylacja).

FORMAT
Wynik zapisujesz WYŁĄCZNIE narzędziem zapisz_wycene.
- Wyceniasz tylko prace, które faktycznie zostały do zrobienia. Jeśli coś jest już zrobione (np. płytki skute, stelaż zamontowany), nie doliczasz tego ponownie.
- 5–10 pozycji w items, nazwy krótkie (do 60 znaków).
- uwagi i co_warto_dodac: maksymalnie po 4 krótkie punkty.
- Jeśli na zdjęciu nie ma pomieszczenia do remontu, ustaw nie_pomieszczenie = true i zostaw items puste.`

const WYCENA_TOOL = {
  name: 'zapisz_wycene',
  description: 'Zapisuje wycenę remontu.',
  input_schema: {
    type: 'object',
    properties: {
      nie_pomieszczenie: { type: 'boolean', description: 'true, jeśli na zdjęciu nie ma pomieszczenia do remontu' },
      summary: { type: 'string', description: '2–3 zdania: co widać na zdjęciu, stan pomieszczenia, jaki zakres prac zakładasz' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            min: { type: 'number', description: 'zł brutto' },
            max: { type: 'number', description: 'zł brutto' },
          },
          required: ['name', 'min', 'max'],
        },
      },
      czas_realizacji: { type: 'string', description: 'np. 2–3 tygodnie' },
      uwagi: { type: 'array', items: { type: 'string' } },
      co_warto_dodac: { type: 'array', items: { type: 'string' } },
    },
    required: ['nie_pomieszczenie', 'summary', 'items', 'czas_realizacji', 'uwagi', 'co_warto_dodac'],
  },
}

function buildUserPrompt(miasto, pomieszczenie, opis) {
  return `Lokalizacja: ${miasto}
Typ pomieszczenia: ${pomieszczenie}${opis ? `\nZakres prac wskazany przez klienta: ${opis}` : ''}

Wyceń remont i zapisz wynik narzędziem zapisz_wycene.`
}

function normalizeWynik(raw) {
  const items = Array.isArray(raw.items)
    ? raw.items
        .filter(i => i && i.name && Number.isFinite(Number(i.min)) && Number.isFinite(Number(i.max)))
        .map(i => {
          const a = Math.round(Number(i.min))
          const b = Math.round(Number(i.max))
          return { name: String(i.name), min: Math.min(a, b), max: Math.max(a, b), jednostka: 'zł' }
        })
    : []

  if (items.length === 0) throw new Error('AI nie zwróciło pozycji wyceny')

  return {
    summary: String(raw.summary || ''),
    items,
    total_min: items.reduce((s, i) => s + i.min, 0),
    total_max: items.reduce((s, i) => s + i.max, 0),
    czas_realizacji: String(raw.czas_realizacji || 'do ustalenia z wykonawcą'),
    uwagi: Array.isArray(raw.uwagi) ? raw.uwagi.map(String) : [],
    co_warto_dodac: Array.isArray(raw.co_warto_dodac) ? raw.co_warto_dodac.map(String) : [],
  }
}

export async function wyceńRemont(formData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Musisz być zalogowany' }

  // --- Walidacja wejścia ---
  const miasto = String(formData.get('miasto') || '').trim().slice(0, 80)
  const pomieszczenieRaw = String(formData.get('pomieszczenie') || '').trim()
  const pomieszczenie = POMIESZCZENIA.includes(pomieszczenieRaw) ? pomieszczenieRaw : 'Pokój'
  const opis = String(formData.get('opis') || '').trim().slice(0, 500)
  const imageData = String(formData.get('image') || '')

  if (!miasto) return { error: 'Podaj miasto' }
  if (!imageData.startsWith('data:image/')) return { error: 'Dodaj zdjęcie pomieszczenia' }

  const mediaType = imageData.slice(5, imageData.indexOf(';'))
  const base64 = imageData.split(',')[1] || ''

  if (!MEDIA_TYPES.includes(mediaType)) {
    return { error: 'Nieobsługiwany format zdjęcia. Użyj JPG lub PNG.' }
  }
  if (!base64 || base64.length > MAX_BASE64_LENGTH) {
    return { error: 'Zdjęcie jest za duże. Spróbuj inne zdjęcie.' }
  }

  // --- Kredyt: pobierany atomowo w bazie, zwracany jeśli wycena padnie ---
  const { data: allowed, error: creditError } = await supabase.rpc('use_credit')
  if (creditError) {
    console.error('[wycena] use_credit failed:', creditError)
    return { error: 'Nie udało się sprawdzić konta. Spróbuj za chwilę.' }
  }
  if (!allowed) return { error: 'BRAK_KREDYTOW' }

  let wynik
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      tools: [WYCENA_TOOL],
      tool_choice: { type: 'tool', name: 'zapisz_wycene' },
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: buildUserPrompt(miasto, pomieszczenie, opis) },
        ],
      }],
    })

    const raw = response.content.find(c => c.type === 'tool_use')?.input
    if (!raw) throw new Error(`Brak wyniku narzędzia (stop_reason: ${response.stop_reason})`)
    if (response.stop_reason === 'max_tokens') throw new Error('Odpowiedź AI ucięta (max_tokens)')

    if (raw.nie_pomieszczenie === true) {
      await refund(user.id)
      return { error: 'Na zdjęciu nie widać pomieszczenia do remontu. Zrób zdjęcie całego pokoju.' }
    }

    wynik = normalizeWynik(raw)
  } catch (err) {
    console.error('[wycena] AI error:', err)
    await refund(user.id)
    return { error: 'Błąd podczas wyceny. Kredyt został zwrócony — spróbuj ponownie.' }
  }

  // --- Zapis do historii (wycena już jest, więc błąd zapisu nie blokuje wyniku) ---
  const { error: insertError } = await supabase
    .from('quotes')
    .insert({
      user_id: user.id,
      pomieszczenie,
      miasto,
      total_min: wynik.total_min,
      total_max: wynik.total_max,
      wynik,
    })

  if (insertError) {
    console.error('[wycena] quotes insert failed:', insertError)
  }

  return { success: true, wynik }
}

async function refund(userId) {
  const { error } = await getAdmin().rpc('refund_credit', { p_user: userId })
  if (error) console.error('[wycena] refund_credit failed for', userId, error)
}
