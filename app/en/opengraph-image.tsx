import { renderOg } from '../lib/og'

export const alt = 'WyceńTo — renovation cost estimate from a photo in 30 seconds'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return renderOg({
    title1: 'How much does your',
    title2: 'renovation really cost?',
    sub: 'Upload a photo, enter your city — a min–max estimate in 30 seconds.',
    left: 'Labour · materials · hidden costs',
    badge: '3 free estimates · wycento.app',
  })
}
