import Link from 'next/link'
import type { ReactNode } from 'react'
import Hl from './Hl'
import ProjectSlider from './ProjectSlider'
import projects from '@/content/projects.json'

// Home page featured project: Knock-IT x Hyundai. Icons are Lucide (ISC license).
const svg = (d: ReactNode, size = 22) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)

const I = {
  network: <><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></>,
  server: <><rect width="20" height="8" x="2" y="2" rx="2" /><rect width="20" height="8" x="2" y="14" rx="2" /><path d="M6 6h.01" /><path d="M6 18h.01" /></>,
  cctv: <><path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" /><path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" /><path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" /><path d="M2 21v-4" /><path d="M7 9h.01" /></>,
  pin: <><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></>,
  calendar: <><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></>,
  building: <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></>,
  handshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></>,
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  bars: <><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></>,
  gear: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
}

const HREF = '/projects/hyundai'
const gallery = projects.find((p) => p.slug === 'hyundai')?.gallery ?? []

const features = [
  { icon: I.network, label: 'Networking & Structured Cabling' },
  { icon: I.server, label: 'Server Rooms (2 Locations)' },
  { icon: I.cctv, label: 'CCTV Infrastructure' },
]

const info = [
  { icon: I.calendar, label: 'Project Period', value: 'Jul – Sep 2024' },
  { icon: I.building, label: 'Project Type', value: 'Commercial Office' },
  { icon: I.pin, label: 'Location', value: 'King Abdullah Economic City' },
]

const values = [
  { icon: I.shield, label: 'Reliable Connectivity' },
  { icon: I.bars, label: 'Scalable Infrastructure' },
  { icon: I.gear, label: 'Professional Implementation' },
  { icon: I.users, label: 'Built for Future Growth' },
]

export default function FeaturedProject() {
  return (
    <div className="sec kfp">
      <div className="w">
        <div className="eb hye kfe rv">Featured project</div>
        <div className="kfg">
          <div className="kfl rv">
            <div className="fpc">
              <div className="fpm">
                <span className="fpp"><em>{svg(I.pin, 20)}</em><span><b>King Abdullah</b><small>Economic City, KSA</small></span></span>
                <span className="fpp fpdt">{svg(I.calendar, 18)}<span>Jul – Sep 2024</span></span>
              </div>
              <div className="fpn" role="img" aria-label="Knock-IT and Hyundai">
                <img className="fpk" src="/images/logos/logoD.png" alt="" />
                <em>{svg(I.handshake, 52)}</em>
                <u />
                <span className="fph fphw"><img src="/images/logos/l_hyundai.svg" alt="" /><b>HYUNDAI</b></span>
              </div>
              <p className="fpt">A stronger partnership for a smarter workspace</p>
            </div>

            <h2><Hl text="End-to-End Network Infrastructure for Hyundai's New Office" word="Hyundai's New Office" /></h2>
            <p className="kfd">We delivered a complete networking solution for Hyundai&rsquo;s new office in King Abdullah Economic City, including structured cabling, fiber connectivity, server room setup and CCTV, built for a secure, scalable and high-performance workspace.</p>

            <dl className="kfi">
              {info.map((x) => (
                <div key={x.label}><em>{svg(x.icon, 20)}</em><span><dt>{x.label}</dt><dd>{x.value}</dd></span></div>
              ))}
            </dl>

            <div className="kfa">
              <Link className="kfy" href={HREF}><span>Explore the project</span><i>{svg(I.arrow, 20)}</i></Link>
              <Link className="kfv" href="/projects"><span>View all projects</span>{svg(I.arrow, 18)}</Link>
            </div>
          </div>

          <div className="kfr rv">
            <div className="kfs">
              <ProjectSlider photos={gallery} captions={false} />
              <span className="kfb"><i />Completed</span>
              <div className="kfo">
                <div>
                  <small>Project overview</small>
                  <h3>Modern Network Infrastructure for a Smarter Workspace</h3>
                </div>
                <p>A reliable and future-ready network setup to support Hyundai&rsquo;s growing operations in KSA.</p>
              </div>
            </div>

            <div className="kfq">
              {values.map((v) => (
                <div key={v.label}><em>{svg(v.icon, 34)}</em><b>{v.label}</b></div>
              ))}
            </div>

            <ul className="kff">
              {features.map((f) => (
                <li key={f.label}><em>{svg(f.icon, 22)}</em><b>{f.label}</b></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
