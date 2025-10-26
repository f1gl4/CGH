import { useState } from 'react'
import Container from '../../components/Container'
import Spinner from '../../components/Spinner'
import ErrorView from '../../components/ErrorView'
import CardGrid from './components/CardGrid'
import FiltersBar from './components/FiltersBar'
import { useCardsList } from './useCards'

export default function CardsPage() {
  const [filters, setFilters] = useState<{ q?: string; powerMin?: number }>({})
  const [page, setPage] = useState(0)

  const { data, isLoading, isError, error, refetch, isFetching } = useCardsList({
    q: filters.q,
    powerMin: filters.powerMin,
    page,
    size: 20,
  })

  function applyFilters(f: { q?: string; powerMin?: number }) {
    setPage(0)
    setFilters(f)
    refetch()
  }

  return (
    <>
      <Container>
        <h1 className="mb-4 text-2xl font-bold">Cards</h1>
        <FiltersBar initialQ={filters.q} initialPowerMin={filters.powerMin} onApply={applyFilters} />
        {isLoading ? <Spinner /> :
         isError   ? <ErrorView message={(error as any)?.response?.data?.detail ?? 'Не удалось загрузить'} /> :
         <>
          <div className="mb-2 text-sm opacity-70">
            {isFetching ? 'Обновление…' : `Найдено: ${data?.totalElements ?? 0}`}
          </div>
          <CardGrid items={data?.content ?? []} />

          <div className="mt-4 flex items-center gap-2">
            <button className="btn" disabled={!data || page <= 0} onClick={()=>setPage(p=>p-1)}>Prev</button>
            <div className="text-sm opacity-80">
              Page { (data?.number ?? 0) + 1 } / { (data?.totalPages ?? 1) }
            </div>
            <button className="btn" disabled={!data || (data.number + 1) >= data.totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
          </div>
         </>
        }
      </Container>
    </>
  )
}
