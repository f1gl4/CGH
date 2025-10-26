import { Link } from 'react-router-dom'
import RarityBadge from '../../../components/RarityBadge'
import type { Card } from '../../../types'

function readAttr(attrs: Record<string, unknown>, key: string): string | undefined {
  const value = attrs[key]
  if (value === undefined || value === null) return undefined
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return undefined
}

function formatId(id?: string | null) {
  if (!id) return undefined
  return id.length > 10 ? `${id.slice(0, 10)}…` : id
}

export default function CardCard({ card }: { card: Card }) {
  const img = card.imageUrl ?? card.image_url ?? undefined
  const attrs = card.attributes ?? {}

  const power = readAttr(attrs, 'power') ?? readAttr(attrs, 'attack')
  const cost = readAttr(attrs, 'cost') ?? readAttr(attrs, 'mana_cost')
  const faction = readAttr(attrs, 'faction') ?? readAttr(attrs, 'class')

  const summary = [
    power ? `Power: ${power}` : undefined,
    cost ? `Cost: ${cost}` : undefined,
    faction ? `Faction: ${faction}` : undefined,
  ].filter(Boolean)

  const setLabel = formatId(card.setId)
  const universeLabel = formatId(card.universeId)

  return (
    <article className="card flex flex-col">
      <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-200/60 dark:bg-neutral-800">
        {img ? (
          <img src={img} alt={card.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm opacity-50">Нет изображения</div>
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-tight">{card.name}</h3>
        <RarityBadge rarity={card.rarity} />
      </div>
      <div className="mt-2 min-h-[2rem] text-sm opacity-80">
        {summary.length ? summary.join(' • ') : 'Атрибуты не указаны'}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide opacity-60">
        {setLabel && <span>Set: {setLabel}</span>}
        {universeLabel && <span>Universe: {universeLabel}</span>}
      </div>
      <div className="mt-4">
        <Link className="btn" to={`/cards/${card.id}`}>
          Подробнее
        </Link>
      </div>
    </article>
  )
}
