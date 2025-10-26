import type { Card } from '../../../types'
import CardCard from './CardCard'

export default function CardGrid({ items }: { items: Card[] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-center text-sm opacity-70 dark:border-neutral-700">
        Карты не найдены. Попробуйте скорректировать фильтры.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
      {items.map((card) => (
        <CardCard key={card.id} card={card} />
      ))}
    </div>
  )
}
