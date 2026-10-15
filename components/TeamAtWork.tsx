'use client'
import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'

// Home "Our Team at Work": intro on the left, stacked photo card deck on the right.
// Icons are Lucide (ISC license).
const svg = (d: ReactNode, size = 24, sw = 1.8) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)

const I = {
  network: <><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 7.5v4M12 11.5 6.5 16M12 11.5l5.5 4.5" /></>,
  server: <><rect width="20" height="8" x="2" y="2" rx="2" /><rect width="20" height="8" x="2" y="14" rx="2" /><path d="M6 6h.01M6 18h.01M10 6h8M10 18h8" /></>,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  monitor: <><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  gear: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>,
  headset: <><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /></>,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  next: <path d="m9 18 6-6-6-6" />,
  prev: <path d="m15 18-6-6 6-6" />,
}

const tiles = [
  { icon: I.network, label: 'Network Installation' },
  { icon: I.server, label: 'Server Setup' },
  { icon: I.shield, label: 'Cabling & Termination' },
  { icon: I.monitor, label: 'On-site IT Support' },
]

const perks = [
  { icon: I.users, label: 'Experienced Engineers' },
  { icon: I.gear, label: 'On-time Delivery' },
  { icon: I.headset, label: 'Dedicated Support' },
]

const slides = [
  { image: '/images/cab.jpg', title: 'Cabinet fitting', text: 'Professional rack installation' },
  { image: '/images/lad.jpg', title: 'Cabling on site', text: 'Running and organizing network cables' },
  { image: '/images/mess.jpg', title: 'Termination & routing', text: 'Cable termination and neat routing' },
  { image: '/images/rack.jpg', title: 'Rack complete', text: 'Clean and organized setup' },
  { image: '/images/projects/hyundai/site-19.webp', title: 'Ceiling cabling', text: 'Pulling LAN cable through the office ceiling' },
]

const pad = (n: number) => String(n).padStart(2, '0')

export default function TeamAtWork() {
  const n = slides.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = (x: number) => setI(((x % n) + n) % n)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) setPaused(true)
  }, [])
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((i + 1) % n), 5000)
    return () => clearTimeout(t)
  }, [i, n, paused])

  return (
    <div className="sec twk">
      <div className="twbg" aria-hidden="true"><i className="twy1" /><i className="twy2" /><i className="twdots" /></div>
      <div className="w twgr">
        <div className="twl rv">
          <div className="twe"><u />Professional IT infrastructure</div>
          <h2>Our Team<br />at <em>Work</em></h2>
          <p>Hands-on engineers delivering reliable IT infrastructure solutions across Jeddah and the Kingdom.</p>
          <ul className="twt">
            {tiles.map((t) => (
              <li key={t.label}><em>{svg(t.icon, 26)}</em><span>{t.label}</span></li>
            ))}
          </ul>
          <div className="twc">
            <Link className="twcta" href="/contact"><span>Get in touch</span><i>{svg(I.arrow, 20, 2.4)}</i></Link>
            <div className="twm">Same commitment.<b>Stronger businesses.</b></div>
          </div>
          <ul className="twp">
            {perks.map((p) => (
              <li key={p.label}>{svg(p.icon, 26, 1.6)}<span>{p.label}</span></li>
            ))}
          </ul>
        </div>

        <div className="twr rv" dir="ltr" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="twd" aria-roledescription="carousel" aria-label="Our team at work">
            {slides.map((s, k) => {
              const d = (k - i + n) % n
              return (
                <figure key={s.image} className={'twf' + (d === 0 ? ' on' : '')} style={{ '--d': d, zIndex: n - d } as React.CSSProperties} aria-hidden={d !== 0} onClick={() => d && go(k)}>
                  <img loading="lazy" decoding="async" src={s.image} alt={d === 0 ? s.title : ''} />
                  <span className="twn">{pad(k + 1)}</span>
                  <figcaption>
                    <small><u />{pad(k + 1)}<i> / {pad(n)}</i></small>
                    <b>{s.title}</b>
                    <span>{s.text}</span>
                  </figcaption>
                  {d === 0 && (
                    <button type="button" className="twx" onClick={(e) => { e.stopPropagation(); go(i + 1) }} aria-label="Next photo">{svg(I.next, 22, 2.4)}</button>
                  )}
                </figure>
              )
            })}
          </div>
          <div className="twnav">
            <button type="button" className="twb o" onClick={() => go(i - 1)} aria-label="Previous photo">{svg(I.prev, 22, 2.2)}</button>
            <div className="twdash">
              {slides.map((s, k) => (
                <button key={s.image} type="button" className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`Photo ${k + 1} of ${n}`} />
              ))}
            </div>
            <button type="button" className="twb" onClick={() => go(i + 1)} aria-label="Next photo">{svg(I.next, 22, 2.2)}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
