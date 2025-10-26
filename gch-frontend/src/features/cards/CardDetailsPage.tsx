import { Link, useParams } from 'react-router-dom'
import Container from '../../components/Container'
import Spinner from '../../components/Spinner'
import ErrorView from '../../components/ErrorView'
import RarityBadge from '../../components/RarityBadge'
import { useCard } from './useCards'

function formatAttributeValue(value: unknown) {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}

export default function CardDetailsPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError, error } = useCard(id)

  if (isLoading) return <Spinner />
  if (isError || !data) {
    return (
      <Container>
        <ErrorView message={(error as any)?.response?.data?.detail ?? 'Нет данных'} />
        <div className="mt-2 text-sm">
          <Link to="/">Вернуться к списку</Link>
        </div>
      </Container>
    )
  }

  const img = data.imageUrl ?? (data as any).image_url ?? undefined
  const attributesEntries = Object.entries(data.attributes ?? {})

  return (
    <Container>
      <div className="mb-4">
        <Link to="/" className="text-sm opacity-70">
          ← Назад к каталогу
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[min(360px,100%),1fr]">
        <div>
          {img ? (
            <img
              src={img}
              alt={data.name}
              className="w-full rounded-xl border border-neutral-200 object-cover shadow-sm dark:border-neutral-800"
            />
          ) : (
            <div className="aspect-[4/3] w-full rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700" />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold leading-tight">{data.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm opacity-80">
              <RarityBadge rarity={data.rarity} />
              {data.setName && <span className="rounded-full bg-neutral-200/80 px-3 py-1 dark:bg-neutral-800/80">Набор: {data.setName}</span>}
              {data.universeName && (
                <span className="rounded-full bg-neutral-200/80 px-3 py-1 dark:bg-neutral-800/80">Вселенная: {data.universeName}</span>
              )}
            </div>
          </div>

          <section>
            <h2 className="mb-2 text-xl font-semibold">Основные сведения</h2>
            <div className="grid gap-2 text-sm">
              <div>
                <span className="opacity-60">ID карты:</span> {data.id}
              </div>
              {data.setId && (
                <div>
                  <span className="opacity-60">ID набора:</span> {data.setId}
                </div>
              )}
              {data.universeId && (
                <div>
                  <span className="opacity-60">ID вселенной:</span> {data.universeId}
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">Атрибуты</h2>
            <div className="overflow-auto rounded-xl border border-neutral-200 shadow-sm dark:border-neutral-800">
              <table className="w-full text-sm">
                <tbody>
                  {attributesEntries.map(([key, value]) => (
                    <tr key={key} className="border-b border-neutral-200/60 last:border-none dark:border-neutral-800/60">
                      <td className="w-40 px-3 py-2 font-medium">{key}</td>
                      <td className="whitespace-pre-wrap px-3 py-2">{formatAttributeValue(value)}</td>
                    </tr>
                  ))}
                  {attributesEntries.length === 0 && (
                    <tr>
                      <td className="px-3 py-2 text-sm opacity-70">Атрибуты отсутствуют</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Container>
  )
}
