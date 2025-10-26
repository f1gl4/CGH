import { useParams } from 'react-router-dom'
import Container from '../../components/Container'
import Spinner from '../../components/Spinner'
import ErrorView from '../../components/ErrorView'
import { useCard } from './useCards'

export default function CardDetailsPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError, error } = useCard(id)

  if (isLoading) return <Spinner />
  if (isError || !data) return <ErrorView message={(error as any)?.response?.data?.detail ?? 'Нет данных'} />

  const img = data.imageUrl ?? (data as any).image_url ?? undefined

  return (
    <Container>
      <div className="grid gap-6 md:grid-cols-[320px,1fr]">
        <div>
          {img ? (
            <img src={img} alt={data.name} className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800" />
          ) : (
            <div className="aspect-[4/3] w-full rounded-xl bg-neutral-200/60 dark:bg-neutral-800" />
          )}
        </div>
        <div>
          <h1 className="mb-2 text-3xl font-bold">{data.name}</h1>
          <div className="opacity-70 mb-4">{data.rarity ?? '—'}</div>

          <h2 className="mt-6 mb-2 text-xl font-semibold">Attributes</h2>
          <div className="overflow-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-sm">
              <tbody>
              {Object.entries(data.attributes ?? {}).map(([k, v]) => (
                <tr key={k} className="border-b border-neutral-200/60 last:border-none dark:border-neutral-800/60">
                  <td className="px-3 py-2 font-medium">{k}</td>
                  <td className="px-3 py-2">{String(v)}</td>
                </tr>
              ))}
              {!Object.keys(data.attributes ?? {}).length && (
                <tr><td className="px-3 py-2 opacity-70">Нет атрибутов</td></tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  )
}
