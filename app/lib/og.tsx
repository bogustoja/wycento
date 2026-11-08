import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Wspólny szablon obrazka podglądu (OG) dla wersji PL i EN.
// Ciemny styl jak na stronie: tło #12100E, światło i linia skanu w pomarańczu, czcionka Onest.
export type OgText = { title1: string; title2: string; sub: string; left: string; badge: string }

export async function renderOg(t: OgText) {
  const dir = join(process.cwd(), 'assets/fonts')
  const [latin400, latinExt400, latin800, latinExt800] = await Promise.all([
    readFile(join(dir, 'onest-latin-400-normal.woff')),
    readFile(join(dir, 'onest-latin-ext-400-normal.woff')),
    readFile(join(dir, 'onest-latin-800-normal.woff')),
    readFile(join(dir, 'onest-latin-ext-800-normal.woff')),
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
          position: 'relative',
          background: '#12100E',
          backgroundImage:
            'radial-gradient(circle at 78% 18%, rgba(200,90,42,0.32), rgba(18,16,14,0) 55%), radial-gradient(rgba(255,255,255,0.07) 2px, rgba(18,16,14,0) 2px)',
          backgroundSize: '1200px 630px, 34px 34px',
          // Dwie rodziny: podstawowa łacinka + latin-ext (ą, ę, ł, ń…) — satori bierze brakujące znaki z drugiej.
          fontFamily: 'Onest, OnestExt',
          color: '#F4EEE6',
        }}
      >
        {/* Linia skanu */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 468,
            height: 3,
            background: '#F08A55',
            boxShadow: '0 0 36px 10px rgba(240,138,85,0.45)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="72" height="72" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="14" fill="#C85A2A" />
            <path d="M12 31 L32 14 L52 31" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 28 V48 H45 V28" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
            <path d="M25 38 L30.5 43 L40 33" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: 'flex', marginLeft: 20, fontSize: 46, fontWeight: 800, letterSpacing: -1 }}>
            <span>Wyceń</span>
            <span style={{ color: '#F08A55' }}>To</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>{t.title1}</div>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: '#F08A55' }}>{t.title2}</div>
          <div style={{ fontSize: 30, fontWeight: 400, color: '#BDB3A6', marginTop: 26 }}>{t.sub}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 27, color: '#D7CCBF' }}>
          <div style={{ display: 'flex' }}>{t.left}</div>
          <div style={{ display: 'flex', background: '#C85A2A', color: '#fff', padding: '14px 28px', borderRadius: 16, fontWeight: 800 }}>
            {t.badge}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Onest', data: latin400, weight: 400, style: 'normal' },
        { name: 'OnestExt', data: latinExt400, weight: 400, style: 'normal' },
        { name: 'Onest', data: latin800, weight: 800, style: 'normal' },
        { name: 'OnestExt', data: latinExt800, weight: 800, style: 'normal' },
      ],
    }
  )
}
