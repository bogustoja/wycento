import LogoIcon from '../components/LogoIcon'
import { CONTACT_EMAIL } from '../lib/site'

export default function HomeEN() {
  return (
    <main lang="en" className="min-h-screen bg-bg text-ink">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-line">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/en" className="flex items-center gap-0.5">
            <LogoIcon size={28} className="mr-2" />
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-accent-2">To</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-muted hover:text-ink transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-muted hover:text-ink transition-colors">Pricing</a>
            <a href="/" className="text-sm text-muted hover:text-ink transition-colors">🇵🇱 Polski</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="hidden sm:inline text-sm text-muted hover:text-ink font-medium">Log in</a>
            <a href="/login" className="bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-hover transition-all shadow-sm whitespace-nowrap">
              Try for free
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/60 to-bg" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 bg-surface border border-line rounded-full px-4 py-1.5 mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-xs font-semibold text-muted">🇬🇧 UK renovation prices</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                How much does<br />your renovation<br />
                <span className="text-accent-2 italic">really cost?</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-10 max-w-lg">
                Upload a photo of your room, enter your city. We estimate the renovation cost with real local prices — before you even call a contractor.
              </p>
              <div className="flex items-center gap-6">
                <div><div className="font-serif text-2xl font-bold">30s</div><div className="text-xs text-muted">estimate time</div></div>
                <div className="w-px h-8 bg-surface-2" />
                <div><div className="font-serif text-2xl font-bold">min–max</div><div className="text-xs text-muted">price range</div></div>
                <div className="w-px h-8 bg-surface-2" />
                <div><div className="font-serif text-2xl font-bold">Free</div><div className="text-xs text-muted">to start</div></div>
              </div>
            </div>

            <a
              href="/login"
              className="group block bg-surface border border-line rounded-2xl p-7 shadow-xl shadow-black/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-2"
            >
              <div aria-hidden="true">
              <div className="flex gap-3 mb-5">
                <div className="flex-1 bg-bg border border-line rounded-xl px-4 py-3 text-sm text-muted">City (e.g. London)</div>
                <div className="bg-bg border border-line rounded-xl px-3 py-3 text-sm text-ink-2">Bathroom ▾</div>
              </div>
              <div className="border-2 border-dashed border-line rounded-xl p-8 text-center group-hover:border-accent-2 group-hover:bg-surface-2 transition-all mb-5">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">📷</div>
                <div className="text-sm font-semibold text-ink-2 mb-1">Add a photo of the room</div>
                <div className="text-xs text-muted">JPG or PNG · a phone photo is enough</div>
              </div>
              </div>

              <div className="w-full text-center bg-accent text-white py-3.5 rounded-xl font-semibold group-hover:bg-accent-hover transition-all shadow-lg shadow-accent/30 mb-4">
                Estimate my renovation →
              </div>
              <div className="flex justify-center gap-5 text-xs text-muted">
                <span>✓ 3 free estimates</span>
                <span>✓ No credit card</span>
                <span>✓ Result in 30s</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-surface border-y border-line">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="font-serif text-4xl font-bold">Three steps to your estimate</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '📸', title: 'Take a photo', desc: 'Photograph the room you want to renovate. The more visible, the better the estimate.' },
              { n: '02', icon: '📍', title: 'Enter your location', desc: 'Type your city. Labour rates in London are 30–50% higher than in other areas — we account for that.' },
              { n: '03', icon: '📋', title: 'Get your estimate', desc: 'Detailed cost breakdown: labour, materials, and additional costs included.' },
            ].map((s) => (
              <div key={s.n} className="bg-bg border border-line rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-2xl shadow-sm">{s.icon}</div>
                  <span className="font-serif text-4xl font-bold text-white/10">{s.n}</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-accent-2 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="font-serif text-4xl font-bold">Simple pricing, no surprises</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-surface border border-line rounded-2xl p-8">
              <div className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Free</div>
              <div className="flex items-end gap-1 mb-7"><span className="font-serif text-5xl font-bold">£0</span></div>
              <ul className="space-y-3 mb-8">
                {[{ t: '3 free estimates', ok: true }, { t: 'On-screen view', ok: true }, { t: 'Estimate history', ok: true }, { t: 'PDF report', ok: false }].map(i => (
                  <li key={i.t} className={`flex items-center gap-3 text-sm ${i.ok ? 'text-ink-2' : 'text-muted line-through'}`}>
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i.ok ? 'bg-green-500/15 text-green-400' : 'bg-surface-2 text-muted'}`}>{i.ok ? '✓' : '—'}</span>
                    {i.t}
                  </li>
                ))}
              </ul>
              <a href="/login" className="block text-center w-full border border-line rounded-xl py-3 text-sm font-semibold hover:bg-bg transition">Start for free</a>
            </div>
            <div className="bg-surface rounded-2xl p-8 relative">
                            <div className="text-xs font-semibold text-ink-2 uppercase tracking-widest mb-4">Pro</div>
              <div className="flex items-end gap-1 mb-7"><span className="font-serif text-5xl font-bold text-white">£9</span><span className="text-muted pb-1">/month</span></div>
              <ul className="space-y-3 mb-8">
                {['Unlimited estimates', 'On-screen view', 'Estimate history', 'PDF report download', 'Priority support'].map(i => (
                  <li key={i} className="flex items-center gap-3 text-sm text-ink-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-2/15 border border-accent-2/40 flex items-center justify-center text-xs font-bold text-accent-2">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
              <a href="/login" className="block text-center w-full bg-accent text-white rounded-xl py-3 text-sm font-semibold hover:bg-accent-hover transition shadow-lg shadow-accent/30">
                Start — first 3 estimates free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-surface border-t border-line">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            <LogoIcon size={24} className="mr-2" />
            <span className="font-serif text-lg font-bold">Wyceń</span>
            <span className="font-serif text-lg font-bold text-accent-2">To</span>
            <span className="text-muted text-sm ml-2">· Made in Poland 🇵🇱</span>
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <a href="/regulamin" className="hover:text-ink">Terms</a>
            <a href="/prywatnosc" className="hover:text-ink">Privacy</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-ink">Contact</a>
            <a href="/" className="hover:text-ink">🇵🇱 Polski</a>
          </div>
          <span className="text-sm text-muted">© 2026 WyceńTo</span>
        </div>
      </footer>
    </main>
  )
}
