'use client'

export default function HomeEN() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1917]">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E7E0D8]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/en" className="flex items-center gap-0.5">
            <span className="font-serif text-xl font-bold">Wyceń</span>
            <span className="font-serif text-xl font-bold text-[#C85A2A]">To</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">Pricing</a>
            <a href="/" className="text-sm text-[#78716C] hover:text-[#1C1917] transition-colors">🇵🇱 Polski</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = '/login'} className="text-sm text-[#78716C] hover:text-[#1C1917] font-medium">Log in</button>
            <button onClick={() => window.location.href = '/login'} className="bg-[#C85A2A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#B04E24] transition-all shadow-sm">
              Try for free
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#D4C9BE 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF8F5]/60 to-[#FAF8F5]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E7E0D8] rounded-full px-4 py-1.5 mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-xs font-semibold text-[#78716C]">🇬🇧 UK renovation prices</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-serif text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
                How much does<br />your renovation<br />
                <span className="text-[#C85A2A] italic">really cost?</span>
              </h1>
              <p className="text-lg text-[#78716C] leading-relaxed mb-10 max-w-lg">
                Upload a photo of your room, enter your city. AI estimates the renovation cost with real local prices — before you even call a contractor.
              </p>
              <div className="flex items-center gap-6">
                <div><div className="font-serif text-2xl font-bold">30s</div><div className="text-xs text-[#A8A29E]">estimate time</div></div>
                <div className="w-px h-8 bg-[#E7E0D8]" />
                <div><div className="font-serif text-2xl font-bold">±15%</div><div className="text-xs text-[#A8A29E]">accuracy</div></div>
                <div className="w-px h-8 bg-[#E7E0D8]" />
                <div><div className="font-serif text-2xl font-bold">Free</div><div className="text-xs text-[#A8A29E]">to start</div></div>
              </div>
            </div>

            <div className="bg-white border border-[#E7E0D8] rounded-2xl p-7 shadow-xl shadow-[#1C1917]/5">
              <div className="flex gap-3 mb-5">
                <input type="text" placeholder="City (e.g. London)" onClick={() => window.location.href = '/login'} readOnly className="flex-1 bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-4 py-3 text-sm placeholder-[#A8A29E] outline-none cursor-pointer" />
                <select onClick={() => window.location.href = '/login'} className="bg-[#FAF8F5] border border-[#E7E0D8] rounded-xl px-3 py-3 text-sm outline-none cursor-pointer">
                  <option>Bathroom</option>
                  <option>Kitchen</option>
                  <option>Living room</option>
                  <option>Bedroom</option>
                  <option>Whole flat</option>
                </select>
              </div>
              <div onClick={() => window.location.href = '/login'} className="group border-2 border-dashed border-[#E7E0D8] rounded-xl p-8 text-center cursor-pointer hover:border-[#C85A2A] hover:bg-[#FEF8F4] transition-all mb-5">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">📷</div>
                <div className="text-sm font-semibold text-[#44403C] mb-1">Add a photo of the room</div>
                <div className="text-xs text-[#A8A29E]">Click or drag & drop · JPG, PNG, HEIC</div>
              </div>
              <button onClick={() => window.location.href = '/login'} className="w-full bg-[#C85A2A] text-white py-3.5 rounded-xl font-semibold hover:bg-[#B04E24] transition-all shadow-lg shadow-[#C85A2A]/25 mb-4">
                Estimate my renovation →
              </button>
              <div className="flex justify-center gap-5 text-xs text-[#A8A29E]">
                <span>✓ 3 free estimates</span>
                <span>✓ No credit card</span>
                <span>✓ Result in 30s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white border-y border-[#E7E0D8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#C85A2A] uppercase tracking-widest mb-3">How it works</p>
            <h2 className="font-serif text-4xl font-bold">Three steps to your estimate</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '📸', title: 'Take a photo', desc: 'Photograph the room you want to renovate. The more visible, the better the estimate.' },
              { n: '02', icon: '📍', title: 'Enter your location', desc: 'Type your city. Labour rates in London are 30–50% higher than in other areas — we account for that.' },
              { n: '03', icon: '📋', title: 'Get your estimate', desc: 'Detailed cost breakdown: labour, materials, and additional costs included.' },
            ].map((s) => (
              <div key={s.n} className="bg-[#FAF8F5] border border-[#E7E0D8] rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">{s.icon}</div>
                  <span className="font-serif text-4xl font-bold text-[#E7E0D8]">{s.n}</span>
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#C85A2A] uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="font-serif text-4xl font-bold">Simple pricing, no surprises</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white border border-[#E7E0D8] rounded-2xl p-8">
              <div className="text-xs font-semibold text-[#A8A29E] uppercase tracking-widest mb-4">Free</div>
              <div className="flex items-end gap-1 mb-7"><span className="font-serif text-5xl font-bold">£0</span></div>
              <ul className="space-y-3 mb-8">
                {[{ t: '3 estimates per month', ok: true }, { t: 'On-screen view', ok: true }, { t: 'Estimate history', ok: true }, { t: 'PDF report', ok: false }].map(i => (
                  <li key={i.t} className={`flex items-center gap-3 text-sm ${i.ok ? 'text-[#44403C]' : 'text-[#C4BDB8]'}`}>
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i.ok ? 'bg-green-100 text-green-600' : 'bg-[#F2EDE6] text-[#C4BDB8]'}`}>{i.ok ? '✓' : '—'}</span>
                    {i.t}
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = '/login'} className="w-full border border-[#E7E0D8] rounded-xl py-3 text-sm font-semibold hover:bg-[#FAF8F5] transition">Start for free</button>
            </div>
            <div className="bg-[#1C1917] rounded-2xl p-8 relative">
              <div className="absolute top-5 right-5 bg-[#C85A2A] text-white text-xs font-bold px-3 py-1 rounded-full">Popular</div>
              <div className="text-xs font-semibold text-[#C0A882] uppercase tracking-widest mb-4">Pro</div>
              <div className="flex items-end gap-1 mb-7"><span className="font-serif text-5xl font-bold text-white">£9</span><span className="text-[#A8A29E] pb-1">/month</span></div>
              <ul className="space-y-3 mb-8">
                {['Unlimited estimates', 'On-screen view', 'Estimate history', 'PDF report download', 'Priority support'].map(i => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[#D4C9BE]">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C85A2A]/20 border border-[#C85A2A]/40 flex items-center justify-center text-xs font-bold text-[#E8A07A]">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
              <button onClick={() => window.location.href = '/login'} className="w-full bg-[#C85A2A] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#B04E24] transition shadow-lg shadow-[#C85A2A]/20">
                Start — first 3 estimates free
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E7E0D8]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1">
            <span className="font-serif text-lg font-bold">Wyceń</span>
            <span className="font-serif text-lg font-bold text-[#C85A2A]">To</span>
            <span className="text-[#A8A29E] text-sm ml-2">· Made in Poland 🇵🇱</span>
          </div>
          <div className="flex gap-6 text-sm text-[#78716C]">
            <a href="#" className="hover:text-[#1C1917]">Terms</a>
            <a href="#" className="hover:text-[#1C1917]">Privacy</a>
            <a href="mailto:contact@wycento.pl" className="hover:text-[#1C1917]">Contact</a>
            <a href="/" className="hover:text-[#1C1917]">🇵🇱 Polski</a>
          </div>
          <span className="text-sm text-[#A8A29E]">© 2026 WyceńTo</span>
        </div>
      </footer>
    </main>
  )
}
