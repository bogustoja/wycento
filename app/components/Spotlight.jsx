'use client'

import { useEffect, useRef } from 'react'

// Pomarańczowe światło, które podąża za myszką po sekcji-rodzicu.
// Zmienia tylko zmienne CSS (bez re-renderów Reacta), więc nie obciąża strony.
// Na telefonie (brak myszki) i przy wyłączonym ruchu stoi w miejscu.
export default function Spotlight({ x = 30, y = 20 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    function onMove(e) {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = parent.getBoundingClientRect()
        el.style.setProperty('--sx', `${((e.clientX - r.left) / r.width) * 100}%`)
        el.style.setProperty('--sy', `${((e.clientY - r.top) / r.height) * 100}%`)
      })
    }
    parent.addEventListener('pointermove', onMove)
    return () => {
      parent.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        '--sx': `${x}%`,
        '--sy': `${y}%`,
        background: 'radial-gradient(600px circle at var(--sx) var(--sy), rgb(200 90 42 / 0.18), transparent 60%)',
      }}
    />
  )
}
