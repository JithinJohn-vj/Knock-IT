'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import site from '@/content/site.json'
import images from '@/content/images.json'
import { useLang } from './LangProvider'

export default function Header() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { ar, toggle } = useLang()

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    const f = () => setScrolled(scrollY > 10)
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  // keep --hh (header height without the open menu) in sync for page heroes
  useEffect(() => {
    const h = document.getElementById('hd')
    const m = document.getElementById('mm')
    const f = () => {
      if (!h) return
      const x = m && m.classList.contains('o') ? m.offsetHeight : 0
      document.documentElement.style.setProperty('--hh', h.offsetHeight - x + 'px')
    }
    f()
    const t = setTimeout(f, 50)
    addEventListener('resize', f)
    addEventListener('load', f)
    return () => {
      clearTimeout(t)
      removeEventListener('resize', f)
      removeEventListener('load', f)
    }
  }, [open])

  const active = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'))

  return (
    <header id="hd" className={scrolled ? 's' : ''}>
      <div className="w h">
        <Link className="lg" href="/" aria-label="Knock-IT Solution and Service, home">
          <img fetchPriority="high" className="lgi" src={images.logoD} alt="Knock-IT Solution & Service" />
        </Link>
        <nav className="nv" id="nv">
          {site.nav.map((n) => (
            <Link key={n.href} href={n.href} className={active(n.href) ? 'on' : ''}>{n.label}</Link>
          ))}
        </nav>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="b o" id="lg" type="button" aria-label="Switch language" onClick={toggle}>{ar ? 'EN' : 'عربي'}</button>
          <Link className="b hq" href="/contact">Request a quote</Link>
          <button className="b o mb" id="mb" type="button" aria-label="Open menu" onClick={() => setOpen((o) => !o)}>Menu</button>
        </div>
      </div>
      <div className={'mm' + (open ? ' o' : '')} id="mm">
        {site.nav.map((n) => (
          <Link key={n.href} href={n.href}>{n.label}</Link>
        ))}
      </div>
    </header>
  )
}
