import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";


// Tytuł i opis poniżej to domyślne wartości (strona główna).
// Podstrony, które mają własne `metadata` (np. /ile-kosztuje-remont-lazienki),
// nadpisują title i description, a openGraph/twitter biorą je automatycznie,
// bo NIE ustawiamy tu openGraph.title / twitter.title.
export const metadata: Metadata = {
  metadataBase: new URL("https://wycento.app"),
  title: "Wycena remontu ze zdjęcia w 30 sekund — WyceńTo",
  description:
    "Wrzuć zdjęcie pomieszczenia i podaj miasto. Dostaniesz widełki kosztów robocizny, materiałów i ukrytych kosztów (gruz, chemia, przygotowanie podłoża) dla Twojej okolicy.",
  // './' = każda strona wskazuje SAMĄ SIEBIE jako kanoniczną (Next liczy to względem ścieżki).
  alternates: {
    canonical: "./",
  },
  applicationName: "WyceńTo",
  openGraph: {
    url: "./",
    siteName: "WyceńTo",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full antialiased">
      <head>
        {/* Czcionka Onest leży w /public/fonts (bez zapytań do Google). Preload = szybszy pierwszy widok. */}
        <link rel="preload" href="/fonts/onest-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        {children}
        {/* Vercel Web Analytics — bez cookies, bez danych osobowych, więc nie wymaga banera zgody. */}
        <Analytics />
      </body>
    </html>
  );
}
