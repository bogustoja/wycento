import LogoIcon from './LogoIcon'

// Wspólny szablon stron prawnych (regulamin, polityka prywatności).
export function LegalPage({ title, effective, current, children }: { title: string; effective: string; current: '/regulamin' | '/prywatnosc'; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <nav className="bg-white border-b border-[#E7E0D8]">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <a href="/" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">← Strona główna</a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-[#78716C] mb-12">Obowiązuje od {effective}</p>
        <div className="space-y-10 text-[#44403C] text-sm leading-relaxed [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1C1917] [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mt-3 [&_ul]:space-y-1.5 [&_p+p]:mt-3 [&_a]:text-[#C85A2A] [&_a]:underline">
          {children}
        </div>
      </div>

      <footer className="border-t border-[#E7E0D8] mt-8">
        <div className="max-w-4xl mx-auto px-6 py-6 flex gap-6 text-sm text-[#78716C]">
          <a href="/regulamin" aria-current={current === '/regulamin' ? 'page' : undefined} className="hover:text-[#1C1917] transition-colors">Regulamin</a>
          <a href="/prywatnosc" aria-current={current === '/prywatnosc' ? 'page' : undefined} className="hover:text-[#1C1917] transition-colors">Prywatność</a>
          <a href="/" className="hover:text-[#1C1917] transition-colors">Strona główna</a>
        </div>
      </footer>
    </main>
  )
}
