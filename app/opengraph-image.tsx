import { renderOg, type OgText } from './lib/og'

// Obrazek podglądu przy udostępnianiu linku (Facebook, Messenger, WhatsApp, LinkedIn, X).
// Plik w katalogu app/ działa dla wszystkich podstron, które nie mają własnego.
export const alt = 'WyceńTo — wycena remontu ze zdjęcia w 30 sekund'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const PL: OgText = {
  title1: 'Ile naprawdę kosztuje',
  title2: 'Twój remont?',
  sub: 'Wrzuć zdjęcie, podaj miasto — widełki kosztów w 30 sekund.',
  left: 'Robocizna · materiały · ukryte koszty',
  badge: '3 wyceny gratis · wycento.app',
}

export default async function Image() {
  return renderOg(PL)
}
