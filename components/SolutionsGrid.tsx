import Link from 'next/link'
import type { ReactNode } from 'react'
import data from '@/content/solutions.json'

// Home "Solutions": numbered solution cards on the left, server-room showcase panel on the right.
// Icons are Lucide (ISC license).
const svg = (d: ReactNode, size = 24, sw = 1.8) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)

const I = {
  shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  network: <><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></>,
  headset: <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  calendar: <><path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></>,
  star: <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
}

// Short card copy, in the same order as content/solutions.json.
const blurbs = [
  'Reliable and future-ready physical and network infrastructure.',
  'Proactive monitoring for a smooth and secure network.',
  'Advanced security for people, assets and data.',
  'Reliable email and server solutions for your business.',
  'Scalable cloud solutions with secure data recovery.',
  'Smarter ways to connect and work together.',
  'Expert guidance and seamless system integration.',
  'Quality hardware and cost-effective print management.',
]

const chips = [
  { k: 'a', icon: I.shield, label: 'Secure Solutions' },
  { k: 'b', icon: I.cloud, label: 'Reliable Infrastructure' },
  { k: 'c', icon: I.network, label: 'Scalable Networks' },
  { k: 'd', icon: I.headset, label: 'Dedicated Support' },
]

const stats = [
  { icon: I.calendar, value: '5+', label: 'Years of service' },
  { icon: I.users, value: '15+', label: 'Trained team members' },
  { icon: I.shield, value: '9 yrs', label: 'HP Gold Partner' },
  { icon: I.star, value: 'Trusted', label: 'IT Partner' },
]

const { solutions } = data
const n = solutions.length

export default function SolutionsGrid() {
  return (
    <div className="sec sgx">
      <div className="w sgg">
        <div className="sgl">
          <div className="sgh rv">
            <div className="sge"><i aria-hidden="true">{'//'}</i>Solutions</div>
            <h2>Everything your IT needs, from <em>one trusted partner.</em></h2>
            <p>Design, deployment and support across networks, security, email and print, all under one roof.</p>
          </div>
          <div className="sgc rv">
            {solutions.map((x, k) => (
              <Link key={x.title} className={'sgk sgk' + k + (k === 0 ? ' top' : '')} href={k === n - 1 ? '/products' : `/solutions?hl=${k}`}>
                <em className="sgi" dangerouslySetInnerHTML={{ __html: x.icon }} />
                <span className="sgb">
                  <span className="sgn"><small>0{k + 1}</small>{k === 0 && <mark>Most Popular</mark>}</span>
                  <b>{x.title}</b>
                  <span className="sgd">{blurbs[k]}</span>
                </span>
                <i className="sga">{svg(I.arrow, 18, 2.2)}</i>
              </Link>
            ))}
          </div>
        </div>

        <div className="sgp rv">
          <img loading="lazy" decoding="async" src="/images/racks.jpg" alt="Server racks in a data room" />
          <i className="sgo" aria-hidden="true" />
          <div className="sgs" aria-hidden="true"><span>Your IT</span><span>Our Priority</span></div>
          <ul className="sgf">
            {chips.map((c) => (
              <li key={c.k} className={'sgf' + c.k}><em>{svg(c.icon, 22, 2)}</em><span>{c.label}</span></li>
            ))}
          </ul>
          <ul className="sgt">
            {stats.map((s) => (
              <li key={s.label}>{svg(s.icon, 26, 1.6)}<b>{s.value}</b><span>{s.label}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
