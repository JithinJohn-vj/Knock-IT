import Link from 'next/link'
import type { ReactNode } from 'react'
import Hl from './Hl'

// Home page featured project: Knock-IT x Hyundai. Icons are Lucide (ISC license).
const svg = (d: ReactNode, size = 22) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)

const I = {
  network: <><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></>,
  fiber: <><path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" /></>,
  server: <><rect width="20" height="8" x="2" y="2" rx="2" /><rect width="20" height="8" x="2" y="14" rx="2" /><path d="M6 6h.01" /><path d="M6 18h.01" /></>,
  cctv: <><path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" /><path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" /><path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" /><path d="M2 21v-4" /><path d="M7 9h.01" /></>,
  pin: <><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></>,
  calendar: <><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></>,
  handshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></>,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  chart: <><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" /></>,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
}

const HREF = '/projects/hyundai'

const features = [
  { icon: I.network, label: 'Structured Network Cabling' },
  { icon: I.fiber, label: 'Fiber Optic Connectivity' },
  { icon: I.server, label: 'Server Room Setup (2 Locations)' },
  { icon: I.cctv, label: 'CCTV Infrastructure' },
]

const services = [
  { icon: I.network, title: 'Network Infrastructure', text: 'Complete LAN and fiber cabling with professional installation and testing.' },
  { icon: I.server, title: 'Server Room Setup', text: 'Rack installation, cable management and system configuration at 2 locations.' },
  { icon: I.cctv, title: 'CCTV Integration', text: 'Camera cabling, configuration and full system testing for enhanced security.' },
]

const values = [
  { icon: I.shield, title: 'Reliable Infrastructure', text: 'Built for stability and performance' },
  { icon: I.chart, title: 'Scalable Solution', text: 'Supports future business growth' },
  { icon: I.cog, title: 'Professional Implementation', text: 'Industry best practices and quality delivery' },
  { icon: I.users, title: 'Trusted Partnership', text: 'Delivering value together' },
]

function Hyundai({ light }: { light?: boolean }) {
  return (
    <span className={'fph' + (light ? ' fphw' : '')}>
      <img src="/images/logos/l_hyundai.svg" alt="" />
      <b>HYUNDAI</b>
    </span>
  )
}

export default function FeaturedProject() {
  return (
    <div className="sec fpx">
      <div className="w fpg">
        <div className="fpl rv">
          <div className="eb hye">Featured project</div>
          <div className="fpb" role="img" aria-label="Knock-IT and Hyundai">
            <img className="fpk" src="/images/logos/logo.jpg" alt="" />
            <i>{svg(I.x, 22)}</i>
            <Hyundai />
          </div>
          <h2><Hl text="Powering Hyundai's New Office with a Stronger Network" /></h2>
          <p className="fpd"><Hl text="We delivered a complete end-to-end networking solution for Hyundai's new office in King Abdullah Economic City, including structured cabling, fiber connectivity, server room setup and CCTV infrastructure, built for reliability and future growth." /></p>
          <ul className="fpf">
            {features.map((f) => (
              <li key={f.label}><em>{svg(f.icon, 24)}</em><span>{f.label}</span></li>
            ))}
          </ul>
          <div className="fpa">
            <Link className="fpy" href={HREF}>{svg(I.handshake, 26)}<span>View Project Details</span>{svg(I.arrow, 20)}</Link>
            <Link className="fpo" href="/projects"><span>More Projects</span>{svg(I.arrow, 20)}</Link>
          </div>
        </div>

        <div className="fpr rv">
          <div className="fpc">
            <div className="fpm">
              <span className="fpp"><em>{svg(I.pin, 20)}</em><span><b>King Abdullah</b><small>Economic City, KSA</small></span></span>
              <span className="fpp fpdt">{svg(I.calendar, 18)}<span>Jul – Sep 2024</span></span>
            </div>
            <div className="fpn" role="img" aria-label="Knock-IT and Hyundai">
              <img className="fpk" src="/images/logos/logoD.png" alt="" />
              <em>{svg(I.handshake, 52)}</em>
              <u />
              <Hyundai light />
            </div>
            <p className="fpt">A stronger partnership for a smarter workspace</p>
          </div>

          <div className="fps">
            {services.map((s) => (
              <article key={s.title}>
                <em>{svg(s.icon, 24)}</em>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <Link href={HREF} aria-label={`${s.title}: view project`}>{svg(I.arrow, 16)}</Link>
              </article>
            ))}
          </div>

          <div className="fpq">
            {values.map((v) => (
              <div key={v.title}><em>{svg(v.icon, 22)}</em><span><b>{v.title}</b><small>{v.text}</small></span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
