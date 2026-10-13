'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

// Small DOM-level enhancements for the static marketing sections:
// reveal-on-scroll, animated counters, and the auto-rotating banners/sliders.


function initHomeSlider(): () => void {
  const sd = document.querySelectorAll('.sd')
  const dt = document.querySelectorAll('.dt button')
  if (!sd.length) return () => {}
  let cur = 0
  let tm: ReturnType<typeof setTimeout>
  const go = (n: number) => {
    cur = (n + sd.length) % sd.length
    sd.forEach((s, i) => s.classList.toggle('on', i === cur))
    dt.forEach((d, i) => {
      d.classList.remove('on')
      if (i === cur) {
        void (d as HTMLElement).offsetWidth
        d.classList.add('on')
      }
    })
    clearTimeout(tm)
    tm = setTimeout(() => go(cur + 1), 6000)
  }
  dt.forEach((d, i) => ((d as HTMLElement).onclick = () => go(i)))
  go(0)
  return () => clearTimeout(tm)
}

function initFeatured(): () => void {
  const r = document.querySelector('.fpr1')
  if (!r) return () => {}
  const im = r.querySelectorAll('.fsl img'), dt = r.querySelectorAll('.fdt i')
  let c = 0, tm: ReturnType<typeof setInterval>
  const s = (n: number) => {
    c = (n + im.length) % im.length
    im.forEach((e, k) => e.classList.toggle('on', k === c))
    dt.forEach((e, k) => e.classList.toggle('on', k === c))
  }
  const st = () => {
    clearInterval(tm)
    tm = setInterval(() => s(c + 1), 4500)
  }
  dt.forEach((d, k) => ((d as HTMLElement).onclick = () => { s(k); st() }))
  st()
  return () => clearInterval(tm)
}

function initGallery(): () => void {
  const g = document.querySelector('.gl') as HTMLElement | null
  if (!g) return () => {}
  const im = g.querySelectorAll('img')
  const d = document.createElement('div')
  d.className = 'gdots'
  im.forEach(() => d.appendChild(document.createElement('i')))
  g.parentNode?.insertBefore(d, g.nextSibling)
  const dots = d.children
  let c = 0, hold = 0
  const mark = () => {
    const w = g.clientWidth + 10
    c = Math.max(0, Math.min(im.length - 1, Math.round(g.scrollLeft / w)))
    for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('on', i === c)
  }
  const press = () => (hold = Date.now() + 6000)
  g.addEventListener('scroll', mark, { passive: true })
  ;['touchstart', 'pointerdown'].forEach((e) => g.addEventListener(e, press, { passive: true }))
  const t = setInterval(() => {
    if (innerWidth > 700 || Date.now() < hold || document.hidden || !g.offsetParent) return
    g.scrollTo({ left: ((c + 1) % im.length) * (g.clientWidth + 10), behavior: 'smooth' })
  }, 3500)
  mark()
  return () => {
    clearInterval(t)
    g.removeEventListener('scroll', mark)
    d.remove()
  }
}

function initTvx(): () => void {
  const x = document.getElementById('tvx')
  if (!x) return () => {}
  const im = x.querySelectorAll('.tvm img'), li = x.querySelectorAll('.tvl li'), t = document.getElementById('tvt')
  let c = 0, hold = 0
  const go = (n: number) => {
    c = n
    im.forEach((e, i) => e.classList.toggle('on', i === n))
    li.forEach((e, i) => {
      e.classList.remove('on')
      if (i === n) {
        void (e as HTMLElement).offsetWidth
        e.classList.add('on')
      }
    })
    if (t) t.textContent = li[n].querySelector('b')?.textContent ?? ''
  }
  li.forEach((e, i) => e.addEventListener('click', () => { hold = Date.now() + 8000; go(i) }))
  const iv = setInterval(() => {
    if (Date.now() < hold || document.hidden || !(x as HTMLElement).offsetParent) return
    go((c + 1) % im.length)
  }, 4000)
  return () => clearInterval(iv)
}

function initTzs(): () => void {
  const x = document.getElementById('tzs')
  if (!x) return () => {}
  const f = x.querySelectorAll('.tzf'), d = x.querySelectorAll('.tzd i')
  let c = 0, hold = 0
  const go = (n: number) => {
    c = (n + f.length) % f.length
    f.forEach((e, i) => e.classList.toggle('on', i === c))
    d.forEach((e, i) => e.classList.toggle('on', i === c))
  }
  const h = () => (hold = Date.now() + 8000)
  ;(x.querySelector('.n') as HTMLElement).onclick = () => { h(); go(c + 1) }
  ;(x.querySelector('.p') as HTMLElement).onclick = () => { h(); go(c - 1) }
  d.forEach((e, i) => {
    ;(e as HTMLElement).style.cursor = 'pointer'
    ;(e as HTMLElement).onclick = () => { h(); go(i) }
  })
  let sx = 0
  x.addEventListener('touchstart', (e) => (sx = (e as TouchEvent).touches[0].clientX), { passive: true })
  x.addEventListener('touchend', (e) => {
    const dx = (e as TouchEvent).changedTouches[0].clientX - sx
    if (Math.abs(dx) > 40) { h(); go(c + (dx < 0 ? 1 : -1)) }
  }, { passive: true })
  const iv = setInterval(() => {
    if (Date.now() < hold || document.hidden || !(x as HTMLElement).offsetParent) return
    go(c + 1)
  }, 4200)
  return () => clearInterval(iv)
}

function initCzm(): () => void {
  const m = document.getElementById('czm'), t = document.getElementById('czth')
  if (!m || !t) return () => {}
  const im = m.querySelectorAll('img'), th = t.querySelectorAll('.czt')
  let c = 0, hold = 0
  const go = (n: number) => {
    c = (n + im.length) % im.length
    im.forEach((e, i) => e.classList.toggle('on', i === c))
    th.forEach((e, i) => e.classList.toggle('on', i === c))
  }
  th.forEach((e, i) => ((e as HTMLElement).onclick = () => { hold = Date.now() + 8000; go(i) }))
  ;(t.querySelector('.czn') as HTMLElement).onclick = () => { hold = Date.now() + 8000; go(c + 1) }
  const iv = setInterval(() => {
    if (Date.now() < hold || document.hidden || !(m as HTMLElement).offsetParent) return
    go(c + 1)
  }, 4500)
  return () => clearInterval(iv)
}

function initReveal(): () => void {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    }),
    { threshold: 0.12 }
  )
  const co = new IntersectionObserver((es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return
      co.unobserve(e.target)
      const el = e.target as HTMLElement
      const t = +(el.dataset.n ?? 0), s = el.dataset.s ?? '', st = performance.now()
      const f = (n: number) => {
        const k = Math.min((n - st) / 1500, 1)
        el.textContent = Math.round(t * (1 - Math.pow(1 - k, 3))) + s
        if (k < 1) requestAnimationFrame(f)
      }
      f(st)
    })
  )
  document.querySelectorAll('.rv:not(.in)').forEach((e) => io.observe(e))
  document.querySelectorAll('[data-n]').forEach((e) => co.observe(e))
  return () => {
    io.disconnect()
    co.disconnect()
  }
}

export default function Behaviors() {
  const path = usePathname()
  const router = useRouter()

  // internal <a href="/..."> in server-rendered sections navigate client-side
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const h = a.getAttribute('href')
      if (!h || !h.startsWith('/') || h.startsWith('//')) return
      e.preventDefault()
      router.push(h)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [router])

  useEffect(() => {
    const stops = [initHomeSlider, initFeatured, initGallery, initTvx, initTzs, initCzm, initReveal].map((f) => f())
    return () => stops.forEach((s) => s())
  }, [path])

  return null
}
