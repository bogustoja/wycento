import Brand from './Brand'
import { SEO_LINKS } from './seoLinks'
import { CONTACT_EMAIL } from '../lib/site'

// Wspólna stopka: logo, ceny remontów (linki wewnętrzne dla SEO), regulamin i kontakt.
export default function SiteFooter({ current }: { current?: string }) {
  const links = SEO_LINKS.filter((l) => l.href !== current)
  return (
    <footer className="mt-auto border-t border-line bg-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr]">
        <div className="flex flex-col gap-3">
          <Brand size={26} />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Wycena remontu ze zdjęcia, z cenami dla Twojego miasta. Zrobione w Polsce.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Ceny remontów 2026</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-2 transition-colors hover:text-accent-2">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">WyceńTo</h2>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="/regulamin" aria-current={current === '/regulamin' ? 'page' : undefined} className="text-ink-2 transition-colors hover:text-accent-2">Regulamin</a></li>
              <li><a href="/prywatnosc" aria-current={current === '/prywatnosc' ? 'page' : undefined} className="text-ink-2 transition-colors hover:text-accent-2">Polityka prywatności</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="text-ink-2 transition-colors hover:text-accent-2">{CONTACT_EMAIL}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">© 2026 WyceńTo</div>
      </div>
    </footer>
  )
}
