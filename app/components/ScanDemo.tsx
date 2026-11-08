// Pokaz na stronie głównej: ilustracja łazienki, przez którą przechodzi skan,
// ramki z wykrytymi elementami i kosztorys budujący się wiersz po wierszu.
// Czysty CSS (animacje w globals.css), zero JavaScriptu.

const ROWS = [
  { name: 'Skucie i wywóz gruzu', range: '2 000–3 200 zł' },
  { name: 'Hydroizolacja i podłoże', range: '1 200–2 000 zł' },
  { name: 'Glazura, robocizna', range: '3 800–6 000 zł' },
  { name: 'Hydraulika i biały montaż', range: '3 000–5 000 zł' },
  { name: 'Materiały, średni standard', range: '8 000–14 000 zł' },
]

const delay = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties

const wall: React.CSSProperties = {
  backgroundColor: '#3a342d',
  backgroundImage: 'linear-gradient(#2a251f 2px, transparent 2px), linear-gradient(90deg, #2a251f 2px, transparent 2px)',
  backgroundSize: '46px 46px',
}
const floor: React.CSSProperties = {
  backgroundColor: '#2b2621',
  backgroundImage: 'linear-gradient(90deg, #221e1a 2px, transparent 2px), linear-gradient(#221e1a 2px, transparent 2px)',
  backgroundSize: '68px 34px',
}

export default function ScanDemo() {
  return (
    <div className="flex flex-wrap gap-5">
      {/* Zdjęcie ze skanem */}
      <div className="glow-ring min-w-0 flex-[3_1_520px] rounded-[28px]">
        <div
          role="img"
          aria-label="Przykład: system analizuje zdjęcie łazienki i zaznacza płytki do skucia, umywalkę i posadzkę wymagającą hydroizolacji"
          className="relative h-[340px] overflow-hidden rounded-[27px] bg-surface sm:h-[440px]"
        >
          <div className="absolute inset-x-0 top-0 bottom-[32%]" style={wall} />
          <div className="absolute inset-x-0 top-[68%] bottom-0" style={floor} />
          <div className="absolute bottom-[14%] left-[9%] h-[30%] w-[34%] rounded-[10px_10px_40px_40px] bg-[#5a534b] shadow-[inset_0_-12px_0_#4a443d]" />
          <div className="absolute right-[16%] bottom-[30%] h-[26%] w-[14%] rounded-lg bg-[#554e46]" />
          <div className="absolute top-[14%] right-[18%] h-[18%] w-[10%] rounded-md border-4 border-[#5e5850] bg-[#4f5c62]" />

          <div className="scan-glow" />
          <div className="scan-line" />

          <div className="cycle-in absolute top-[12%] left-[6%] h-1/2 w-[46%] rounded-xl border-[1.5px] border-ink shadow-[0_0_0_4px_rgb(244_238_230/0.07)]">
            <span className="absolute -top-4 left-2.5 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-bg sm:text-[13px]">
              Płytki ścienne · ok. 25 m² do skucia
            </span>
          </div>
          <div className="cycle-in absolute right-[12%] bottom-[26%] h-[34%] w-[22%] rounded-xl border-[1.5px] border-accent-2 shadow-[0_0_0_4px_rgb(240_138_85/0.13)]" style={delay(1.2)}>
            <span className="absolute -top-4 right-2.5 whitespace-nowrap rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white sm:text-[13px]">
              Umywalka + bateria
            </span>
          </div>
          <div className="cycle-in absolute bottom-[4%] left-[4%] h-[24%] w-[92%] rounded-xl border-[1.5px] border-dashed border-ink/70" style={delay(2.4)}>
            <span className="absolute -top-4 right-2.5 whitespace-nowrap rounded-full border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink sm:text-[13px]">
              Posadzka: hydroizolacja wymagana
            </span>
          </div>

          <div className="absolute top-4 right-4 hidden items-center gap-2 sm:flex rounded-full border border-line bg-bg/80 px-3 py-1.5 text-xs font-semibold sm:top-5 sm:right-5 sm:px-3.5 sm:py-2 sm:text-[13px]">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent-2" />
            Analiza zdjęcia…
          </div>
        </div>
      </div>

      {/* Kosztorys */}
      <div className="relative flex min-w-0 flex-[2_1_320px] flex-col rounded-[28px] border border-line bg-surface p-6 sm:p-7">
        <div className="mb-2.5 flex items-baseline justify-between text-sm text-muted">
          <span className="text-lg font-bold text-ink">Łazienka 6 m²</span>
          <span>Kraków · przykład</span>
        </div>
        <ul>
          {ROWS.map((r, i) => (
            <li
              key={r.name}
              className="cycle-row flex justify-between gap-3 border-b border-line py-3 text-[15px] text-ink-2 last:border-0"
              style={delay(i * 0.6)}
            >
              <span>{r.name}</span>
              <span className="whitespace-nowrap font-semibold tabular-nums text-ink">{r.range}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-3 rounded-2xl bg-accent px-5 py-4 text-white">
          <span className="text-sm">Łącznie</span>
          <span className="text-[28px] font-extrabold tracking-tight tabular-nums">18 000–30 200 zł</span>
        </div>
        <div className="float-y absolute -top-4 right-3 rounded-xl bg-ink px-3.5 py-2.5 text-[13px] font-semibold text-bg shadow-2xl shadow-black/60">
          Ukryte koszty uwzględnione
        </div>
      </div>
    </div>
  )
}
