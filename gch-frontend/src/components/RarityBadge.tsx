const palette: Record<string, string> = {
  common: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100',
  uncommon: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200',
  rare: 'bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200',
  epic: 'bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200',
  legendary: 'bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-100',
}

type Props = {
  rarity?: string | null
  className?: string
}

const baseClasses = 'inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide'

export default function RarityBadge({ rarity, className }: Props) {
  const extra = className ? ` ${className}` : ''

  if (!rarity) {
    return <span className={`${baseClasses} bg-neutral-200/80 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300${extra}`}>—</span>
  }

  const key = rarity.toLowerCase()
  const paletteClass = palette[key] ?? 'bg-neutral-200/80 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'

  return <span className={`${baseClasses} ${paletteClass}${extra}`}>{rarity}</span>
}
