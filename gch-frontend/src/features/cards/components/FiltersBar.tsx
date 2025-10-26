import { FormEvent, useMemo, useState } from 'react'

const rarityOptions = [
  { label: 'Любая', value: '' },
  { label: 'Common', value: 'common' },
  { label: 'Uncommon', value: 'uncommon' },
  { label: 'Rare', value: 'rare' },
  { label: 'Epic', value: 'epic' },
  { label: 'Legendary', value: 'legendary' },
]

type Filters = {
  q?: string
  powerMin?: number
  rarity?: string
}

export default function FiltersBar(props: {
  initialQ?: string
  initialPowerMin?: number
  initialRarity?: string
  onApply: (p: Filters) => void
}) {
  const [q, setQ] = useState(props.initialQ ?? '')
  const [powerMin, setPowerMin] = useState<string>(props.initialPowerMin?.toString() ?? '')
  const [rarity, setRarity] = useState(props.initialRarity ?? '')

  const sanitizedPower = useMemo(() => {
    if (!powerMin.trim().length) return undefined
    const parsed = Number(powerMin)
    return Number.isFinite(parsed) ? parsed : undefined
  }, [powerMin])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    props.onApply({
      q: q.trim() || undefined,
      powerMin: sanitizedPower,
      rarity: rarity || undefined,
    })
  }

  function onReset() {
    setQ('')
    setPowerMin('')
    setRarity('')
    props.onApply({})
  }

  return (
    <form className="mb-4 flex flex-wrap items-end gap-3" onSubmit={onSubmit}>
      <div>
        <label className="mb-1 block text-sm">Поиск</label>
        <input
          className="input"
          placeholder="имя или значение атрибута"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm">Power ≥</label>
        <input
          className="input"
          type="number"
          inputMode="numeric"
          value={powerMin}
          onChange={(e) => setPowerMin(e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm">Редкость</label>
        <select className="input" value={rarity} onChange={(e) => setRarity(e.target.value)}>
          {rarityOptions.map((option) => (
            <option key={option.value || 'any'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button className="btn" type="submit">
          Применить
        </button>
        <button className="btn" type="button" onClick={onReset}>
          Сбросить
        </button>
      </div>
    </form>
  )
}
