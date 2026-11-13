import PDFDocument from 'pdfkit'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Prawdziwy plik PDF generowany na serwerze (zamiast window.print, które na iOS jest zawodne).
// DejaVu Sans: jedna czcionka z pełnym zestawem polskich znaków oraz ⚠ i ✓.
const ACCENT = '#C85A2A'
const INK = '#1C1917'
const MUTED = '#78716C'
const LABEL = '#A8A29E'
const LINE = '#E7E0D8'

const num = (n) => Number(n ?? 0).toLocaleString('pl-PL')

export function buildQuotePdf(quote) {
  const w = quote.wynik ?? {}
  const dir = join(process.cwd(), 'assets/fonts')
  const regular = readFileSync(join(dir, 'DejaVuSans.ttf'))
  const bold = readFileSync(join(dir, 'DejaVuSans-Bold.ttf'))

  const doc = new PDFDocument({ size: 'A4', margin: 42, info: { Title: `Wycena — ${quote.pomieszczenie} — ${quote.miasto}`, Author: 'WyceńTo' } })
  doc.registerFont('R', regular)
  doc.registerFont('B', bold)

  const L = doc.page.margins.left
  const W = doc.page.width - L - doc.page.margins.right
  const bottom = () => doc.page.height - doc.page.margins.bottom - 30
  const ensure = (h) => { if (doc.y + h > bottom()) doc.addPage() }

  const label = (text) => {
    ensure(40)
    doc.moveDown(1.2).font('B').fontSize(8).fillColor(LABEL).text(text.toUpperCase(), L, doc.y, { characterSpacing: 1 })
    doc.moveDown(0.5)
  }

  // Nagłówek
  const top = doc.y
  doc.font('B').fontSize(20).fillColor(INK).text('Wyceń', L, top, { continued: true }).fillColor(ACCENT).text('To')
  const date = new Date(quote.created_at ?? Date.now()).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
  doc.font('B').fontSize(13).fillColor(INK).text(`${quote.pomieszczenie} · ${quote.miasto}`, L, top, { width: W, align: 'right' })
  doc.font('R').fontSize(9).fillColor(MUTED).text(date, L, doc.y + 2, { width: W, align: 'right' })
  const headerBottom = Math.max(doc.y, top + 28) + 10
  doc.moveTo(L, headerBottom).lineTo(L + W, headerBottom).lineWidth(1.5).strokeColor(ACCENT).stroke()
  doc.y = headerBottom

  // Analiza zdjęcia
  label('Analiza zdjęcia')
  const summary = String(w.summary ?? '')
  const sh = doc.font('R').fontSize(10).heightOfString(summary, { width: W - 24 }) + 22
  ensure(sh)
  const sy = doc.y
  doc.roundedRect(L, sy, W, sh, 6).fillAndStroke('#FAF8F5', LINE)
  doc.fillColor('#44403C').font('R').fontSize(10).text(summary, L + 12, sy + 11, { width: W - 24 })
  doc.y = sy + sh

  // Kosztorys
  label('Kosztorys')
  for (const item of w.items ?? []) {
    const range = `${num(item.min)} – ${num(item.max)} ${item.jednostka ?? 'zł'}`
    const nameW = W * 0.55
    const h = Math.max(doc.font('R').fontSize(10).heightOfString(String(item.name), { width: nameW }), 12) + 14
    ensure(h)
    const y = doc.y
    doc.fillColor(INK).font('R').fontSize(10).text(String(item.name), L, y + 7, { width: nameW })
    doc.font('B').fontSize(10).text(range, L + nameW, y + 7, { width: W - nameW, align: 'right' })
    doc.moveTo(L, y + h).lineTo(L + W, y + h).lineWidth(0.5).strokeColor(LINE).stroke()
    doc.y = y + h
  }
  ensure(34)
  const ty = doc.y + 6
  doc.roundedRect(L, ty, W, 26, 5).fill(INK)
  doc.fillColor('#FFFFFF').font('B').fontSize(11).text('Łącznie', L + 10, ty + 8, { width: W / 2 })
  doc.fillColor('#E8A07A').text(`${num(w.total_min)} – ${num(w.total_max)} zł`, L + W / 2, ty + 8, { width: W / 2 - 10, align: 'right' })
  doc.y = ty + 26

  // Dwie kolumny: uwagi / co warto dodać
  const col = (title, items, mark, color, x, width, startY) => {
    doc.font('B').fontSize(8).fillColor(LABEL).text(title.toUpperCase(), x, startY, { width, characterSpacing: 1 })
    let y = startY + 18
    for (const t of items) {
      doc.font('R').fontSize(9.5)
      const h = doc.heightOfString(String(t), { width: width - 18 })
      doc.fillColor(color).text(mark, x, y, { width: 14 })
      doc.fillColor(INK).text(String(t), x + 18, y, { width: width - 18 })
      y += h + 6
    }
    return y
  }
  const uwagi = w.uwagi ?? []
  const dodac = w.co_warto_dodac ?? []
  const colW = (W - 24) / 2
  const estimate = (arr) => arr.reduce((s, t) => s + doc.font('R').fontSize(9.5).heightOfString(String(t), { width: colW - 18 }) + 6, 18)
  doc.moveDown(1.2)
  ensure(Math.max(estimate(uwagi), estimate(dodac)))
  const cy = doc.y
  const y1 = col('Na co uważać', uwagi, '⚠', '#D97706', L, colW, cy)
  const y2 = col('Warto dodać przy okazji', dodac, '✓', '#16A34A', L + colW + 24, colW, cy)
  doc.y = Math.max(y1, y2)

  // Czas realizacji
  if (w.czas_realizacji) {
    ensure(54)
    const by = doc.y + 10
    doc.roundedRect(L, by, W, 40, 6).fillAndStroke('#F5EBE4', LINE)
    doc.fillColor(LABEL).font('B').fontSize(8).text('SZACOWANY CZAS REALIZACJI', L + 12, by + 8, { characterSpacing: 1 })
    doc.fillColor(INK).font('B').fontSize(12).text(String(w.czas_realizacji), L + 12, by + 21)
    doc.y = by + 40
  }

  // Stopka
  ensure(40)
  doc.moveDown(2)
  const fy = doc.y
  doc.moveTo(L, fy).lineTo(L + W, fy).lineWidth(0.5).strokeColor(LINE).stroke()
  doc.font('R').fontSize(8).fillColor(LABEL).text('Wycena wygenerowana przez WyceńTo · wycento.app · Wycena ma charakter orientacyjny i nie stanowi oferty handlowej', L, fy + 8, { width: W, align: 'center' })

  return new Promise((resolve, reject) => {
    const chunks = []
    doc.on('data', (c) => chunks.push(c))
    doc.on('end', () => resolve(Buffer.concat(chunks)))
    doc.on('error', reject)
    doc.end()
  })
}
