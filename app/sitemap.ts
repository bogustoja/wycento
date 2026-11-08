import type { MetadataRoute } from "next";

const BASE = "https://wycento.app";

// Data ręczna: zmieniaj ją TYLKO gdy faktycznie zmieniasz treść stron.
// `new Date()` ustawiało datę builda przy każdym deployu — Google przestaje wtedy ufać lastmod.
const UPDATED = new Date("2026-11-08");

const PATHS = [
  "",
  "/ile-kosztuje-remont-lazienki",
  "/ile-kosztuje-remont-kuchni",
  "/wycena-remontu-pokoju",
  "/wycena-remontu-warszawa",
  "/wycena-remontu-krakow",
  "/ile-kosztuje-remont-mieszkania",
  "/wycena-remontu-wroclaw",
  "/wycena-remontu-gdansk",
  "/en",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: BASE + path,
    lastModified: UPDATED,
  }));
}
