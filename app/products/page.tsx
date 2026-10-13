import type { Metadata } from 'next'
import ProductsExplorer from '@/components/ProductsExplorer'
import ContainerDetails from '@/components/ContainerDetails'

export const metadata: Metadata = { title: 'Products | Knock-IT Solution & Service' }

export default function ProductsPage() {
  return (
    <section className="pg on" data-p="products">
      <ProductsExplorer containerDetails={<ContainerDetails />} />
    </section>
  )
}
