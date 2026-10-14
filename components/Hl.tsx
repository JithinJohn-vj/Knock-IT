import { Fragment } from 'react'

// Highlights a client name inside a sentence. Each piece around the name stays its
// own text node, so content/ar.json needs a translation for every piece.
export default function Hl({ text, word = 'Hyundai' }: { text: string; word?: string }) {
  const parts = text.split(word)
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <span className="hyn">{word}</span>}
        </Fragment>
      ))}
    </>
  )
}
