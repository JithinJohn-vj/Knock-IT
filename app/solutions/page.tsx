import ServicesExplorer from '@/components/ServicesExplorer'
import type {Metadata} from 'next'

export const metadata: Metadata = {"title": "IT solutions and services | Knock-IT"}

export default function Page() {
  return (
    <>
<section className="pg on" data-p="solutions"><div className="ph"><img className="bg" src="/images/net.jpg" alt="" /><div className="w"><div className="eb">Solutions</div><h1>IT solutions and services</h1><p className="lead">Twelve services covering infrastructure, email, security and consultancy.</p></div></div>
<div className="sec"><div className="w"><ServicesExplorer /></div></div></section>
    </>
  )
}
