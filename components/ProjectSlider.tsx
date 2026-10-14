'use client'
import { useEffect, useState } from 'react'

type Photo = { image: string; title: string; date: string }

// Auto-rotating photo slider for the featured project. Photos load lazily: a slide's
// image is only rendered once it is current or next up.
export default function ProjectSlider({ photos }: { photos: Photo[] }) {
  const n = photos.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [seen, setSeen] = useState(() => new Set([0, 1 % n]))

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) setPaused(true)
  }, [])

  useEffect(() => {
    setSeen((s) => (s.has(i) && s.has((i + 1) % n) ? s : new Set([...s, i, (i + 1) % n])))
    if (paused) return
    const t = setTimeout(() => setI((i + 1) % n), 5000)
    return () => clearTimeout(t)
  }, [i, n, paused])

  const go = (x: number) => setI(((x % n) + n) % n)

  return (
    <div
      className="fsl2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Project photos"
    >
      {photos.map((p, k) => (
        <figure key={p.image} className={k === i ? 'on' : ''} aria-hidden={k !== i}>
          {seen.has(k) && <img src={p.image} alt={p.title} decoding="async" />}
          <figcaption><b>{p.title}</b><small>{p.date}</small></figcaption>
        </figure>
      ))}
      <button type="button" className="fslp" onClick={() => go(i - 1)} aria-label="Previous photo">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button type="button" className="fsln" onClick={() => go(i + 1)} aria-label="Next photo">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>
      <div className="fsld">
        {photos.map((p, k) => (
          <button key={p.image} type="button" className={k === i ? 'on' : ''} onClick={() => go(k)} aria-label={`Photo ${k + 1} of ${n}`} />
        ))}
      </div>
    </div>
  )
}
