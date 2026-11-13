// Otwiera widok wydruku/PDF. Wbudowane przeglądarki iOS (np. z Google/Translate)
// blokują window.open, więc przy blokadzie drukujemy z ukrytego iframe w tej samej karcie.
// Wywoływać WYŁĄCZNIE bezpośrednio z handlera kliknięcia (przed jakimkolwiek await).
export function openPrintHtml(html) {
  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
    return
  }

  const old = document.getElementById('wycento-print-frame')
  if (old) old.remove()

  const frame = document.createElement('iframe')
  frame.id = 'wycento-print-frame'
  frame.setAttribute('aria-hidden', 'true')
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;'
  frame.srcdoc = html // skrypt window.print() w HTML odpala się po załadowaniu
  document.body.appendChild(frame)
}
