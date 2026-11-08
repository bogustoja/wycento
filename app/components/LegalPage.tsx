import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

// Wspólny szablon stron prawnych (regulamin, polityka prywatności).
export function LegalPage({ title, effective, current, children }: { title: string; effective: string; current: '/regulamin' | '/prywatnosc'; children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-bg text-ink">
      <SiteHeader cta={{ href: '/', label: 'Strona główna' }} />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">{title}</h1>
        <p className="text-sm text-muted mb-12">Obowiązuje od {effective}</p>
        <div className="space-y-10 text-ink-2 text-sm leading-relaxed [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-3 [&_ul]:space-y-1.5 [&_p+p]:mt-3 [&_a]:text-accent-2 [&_strong]:text-ink [&_a]:underline">
          {children}
        </div>
      </div>

      <SiteFooter current={current} />
    </main>
  )
}
