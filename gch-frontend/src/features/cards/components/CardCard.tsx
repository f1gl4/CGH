import { Link } from 'react-router-dom'
import type { Card } from '../../../types'

export default function CardCard({ card }: { card: Card }) {
  const img = card.imageUrl ?? (card as any).image_url ?? undefined
  return (
    <div className="card flex flex-col">
      {img ? (
        <img src={img} alt={card.name} className="mb-3 aspect-[4/3] w-full rounded-xl object-cover" />
      ) : (
        <div className="mb-3 aspect-[4/3] w-full rounded-xl bg-neutral-200/60 dark:bg-neutral-800" />
      )}
      <div className="font-semibold">{card.name}</div>
      <div className="text-sm opacity-70">{card.rarity ?? '—'}</div>
      <div className="mt-3">
        <Link className="btn" to={`/cards/${card.id}`}>View</Link>
      </div>
    </div>
  )
}
