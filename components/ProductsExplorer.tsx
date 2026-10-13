'use client'
import { ReactNode, Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import data from '@/content/products.json'
import fit from '@/content/fit-images.json'
import images from '@/content/images.json'
import { useQuote } from './QuoteProvider'

const fitSet = new Set(fit)
const fc = (src: string) => (fitSet.has(src) ? 'fit' : undefined)

function Inner({ containerDetails }: { containerDetails: ReactNode }) {
  const { groups, categories } = data
  const sp = useSearchParams()
  const router = useRouter()
  const k = sp.get('cat') || 'all'
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<number | null>(null)
  const { has, toggle } = useQuote()
  const tabs = useRef<HTMLDivElement>(null)
  const cat = sp.get('cat')

  useEffect(() => {
    setOpen(null)
  }, [cat])

  const scrollTabs = () => tabs.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const pick = (id: string) => {
    router.replace(id === 'all' ? '/products' : `/products?cat=${id}`, { scroll: false })
    setOpen(null)
  }
  const ct = k === 'ct'
  const query = q.toLowerCase().trim()
  const list = categories
    .map((c, idx) => ({ c, idx }))
    .filter(({ c }) => (k === 'all' || c.group === k) && (!query || (c.name + ' ' + c.items.map((i) => i.name).join(' ')).toLowerCase().includes(query)))

  const openCat = (idx: number) => {
    setOpen(idx)
    setTimeout(scrollTabs, 0)
  }
  const p = open != null ? categories[open] : null

  return (
    <>
      <div className="ph">
        <img className="bg" src={images.phero} alt="" />
        <div className="w">
          <div className="eb">Products</div>
          <h1>Products</h1>
          <p className="lead">Hardware, networking, printing, communication and office supplies.</p>
          <label className="sx">
            <span className="sro">Search products</span>
            <input id="ps" type="search" placeholder="Search products or services…" autoComplete="off" value={q} onChange={(e) => { setQ(e.target.value); setOpen(null) }} />
          </label>
        </div>
      </div>
      <div className="sec">
        <div className="w">
          <div className="chs" id="pt" ref={tabs}>
            {groups.map((g) => (
              <button key={g.id} type="button" data-k={g.id} className={k === g.id ? 'on' : ''} onClick={() => pick(g.id)}>{g.label}</button>
            ))}
          </div>
          {!p && (
            <div className="pgx" id="pgd" style={ct ? { display: 'none' } : undefined}>
              {list.length ? (
                list.map(({ c, idx }) => {
                  const isCt = c.group === 'ct'
                  const go = () => (isCt ? (pick('ct'), scrollTabs()) : openCat(idx))
                  return (
                    <div key={c.name} className="pk go" tabIndex={0} role="link" aria-label={'View items: ' + c.name} onClick={go} onKeyDown={(e) => e.key === 'Enter' && go()}>
                      <img className={fc(c.image)} src={c.image} alt={c.name} />
                      <h3>{c.name}</h3>
                      <ul>{c.items.map((i) => <li key={i.name}>{i.name}</li>)}</ul>
                      <span className="vd">{isCt ? 'View details →' : 'View items →'}</span>
                    </div>
                  )
                })
              ) : (
                <p className="mut">No products match your search.</p>
              )}
            </div>
          )}
          {p && (
            <div id="pdv">
              <a className="bkl" href="/products" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(null) }}>← Back to all products</a>
              <div className="pdt">
                <img className={fc(p.image)} src={p.image} alt={p.name} />
                <div>
                  <div className="eb">Products</div>
                  <h2>{p.name}</h2>
                  <p className="lead">Select an item to add it to your quote list.</p>
                </div>
              </div>
              <div className="pgx pit">
                {p.items.map((it) => {
                  const on = has(it.name)
                  return (
                    <div className="pk it" key={it.name}>
                      <img className={fc(it.image)} src={it.image} alt={it.name} />
                      <h3>{it.name}</h3>
                      <button className={'ad' + (on ? ' on' : '')} type="button" onClick={() => toggle(it.name)}>{on ? 'Added ✓ Remove' : 'Add to quote'}</button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {ct && !p && containerDetails}
    </>
  )
}

export default function ProductsExplorer({ containerDetails }: { containerDetails: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Inner containerDetails={containerDetails} />
    </Suspense>
  )
}
