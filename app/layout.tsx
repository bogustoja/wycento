import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "WyceńTo — Wycena remontu ze zdjęcia",
  description: "Wrzuć zdjęcie, podaj miasto. Wyceniamy Twój remont w 30 sekund z prawdziwymi cenami dla Twojej okolicy.",
  metadataBase: new URL("https://wycento.app"),
  openGraph: {
    title: "WyceńTo — Ile kosztuje Twój remont?",
    description: "Wrzuć zdjęcie pomieszczenia. Wyceniamy remont z prawdziwymi cenami dla Twojego miasta w 30 sekund.",
    url: "https://wycento.app",
    siteName: "WyceńTo",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WyceńTo — Wycena remontu ze zdjęcia",
    description: "Wrzuć zdjęcie pomieszczenia. Wyceniamy remont z prawdziwymi cenami dla Twojego miasta w 30 sekund.",
  },
  keywords: ["wycena remontu", "kosztorys remontu", "ile kosztuje remont", "kalkulator remontu", "wycena łazienki", "wycena kuchni"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
