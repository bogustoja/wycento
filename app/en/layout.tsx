import type { Metadata } from "next";

// /en/page.tsx to komponent 'use client' — nie może eksportować metadata,
// dlatego angielskie title/description siedzą tutaj.
export const metadata: Metadata = {
  title: "Renovation cost estimate from a photo — WyceńTo",
  description:
    "Upload a photo of the room and enter your city. Get a min–max estimate for labour, materials and hidden costs like debris removal and surface prep.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    url: "./",
    siteName: "WyceńTo",
    locale: "en_GB",
    type: "website",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
