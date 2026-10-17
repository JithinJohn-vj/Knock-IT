'use client'
import { useEffect, useState, type ReactNode } from 'react'
import partners from '@/content/partners.json'

// Partner carousel: glass cards on glowing pedestals, active card centred.
// Icons are Lucide (ISC license).
const svg = (d: ReactNode, size = 24, sw = 1.8) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)

const perks = [
  { label: 'Authorized Partnerships', icon: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></> },
  { label: 'Genuine Products', icon: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></> },
  { label: 'Expert Support', icon: <><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></> },
  { label: 'Proven Reliability', icon: <><path d="M6 3h12l4 6-10 13L2 9Z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></> },
]

// Badge icon and tint for each partnership level.
const levels: Record<string, { k: string; icon: ReactNode }> = {
  'Gold Partner': { k: 'gold', icon: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></> },
  'Silver Partner': { k: 'silver', icon: <><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" /><path d="M11 12 5.12 2.2" /><path d="m13 12 5.88-9.8" /><path d="M8 7h8" /><circle cx="12" cy="17" r="5" /></> },
  'Premium Partner': { k: 'premium', icon: <><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" /><path d="M5 21h14" /></> },
  'Authorized Reseller': { k: 'auth', icon: <><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></> },
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '')

export default function Partners() {
  const n = partners.length
  const [i, setI] = useState(0)
  const go = (x: number) => setI(((x % n) + n) % n)

  // Always auto-advance; a manual move restarts the countdown because it changes i.
  useEffect(() => {
    const t = setTimeout(() => setI((i + 1) % n), 4000)
    return () => clearTimeout(t)
  }, [i, n])

  return (
    <>
      <ul className="pnk rv">
        {perks.map((p) => (
          <li key={p.label}>{svg(p.icon, 30, 1.6)}<span>{p.label}</span></li>
        ))}
      </ul>
      <div className="pnc rv" dir="ltr">
        <div className="pnt" aria-roledescription="carousel" aria-label="Our partners">
          {partners.map((p, k) => {
            // Signed distance from the active card, wrapped so cards sit on both sides.
            const d = ((k - i + n + Math.floor(n / 2)) % n) - Math.floor(n / 2)
            return (
              <div
                key={p.name}
                className={'pnq' + (d === 0 ? ' on' : '') + (Math.abs(d) > 2 ? ' far' : '')}
                style={{ '--d': d, '--a': Math.abs(d), zIndex: 10 - Math.abs(d) } as React.CSSProperties}
                onClick={() => d && go(k)}
                aria-hidden={d !== 0}
              >
                <div className="pnf">
                  <span className={'pnl pnl-' + slug(p.name)}>
                    {p.logo ? <img loading="lazy" decoding="async" src={p.logo} alt={p.name} /> : <b>{p.name === 'Lexmark' && <i aria-hidden="true" />}{p.name.toLowerCase() === 'brother' ? 'brother' : p.name}</b>}
                  </span>
                  <small className={'pnv pnv-' + (levels[p.level]?.k ?? 'auth')}>{svg((levels[p.level] ?? levels['Authorized Reseller']).icon, 15, 2)}<span>{p.level}</span></small>
                  {svg(<path d="m9 18 6-6-6-6" />, 18, 2.2)}
                </div>
              </div>
            )
          })}
        </div>
        <button type="button" className="pna p" onClick={() => go(i - 1)} aria-label="Previous partner">{svg(<path d="m15 18-6-6 6-6" />, 24, 2.4)}</button>
        <button type="button" className="pna n" onClick={() => go(i + 1)} aria-label="Next partner">{svg(<path d="m9 18 6-6-6-6" />, 24, 2.4)}</button>
        <div className="pnd">
          {partners.map((p, k) => (
            <button key={p.name} type="button" className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`${p.name}`} />
          ))}
        </div>
      </div>
    </>
  )
}
