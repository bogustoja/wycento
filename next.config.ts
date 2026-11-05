import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // wycento.vercel.app -> wycento.app (308), żeby Google nie widział dwóch kopii strony.
        // /api/ i /auth/ są wyłączone: webhook Stripe i linki z maili Supabase
        // mogą wskazywać na vercel.app, a Stripe NIE podąża za przekierowaniami.
        source: "/:path((?!api/|auth/).*)",
        has: [{ type: "host", value: "wycento.vercel.app" }],
        destination: "https://wycento.app/:path",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
