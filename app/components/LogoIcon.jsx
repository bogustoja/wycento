// Logo WyceńTo: dom z ptaszkiem („wycenione”). To samo co app/icon.svg.
export default function LogoIcon({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={`flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#C85A2A" />
      <path d="M12 31 L32 14 L52 31" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 28 V48 H45 V28" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
      <path d="M25 38 L30.5 43 L40 33" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
