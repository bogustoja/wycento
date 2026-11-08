import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Wspólny szablon obrazka podglądu (OG) dla wersji PL i EN.
export type OgText = { title1: string; title2: string; sub: string; left: string; badge: string }

export async function renderOg(t: OgText) {
  const dir = join(process.cwd(), 'assets/fonts')
  const [latin400, latinExt400, latin700, latinExt700] = await Promise.all([
    readFile(join(dir, 'lora-latin-400-normal.woff')),
    readFile(join(dir, 'lora-latin-ext-400-normal.woff')),
    readFile(join(dir, 'lora-latin-700-normal.woff')),
    readFile(join(dir, 'lora-latin-ext-700-normal.woff')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#FAF8F5',
          backgroundImage: 'radial-gradient(#E7E0D8 2px, transparent 2px)',
          backgroundSize: '36px 36px',
          // Dwie rodziny: podstawowa łacinka + latin-ext (ą, ę, ł, ń…) — satori bierze brakujące znaki z drugiej.
          fontFamily: 'Lora, LoraExt',
          color: '#1C1917',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#C85A2A" />
            <path d="M12 31 L32 14 L52 31" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 28 V48 H45 V28" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
            <path d="M25 38 L30.5 43 L40 33" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: 'flex', marginLeft: 20, fontSize: 48, fontWeight: 700 }}>
            <span>Wyceń</span>
            <span style={{ color: '#C85A2A' }}>To</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1 }}>
            {t.title1}
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1, color: '#C85A2A' }}>
            {t.title2}
          </div>
          <div style={{ fontSize: 32, fontWeight: 400, color: '#57534E', marginTop: 24 }}>
            {t.sub}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 28, color: '#44403C' }}>
          <div style={{ display: 'flex' }}>{t.left}</div>
          <div style={{ display: 'flex', background: '#C85A2A', color: '#fff', padding: '14px 28px', borderRadius: 14, fontWeight: 700 }}>
            {t.badge}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Lora', data: latin400, weight: 400, style: 'normal' },
        { name: 'LoraExt', data: latinExt400, weight: 400, style: 'normal' },
        { name: 'Lora', data: latin700, weight: 700, style: 'normal' },
        { name: 'LoraExt', data: latinExt700, weight: 700, style: 'normal' },
      ],
    }
  )
}
