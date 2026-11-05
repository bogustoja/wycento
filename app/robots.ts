import type { MetadataRoute } from "next";

// Boty AI (GPTBot, ClaudeBot, PerplexityBot) celowo NIE są blokowane — to część GEO.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // "$" = dokładnie ta ścieżka. Bez niego "/wycena" zablokowałoby też /wycena-remontu-warszawa itd.
        disallow: ["/api/", "/auth/", "/dashboard", "/wycena$", "/pro$", "/login$"],
      },
    ],
    sitemap: "https://wycento.app/sitemap.xml",
  };
}
