import { FormEvent, useState } from 'react'

export default function FiltersBar(props: {
  initialQ?: string
  initialPowerMin?: number
  onApply: (p: { q?: string; powerMin?: number }) => void
}) {
  const [q, setQ] = useState(props.initialQ ?? '')
  const [powerMin, setPowerMin] = useState<string>(props.initialPowerMin?.toString() ?? '')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const pMin = powerMin.length ? Number(powerMin) : undefined
    props.onApply({ q: q || undefined, powerMin: Number.isFinite(pMin!) ? pMin : undefined })
  }

  return (
    <form className="mb-4 flex flex-wrap items-end gap-3" onSubmit={onSubmit}>
      <div>
        <label className="block text-sm mb-1">Search</label>
        <input className="input" placeholder="name / attribute..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm mb-1">Power ≥</label>
        <input className="input" type="number" inputMode="numeric" value={powerMin} onChange={e=>setPowerMin(e.target.value)} />
      </div>
      <button className="btn" type="submit">Apply</button>
    </form>
  )
}
