'use client'
import { useEffect, useRef, useState } from 'react'
import data from '@/content/solutions.json'

const { solutions, chipIcons } = data

export default function SolutionsExplorer() {
  const [cur, setCur] = useState(0)
  const [hover, setHover] = useState(false)
  const list = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const n = solutions.length
  const go = (k: number) => setCur(((k % n) + n) % n)

  useEffect(() => {
    if (hover || matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const t = setTimeout(() => setCur((c) => (c + 1) % n), 6000)
    return () => clearTimeout(t)
  }, [cur, hover, n])

  useEffect(() => {
    const s = tabs.current[cur]
    if (s && list.current && innerWidth <= 900) list.current.scrollTo({ left: Math.max(0, s.offsetLeft - 12), behavior: 'smooth' })
  }, [cur])

  return (
    <div className="sxw rv" id="sx" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="sxl" role="tablist" aria-label="Solutions" ref={list}>
        {solutions.map((x, k) => (
          <button
            key={x.title}
            ref={(el) => { tabs.current[k] = el }}
            className="sxb"
            role="tab"
            type="button"
            id={'sxt' + k}
            aria-controls={'sxp' + k}
            aria-selected={k === cur}
            tabIndex={k === cur ? 0 : -1}
            onClick={() => go(k)}
            onKeyDown={(e) => {
              const d = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[e.key]
              if (d) {
                e.preventDefault()
                go(cur + d)
                tabs.current[((cur + d) % n + n) % n]?.focus()
              }
            }}
          >
            <span className="n">0{k + 1}</span>
            <em className="ti" dangerouslySetInnerHTML={{ __html: chipIconFor(k) }} />
            <span className="tx">{x.title}</span>
            <i className="ar" aria-hidden="true">&#8594;</i>
            <u className="pg"></u>
          </button>
        ))}
      </div>
      <div className="sxp">
        {solutions.map((x, k) => (
          <div className={'sxi' + (k === cur ? ' on' : '')} role="tabpanel" id={'sxp' + k} aria-labelledby={'sxt' + k} key={x.title}>
            <img src={x.image} alt="" />
            {x.tags.map((s, j) => (
              <span className={'fch fc' + j} key={s}>
                <em dangerouslySetInnerHTML={{ __html: chipIcons[j] }} />
                <span>{s}</span>
              </span>
            ))}
            <div className="sxc">
              <div className="sxt">
                <span className="k">{`0${k + 1} / 0${n}`}</span>
                <h3>{x.title}</h3>
                <i className="ul"></i>
                <p>{x.text}</p>
              </div>
              <a className="go" href={k === n - 1 ? '/products' : `/solutions?hl=${k}`} data-i={k}>
                <span className="vh">View this solution</span>&#8594;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function chipIconFor(k: number) {
  return solutions[k].icon
}
