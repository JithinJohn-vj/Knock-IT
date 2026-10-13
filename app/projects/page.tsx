import type { Metadata } from 'next'
import Link from 'next/link'
import projects from '@/content/projects.json'

export const metadata: Metadata = { title: 'Projects | Knock-IT Solution & Service' }

export default function ProjectsPage() {
  return (
    <section className="pg on" data-p="projects">
      <div className="ph">
        <img className="bg" src={projects[0].heroImage} alt="" />
        <div className="w">
          <div className="eb">Projects</div>
          <h1>Our projects</h1>
          <p className="lead">Select a project to see the full story, from survey to handover.</p>
        </div>
      </div>
      <div className="sec">
        <div className="w">
          <div className="pcg rv">
            {projects.map((p) => (
              <Link key={p.slug} className="pcc" href={`/projects/${p.slug}`}>
                <div className="pci">
                  <img src={p.cardImage} alt={p.title} />
                  <span className="pct">{p.tag}</span>
                </div>
                <div className="pcb">
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <ul>
                    <li>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.6" /></svg>
                      <span>{p.locationShort}</span>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>
                      <span>{p.period}</span>
                    </li>
                  </ul>
                  <span className="pcm">View project <i>&#8594;</i></span>
                </div>
              </Link>
            ))}
            <div className="pcc pcs">
              <div className="pcb">
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>
                <h3>More projects coming soon</h3>
                <p>New case studies will appear here as we complete them.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
