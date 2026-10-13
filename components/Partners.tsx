import partners from '@/content/partners.json'

export default function Partners() {
  return (
    <div className="pns rv" id="pn2">
      {partners.map((p) => (
        <div className="pn" key={p.name}>
          {p.logo ? <img loading="lazy" decoding="async" src={p.logo} alt={p.name} /> : <b>{p.name}</b>}
          <span>{p.level}</span>
        </div>
      ))}
    </div>
  )
}
