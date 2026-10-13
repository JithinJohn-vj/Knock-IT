import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import projects from '@/content/projects.json'
import ProjectGallery from '@/components/ProjectGallery'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const p = projects.find((x) => x.slug === params.slug)
  return { title: p ? `${p.title} | Knock-IT Solution & Service` : 'Project' }
}

export default function ProjectPage({ params }: Props) {
  const p = projects.find((x) => x.slug === params.slug)
  if (!p) notFound()
  return (
    <section className="pg on" data-p={`project-${p.slug}`}>
      <div className="ph">
        <img className="bg" src={p.heroImage} alt="" />
        <div className="w">
          <Link className="pbk" href="/projects">&#8592; <span>All projects</span></Link>
          <div className="eb">Project</div>
          <h1>{p.title}</h1>
          <p className="lead">{`${p.locationShort} · ${p.period}`}</p>
        </div>
      </div>
      <div className="sec">
        <div className="w pjo">
          <div className="rv">
            <div className="eb">Project overview</div>
            <h2>{p.title}</h2>
            {p.overview.map((t, i) => (
              <p key={i} className="lead" style={i ? { marginTop: 16 } : undefined}>{t}</p>
            ))}
          </div>
          <aside className="pjf rv">
            <dl>
              {p.facts.map((f) => (
                <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
      <div className="sec gy">
        <div className="w">
          <div className="rv"><div className="eb">By the numbers</div><h2>What the job involved</h2></div>
          <div className="pjn rv">
            {p.numbers.map((n) => (
              <div key={n.label}><b>{n.value}</b><span>{n.label}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div className="sec">
        <div className="w">
          <div className="rv"><div className="eb">How it unfolded</div><h2>{p.phasesTitle}</h2></div>
          <div className="pjp rv">
            {p.phases.map((ph) => (
              <div className="cd" key={ph.title}><small>{ph.date}</small><h3>{ph.title}</h3><p>{ph.text}</p></div>
            ))}
          </div>
          <div className="pjc rv"><b>Challenge</b><span>{p.challenge}</span></div>
        </div>
      </div>
      <div className="sec bk">
        <div className="w">
          <div className="rv">
            <div className="eb">Project gallery</div>
            <h2>On site, day by day</h2>
            <p className="lead">Drag, swipe or use the arrows to browse photos from the daily progress reports.</p>
          </div>
        </div>
        <div className="w rv" style={{ marginTop: 36 }}>
          <ProjectGallery photos={p.gallery} title={p.title} />
        </div>
      </div>
    </section>
  )
}
