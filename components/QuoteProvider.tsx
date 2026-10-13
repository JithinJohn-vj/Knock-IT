'use client'
import { createContext, ReactNode, useContext, useState } from 'react'
import site from '@/content/site.json'

type Ctx = { items: string[]; toggle: (name: string) => void; has: (name: string) => boolean }
const QuoteCtx = createContext<Ctx>({ items: [], toggle: () => {}, has: () => false })
export const useQuote = () => useContext(QuoteCtx)

export default function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const toggle = (name: string) => setItems((q) => (q.includes(name) ? q.filter((x) => x !== name) : [...q, name]))
  const has = (name: string) => items.includes(name)

  const list = items.length ? items.map((x, i) => `${i + 1}. ${x}`).join('\n') : 'IT products and services'
  const wm = `Hello Knock-IT,\n\nI would like to request a quote for the following:\n${list}\n\nPlease let me know the price and availability.\nThank you.`
  const em = `Hello Knock-IT,\n\nI would like to request a quote for the following:\n\n${list}\n\nPlease send me the price and availability.\n\nMy name:\nCompany:\nPhone:\n\nThank you.`
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(wm)}`
  const mail = `mailto:${site.email}?subject=${encodeURIComponent('Quote request - Knock-IT website')}&body=${encodeURIComponent(em)}`

  return (
    <QuoteCtx.Provider value={{ items, toggle, has }}>
      {children}
      <div className="q">
        <div className={'qp' + (open ? ' o' : '')} id="qp">
          <b>Your quote list</b>
          <ul id="ql">
            {items.length ? items.map((x) => <li key={x}>{x}</li>) : <li style={{ color: '#4b5563' }}>Nothing added yet.</li>}
          </ul>
          <div className="qa">
            <a className="b" id="qw" href={wa} target="_blank" rel="noopener">Send via WhatsApp</a>
            <a className="b qe" id="qe" href={mail}>Send via Email</a>
          </div>
        </div>
        <button className="qb" id="qb" type="button" onClick={() => setOpen((o) => !o)}>
          Quote (<span id="qc">{items.length}</span>)
        </button>
      </div>
    </QuoteCtx.Provider>
  )
}
