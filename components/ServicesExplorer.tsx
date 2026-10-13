'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import services from '@/content/services.json'
import cats from '@/content/service-categories.json'
import solutionData from '@/content/solutions.json'
const { solutions } = solutionData

function Inner() {
  const [k, setK] = useState('all')
  const [hl, setHl] = useState<string[]>([])
  const grid = useRef<HTMLDivElement>(null)
  const sp = useSearchParams()
  const router = useRouter()
  const hlParam = sp.get('hl')

  useEffect(() => {
    if (hlParam == null) return
    const tags = solutions[+hlParam]?.tags ?? []
    const hit = services.filter((s) => tags.includes(s.title)).map((s) => s.title)
    if (!hit.length) {
      router.replace('/products')
      return
    }
    setK('all')
    setHl(hit)
    const t0 = setTimeout(() => {
      const el = [...(grid.current?.querySelectorAll('.cd') ?? [])].find((c) => hit.includes(c.querySelector('h3')?.textContent ?? ''))
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
    const t1 = setTimeout(() => setHl([]), 3500)
    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
    }
  }, [hlParam, router])

  return (
    <>
      <div className="tb" id="st">
        {cats.map((c) => (
          <button key={c.id} type="button" data-k={c.id} className={k === c.id ? 'on' : ''} onClick={() => setK(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="gd" id="sg" ref={grid}>
        {services
          .filter((s) => k === 'all' || s.category === k)
          .map((s) => (
            <div className={'cd' + (hl.includes(s.title) ? ' hl' : '')} key={s.title}>
              <div className="pi"><img src={s.image} alt="" /></div>
              <div className="ic"><svg className="i"><use href={'#' + s.icon} /></svg></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
      </div>
    </>
  )
}

export default function ServicesExplorer() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  )
}
