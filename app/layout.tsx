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
  description: "Wrzuć zdjęcie, podaj miasto. AI wyceni Twój remont w 30 sekund z prawdziwymi cenami dla Twojej okolicy.",
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
