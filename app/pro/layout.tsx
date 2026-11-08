import type { Metadata } from 'next'

// Strona za logowaniem / bez wartości dla Google — własny tytuł zakładki, bez indeksowania.
export const metadata: Metadata = {
  title: 'Plan Pro — WyceńTo',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
