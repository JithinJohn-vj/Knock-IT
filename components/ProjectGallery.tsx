'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

type Photo = { image: string; title: string; date: string }

export default function ProjectGallery({ photos, title }: { photos: Photo[]; title: string }) {
  const n = photos.length
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [drag, setDrag] = useState(0)
  const view = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const moved = useRef(false)
  const startX = useRef(0)
  const dx = useRef(0)

  const go = useCallback((x: number) => setI(((x % n) + n) % n), [n])

  // Lazy-load photos: only slides within 2 of the current one (wrapping) get their
  // image; once loaded a slide keeps it, so browsing back never re-fetches.
  const near = useCallback((c: number) => [-2, -1, 0, 1, 2].map((d) => (((c + d) % n) + n) % n), [n])
  const [seen, setSeen] = useState(() => new Set(near(0)))
  useEffect(() => {
    setSeen((s) => (near(i).every((k) => s.has(k)) ? s : new Set([...s, ...near(i)])))
  }, [i, near])

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => go(i + 1), 5000)
    return () => clearTimeout(t)
  }, [i, playing, go])

  const pos = useCallback(
    (d: number) => {
      const v = view.current, t = track.current
      if (!v || !t || !t.children[0]) return
      const w = (t.children[0] as HTMLElement).offsetWidth
      t.style.transform = `translateX(${v.clientWidth / 2 - w / 2 - i * (w + 24) + d}px)`
    },
    [i]
  )

  useEffect(() => {
    pos(drag)
  }, [i, drag, pos])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      dx.current = e.clientX - startX.current
      if (Math.abs(dx.current) > 6) moved.current = true
      setDrag(dx.current)
    }
    const up = () => {
      if (!dragging.current) return
      dragging.current = false
      if (track.current) track.current.style.transition = ''
      const d = dx.current
      setDrag(0)
      if (d < -60) go(i + 1)
      else if (d > 60) go(i - 1)
      setTimeout(() => (moved.current = false), 0)
    }
    const onResize = () => pos(0)
    addEventListener('pointermove', onMove)
    addEventListener('pointerup', up)
    addEventListener('pointercancel', up)
    addEventListener('resize', onResize)
    return () => {
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerup', up)
      removeEventListener('pointercancel', up)
      removeEventListener('resize', onResize)
    }
  }, [i, go, pos])

  const cur = photos[i]
  return (
    <div className="cf">
      <div
        className="cfv"
        ref={view}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${title} photos`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(i - 1)
          if (e.key === 'ArrowRight') go(i + 1)
        }}
        onPointerDown={(e) => {
          dragging.current = true
          moved.current = false
          startX.current = e.clientX
          dx.current = 0
          if (track.current) track.current.style.transition = 'none'
        }}
      >
        <div className="cft" ref={track}>
          {photos.map((p, k) => (
            <div className={'cfs' + (k === i ? ' on' : '')} key={p.image} onClick={() => !moved.current && go(k)}>
              {seen.has(k) && (
                <>
                  <i style={{ backgroundImage: `url(${p.image})` }}></i>
                  <img src={p.image} alt={p.title} draggable={false} decoding="async" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="cfi">
        <div>
          <span className="cfd">{cur.date}</span>
          <h3 className="cfh">{cur.title}</h3>
        </div>
        <div className="cfk">
          <span className="cfn">{(i < 9 ? '0' : '') + (i + 1) + ' / ' + n}</span>
          <button className="cb pv" type="button" aria-label="Previous photo" onClick={() => go(i - 1)}>&#8249;</button>
          <button className="cb pp" type="button" aria-label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</button>
          <button className="cb nx" type="button" aria-label="Next photo" onClick={() => go(i + 1)}>&#8250;</button>
        </div>
      </div>
      <div className="cfp"><u style={{ width: ((i + 1) / n) * 100 + '%' }}></u></div>
    </div>
  )
}
