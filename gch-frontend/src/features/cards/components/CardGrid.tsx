import type { Card } from '../../../types'
import CardCard from './CardCard'

export default function CardGrid({ items }: { items: Card[] }) {
  if (!items.length) return <div className="opacity-70">Пусто</div>
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
      {items.map((c) => <CardCard key={c.id} card={c} />)}
    </div>
  )
}
