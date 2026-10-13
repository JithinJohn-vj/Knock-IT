import brands from '@/content/brands.json'

export default function BrandMarquee() {
  const row = (k: string) => brands.map((b) => <img key={k + b.name} src={b.logo} alt={b.name} />)
  return (
    <div id="lwd">
      {row('a')}
      {row('b')}
    </div>
  )
}
