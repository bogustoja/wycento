// Tekst od użytkownika i od AI wstawiany do HTML raportu PDF musi być zescapowany.
// Bez tego np. miasto "<img src=x onerror=…>" albo podejrzany tekst ze zdjęcia,
// który AI przepisze do wyceny, wykonałby się jako kod na domenie wycento.app.
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
