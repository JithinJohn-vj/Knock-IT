// DOM-level English -> Arabic text translator driven by content/ar.json.
// Translations are exact text-node matches, so all copy stays in one dictionary file.
type Dict = Record<string, string>
const ORIG = new WeakMap<Node, string>()
// The Arabic text we wrote into each node, to tell our own writes apart from new
// English text React puts into an already-translated node (e.g. a gallery caption).
const TR = new WeakMap<Node, string>()

function trs(s: string, dict: Dict, mon: Dict): string | null {
  const n = s.replace(/\s+/g, ' ').trim()
  if (!n) return null
  if (dict[n]) return dict[n]
  const m = n.match(/^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})( \(night\))?$/)
  if (m && mon[m[1]]) return m[2] + ' ' + mon[m[1]] + ' ' + m[3] + (m[4] ? ' (ليلاً)' : '')
  return null
}

function trNode(n: Node, dict: Dict, mon: Dict) {
  const p = n.parentNode as HTMLElement | null
  if (!p || /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)) return
  const s = n.nodeValue ?? ''
  if (ORIG.has(n)) {
    if (s === TR.get(n)) return
    ORIG.delete(n)
    TR.delete(n)
  }
  const r = trs(s, dict, mon)
  if (r != null) {
    const v = (s.match(/^\s*/) as RegExpMatchArray)[0] + r + (s.match(/\s*$/) as RegExpMatchArray)[0]
    ORIG.set(n, s)
    TR.set(n, v)
    n.nodeValue = v
  }
}

function trTree(root: Node, dict: Dict, mon: Dict) {
  if (root.nodeType === 3) return trNode(root, dict, mon)
  if (root.nodeType !== 1) return
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const a: Node[] = []
  let n: Node | null
  while ((n = w.nextNode())) a.push(n)
  a.forEach((x) => trNode(x, dict, mon))
  const el = root as HTMLElement
  const ph = ([] as Element[]).concat(el.matches('[placeholder]') ? [el] : [], [...el.querySelectorAll('[placeholder]')])
  ph.forEach((e) => {
    const o = e.getAttribute('placeholder') ?? ''
    const r = trs(o, dict, mon)
    if (r && !e.hasAttribute('data-enph')) {
      e.setAttribute('data-enph', o)
      e.setAttribute('placeholder', r)
    }
  })
}

export function applyArabic(dict: Dict, mon: Dict) {
  trTree(document.body, dict, mon)
}

export function restoreEnglish() {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const a: Node[] = []
  let n: Node | null
  while ((n = w.nextNode())) a.push(n)
  a.forEach((x) => {
    if (ORIG.has(x)) {
      // Only restore text we translated; leave newer text React has written since.
      if (x.nodeValue === TR.get(x)) x.nodeValue = ORIG.get(x) as string
      ORIG.delete(x)
      TR.delete(x)
    }
  })
  document.querySelectorAll('[data-enph]').forEach((e) => {
    e.setAttribute('placeholder', e.getAttribute('data-enph') ?? '')
    e.removeAttribute('data-enph')
  })
}

export function observeArabic(dict: Dict, mon: Dict) {
  const mo = new MutationObserver((ms) => {
    ms.forEach((m) => {
      if (m.type === 'characterData') trNode(m.target, dict, mon)
      else m.addedNodes.forEach((x) => trTree(x, dict, mon))
    })
  })
  mo.observe(document.body, { childList: true, subtree: true, characterData: true })
  return () => mo.disconnect()
}
