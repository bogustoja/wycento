import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

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
    <html lang="pl" className={`${geistSans.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
