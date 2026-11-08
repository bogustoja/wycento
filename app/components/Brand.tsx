import LogoIcon from './LogoIcon'

// Logo + napis „WyceńTo”. Jedno miejsce dla wszystkich nagłówków i stopek.
export default function Brand({ size = 30, href = '/' }: { size?: number; href?: string }) {
  return (
    <a href={href} className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-ink hover:text-ink">
      <LogoIcon size={size} />
      <span>
        Wyceń<span className="text-accent-2">To</span>
      </span>
    </a>
  )
}
