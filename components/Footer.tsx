import Link from 'next/link'

export default function Footer() {
  return (
    <footer><div className="w"><div className="fcta"><div><h2>Need IT equipment or a network upgrade?</h2><p>Tell us what you need and we will reply with a quote.</p></div><div className="fcb"><Link className="fy" href="/contact">Request a quote</Link><a className="fo" href="https://wa.me/966567696773" target="_blank" rel="noopener">WhatsApp us</a></div></div><div className="fg"><div><h4>Company</h4><Link href="/about">About</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link></div><div><h4>Solutions</h4><Link href="/solutions">Infrastructure</Link><Link href="/solutions">Email and servers</Link><Link href="/solutions">Security</Link></div><div><h4>Products</h4><Link href="/products">Computing</Link><Link href="/products">Networking</Link><Link href="/products">Printing</Link><Link href="/products?cat=ct">Container Houses</Link></div></div><div className="fb"><span>© Knock-IT Solution &amp; Service</span><span>CR No. 4030135279 · VAT [VAT NO.]</span></div></div></footer>
  )
}
