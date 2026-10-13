'use client'
import { FormEvent } from 'react'
import site from '@/content/site.json'

function body(f: HTMLFormElement) {
  const v = (n: string) => (f.elements.namedItem(n) as HTMLInputElement).value
  return 'Name: ' + v('n') + '\nPhone: +966 ' + v('p') + '\nEmail: ' + v('e') + (v('c') ? '\nCompany: ' + v('c') : '') + '\nSubject: ' + v('s') + '\n\nMessage:\n' + v('m')
}

export default function ContactForm() {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const subject = (f.elements.namedItem('s') as HTMLInputElement).value
    const name = (f.elements.namedItem('n') as HTMLInputElement).value
    location.href = 'mailto:' + site.email + '?subject=' + encodeURIComponent(subject + ' - quote request from ' + name) + '&body=' + encodeURIComponent('Hello Knock-IT,\n\nI would like to request a quote.\n\n' + body(f) + '\n\nThank you.')
  }
  function onWhatsApp() {
    const f = document.getElementById('fm') as HTMLFormElement
    if (!f.reportValidity()) return
    window.open('https://wa.me/' + site.whatsapp + '?text=' + encodeURIComponent('Hello Knock-IT,\n\nI would like to request a quote.\n\n' + body(f) + '\n\nThank you.'), '_blank')
  }
  return (
    <form id="fm" onSubmit={onSubmit} className="cxr rv"><div className="cxe">Send a message</div><h2>Request a quote</h2><p>Fill out the form below and we&rsquo;ll get back to you shortly.</p><div className="cxw"><label><span>Name <u>*</u></span><input name="n" required autoComplete="name" placeholder="Your full name" /></label><label><span>Phone <u>*</u></span><div className="cxt"><b>+966</b><input name="p" type="tel" required autoComplete="tel" placeholder="Phone number" /></div></label><label><span>Email <u>*</u></span><input name="e" type="email" required autoComplete="email" placeholder="you@company.com" /></label><label><span>Company <small>(Optional)</small></span><input name="c" autoComplete="organization" placeholder="Company name" /></label></div><label className="cxz"><span>Subject <u>*</u></span><input name="s" required placeholder="e.g. Networking, CCTV, IT Support, Quote Request" /></label><label className="cxz"><span>Message <u>*</u></span><textarea name="m" rows={4} required placeholder="Tell us about your requirements..."></textarea></label><div className="cxa"><button className="cxy" type="submit"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-8-8 18-2-8-8-2z"></path></svg><span>Send message</span></button><button className="cxg2" type="button" id="fme" onClick={onWhatsApp}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.6-5A8.5 8.5 0 1112 20.5a8.5 8.5 0 01-4-1z"></path><path d="M9 9c0 3 3 6 6 6l1.2-1.6-2-1-1 .8a4 4 0 01-2-2l.8-1-1-2z"></path></svg><span>Send on WhatsApp</span></button></div><small className="cxs2">By sending this message, you agree to be contacted by our team regarding your inquiry.</small></form>
  )
}
