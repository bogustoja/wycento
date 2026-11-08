import Brand from './Brand'

type Link = { href: string; label: string }

// Wspólny nagłówek: logo po lewej, menu w „pigułce” po prawej.
// `cta` = pomarańczowy przycisk (np. na stronach SEO), domyślnie „Zaloguj się”.
export default function SiteHeader({
  links = [],
  cta = { href: '/login', label: 'Zaloguj się' },
  sticky = true,
}: {
  links?: Link[]
  cta?: Link | null
  sticky?: boolean
}) {
  return (
    <header className={`${sticky ? 'sticky top-0' : 'relative'} z-50 border-b border-line bg-bg/80 backdrop-blur-md`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Brand />
        <nav aria-label="Menu" className="flex min-w-0 items-center gap-1 rounded-full border border-line bg-white/[0.04] p-1 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden rounded-full px-4 py-2 text-ink-2 transition-colors hover:text-ink md:inline-block">
              {l.label}
            </a>
          ))}
          {cta && (
            <a href={cta.href} className="min-w-0 truncate whitespace-nowrap rounded-full bg-ink px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm text-bg transition-colors hover:bg-white hover:text-bg">
              {cta.label}
            </a>
          )}
        </nav>
      </div>
    </header>
  )
}
