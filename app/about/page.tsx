import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata: Metadata = { title: 'About | Knock-IT Solution & Service' }

// Icons are Lucide (ISC license).
const svg = (d: ReactNode, size = 24) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)

const I = {
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  gear: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>,
  award: <><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /><circle cx="12" cy="8" r="6" /></>,
  pin: <><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></>,
  gem: <><path d="M6 3h12l4 6-10 13L2 9Z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></>,
  headset: <><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /></>,
  handshake: <><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" /><path d="M3 4h8" /></>,
  target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
  eye: <><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></>,
  bars: <><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></>,
  up: <><path d="M7 7h10v10" /><path d="M7 17 17 7" /></>,
}

const stats = [
  { icon: I.users, value: '15+', label: 'Trained Staff' },
  { icon: I.gear, value: '5+', label: 'Years of Service' },
  { icon: I.award, value: '9', label: 'Years as HP Gold Partner' },
  { icon: I.pin, value: 'KSA', label: 'Nationwide Service' },
]

const pillars = [
  { icon: I.gem, title: 'Quality Products', text: 'Branded IT hardware and office equipment', tone: 'b' },
  { icon: I.headset, title: 'Expert Support', text: 'Professional installation and after-sales service', tone: 'y' },
  { icon: I.gear, title: 'Complete Solutions', text: 'From supply to setup and maintenance', tone: 'b' },
  { icon: I.handshake, title: 'Long-term Partnership', text: 'Trusted by businesses across the Kingdom', tone: 'y' },
]

const story = [
  { icon: I.target, title: 'Our Mission', text: 'To deliver reliable IT solutions and services that help businesses work smarter and grow.', tone: 'y' },
  { icon: I.eye, title: 'Our Vision', text: 'To be a leading IT solutions provider in Saudi Arabia, known for trust, quality and customer satisfaction.', tone: 'b' },
  { icon: I.bars, title: 'Our Values', text: 'Integrity, customer focus, quality service and long-term partnerships.', tone: 'y' },
]

export default function Page() {
  return (
    <section className="pg on abs ab2" data-p="about">
      <div className="abhero">
        <img className="abhbg" fetchPriority="high" src="/images/contact-reception.jpg" alt="" />
        <div className="w abhg">
          <div className="abhl rv">
            <div className="eb abe">About us</div>
            <h1>Your trusted <em>IT partner</em> in Saudi Arabia.</h1>
            <p className="lead">Knock-IT Solution &amp; Service provides complete IT infrastructure solutions, office equipment and managed services to businesses across Saudi Arabia. We combine quality products, expert support and long-term partnerships to help your business grow.</p>
            <div className="abha">
              <Link className="abby" href="/contact"><span>Request a quote</span>{svg(I.up, 18)}</Link>
              <Link className="abbo" href="/solutions">Our solutions</Link>
            </div>
          </div>
          <ul className="abhs rv">
            {stats.map((s) => (
              <li key={s.label}><em>{svg(s.icon, 26)}</em><span><b>{s.value}</b><small>{s.label}</small></span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="abft">
        <ul className="w">
          {pillars.map((p) => (
            <li key={p.title} className="rv"><em className={p.tone}>{svg(p.icon, 26)}</em><span><b>{p.title}</b><small>{p.text}</small></span></li>
          ))}
        </ul>
      </div>

      <div className="absy">
        <div className="w absg">
          <div className="absl rv">
            <div className="eb abe">Our story</div>
            <h2>Built on trust. <em>Driven by service<u>.</u></em></h2>
            <p>Knock-IT Solution &amp; Service was established with a simple goal: to provide reliable IT solutions and genuine support to businesses in Saudi Arabia. Over the years, we have grown into a trusted partner, delivering hardware, managed services and complete IT infrastructure solutions for offices, organizations and commercial clients across the Kingdom.</p>
            <Link className="abbp" href="/projects"><span>Our projects</span>{svg(I.up, 16)}</Link>
          </div>
          <div className="absm rv">
            {story.map((c) => (
              <div key={c.title}><em className={c.tone}>{svg(c.icon, 26)}</em><span><b>{c.title}</b><small>{c.text}</small></span></div>
            ))}
          </div>
          <figure className="absp rv">
            <img loading="lazy" decoding="async" src="/images/projects/hyundai/site-18.webp" alt="Knock-IT engineer fitting a network cabinet" />
            <figcaption><em>{svg(I.users, 22)}</em><span>A dedicated team supporting your business.</span></figcaption>
          </figure>
        </div>
      </div>

      <div className="abpw">
        <div className="w rv">
          <div className="abpn"><h3>Our partners</h3><div className="abqg"><div className="abq"><i><img loading="lazy" decoding="async" src="/images/logos/l_hp.svg" alt="" /></i><div><b>HP</b><span>Gold Partner</span></div></div><div className="abq"><i><img loading="lazy" decoding="async" src="/images/logos/l_canon.svg" alt="" /></i><div><b>Canon</b><span>Authorized Reseller</span></div></div><div className="abq"><i>L</i><div><b>Lexmark</b><span>Premium Partner</span></div></div><div className="abq"><i><img loading="lazy" decoding="async" src="/images/logos/l_samsung.svg" alt="" /></i><div><b>Samsung</b><span>Silver Partner</span></div></div><div className="abq"><i><img loading="lazy" decoding="async" src="/images/logos/l_epson.svg" alt="" /></i><div><b>Epson</b><span>Authorized Reseller</span></div></div><div className="abq"><i>B</i><div><b>Brother</b><span>Authorized Reseller</span></div></div></div></div>
        </div>
      </div>

      <div className="abw"><div className="w"><div className="abc rv"><div className="abc1"><div className="eb abe">What we stand for</div><h2>Our values and expertise</h2><div className="abvg"><div className="abv"><i style={{background:"#f5c518"}}><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0012 3z"></path></svg></i><b>Innovation</b><span>We embrace new ideas and solutions.</span></div><div className="abv"><i style={{background:"#dbe7fb"}}><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"></path><path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6"></path></svg></i><b>Quality</b><span>We deliver reliable and high-quality services.</span></div><div className="abv"><i style={{background:"#f5c518"}}><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="3"></circle><circle cx="5" cy="10" r="2.2"></circle><circle cx="19" cy="10" r="2.2"></circle><path d="M6 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M1 19c0-2 1.6-3.5 4-3.5M23 19c0-2-1.6-3.5-4-3.5"></path></svg></i><b>Collaboration</b><span>We work together for greater results.</span></div><div className="abv"><i style={{background:"#dbe7fb"}}><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"></path></svg></i><b>Attitude &amp; Win</b><span>We stay positive and aim for success with our clients.</span></div></div></div><div className="abc2"><div className="eb abe">Fields of expertise</div><ul className="abf"><li><i><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"></path></svg></i><span>Selling and distribution of office supplies, consumables and stationery</span></li><li><i><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"></path></svg></i><span>Selling and distribution of technology products</span></li><li><i><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"></path></svg></i><span>Selling and distribution of IT systems</span></li><li><i><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"></path></svg></i><span>Selling and distribution of consumables</span></li><li><i><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10"></path></svg></i><span>Managed Print Services (MPS)</span></li></ul></div><div className="abc3"><div className="eb abe">Also supplying</div><div className="abpl"><span className="abp"><i><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4"></rect><path d="M12 8v13M5 12v9h14v-9M12 8c-2-4-6-3-5 0M12 8c2-4 6-3 5 0"></path></svg></i>Corporate gifts</span><span className="abp"><i><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 5v10l-9 5-9-5V7z"></path><path d="M3 7l9 5 9-5M12 12v10"></path></svg></i>Packaging and pre-printing</span><span className="abp"><i><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l1-5L16 4l4 4L9 19z"></path><path d="M14 6l4 4"></path></svg></i>Branding</span><span className="abp"><i><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path><path d="M8 14h2M12 14h2M16 14h0"></path></svg></i>Rentals</span><span className="abp"><i><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10a5 5 0 015 5v2a3 3 0 01-5 2l-1-1H8l-1 1a3 3 0 01-5-2v-2a5 5 0 015-5z"></path><path d="M8 11v3M6.5 12.5h3M16 11.5h.01M18 13.5h.01"></path></svg></i>Gaming hardware</span></div></div></div><div className="pjc abpq"><b>PQ</b><span>We produce PQ (Perfect Quality) ink and toner cartridges, compatible with all types of printers on the market.</span></div></div></div>
    </section>
  )
}
