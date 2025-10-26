import { useMemo, useState } from 'react'
import Container from '../../components/Container'
import Spinner from '../../components/Spinner'
import ErrorView from '../../components/ErrorView'
import CardGrid from './components/CardGrid'
import FiltersBar from './components/FiltersBar'
import { useCardsList } from './useCards'

type FilterState = {
  q?: string
  powerMin?: number
  rarity?: string
}

export default function CardsPage() {
  const [filters, setFilters] = useState<FilterState>({})
  const [page, setPage] = useState(0)

  const { data, isLoading, isError, error, isFetching } = useCardsList({
    ...filters,
    page,
    size: 20,
  })

  const activeFilters = useMemo(
    () =>
      [
        filters.q ? `Поиск: «${filters.q}»` : undefined,
        typeof filters.powerMin === 'number' ? `Power ≥ ${filters.powerMin}` : undefined,
        filters.rarity ? `Редкость: ${filters.rarity}` : undefined,
      ].filter(Boolean),
    [filters]
  )

  function applyFilters(next: FilterState) {
    setPage(0)
    setFilters(next)
  }

  function goPrev() {
    setPage((prev) => Math.max(0, prev - 1))
  }

  function goNext() {
    if (!data) return
    const nextPage = data.number + 1
    if (nextPage < data.totalPages) {
      setPage(nextPage)
    }
  }

  return (
    <Container>
      <div className="flex flex-col gap-1 pb-2">
        <h1 className="text-2xl font-bold">Коллекция карт</h1>
        <p className="text-sm opacity-70">Браузьте каталоги, фильтруйте по силе и редкости, открывайте подробности.</p>
      </div>

      <FiltersBar
        initialQ={filters.q}
        initialPowerMin={filters.powerMin}
        initialRarity={filters.rarity}
        onApply={applyFilters}
      />

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <ErrorView message={(error as any)?.response?.data?.detail ?? 'Не удалось загрузить каталог'} />
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="font-medium opacity-80">
              {isFetching ? 'Обновляем результаты…' : `Найдено: ${data?.totalElements ?? 0}`}
            </div>
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-neutral-200/60 px-3 py-1 text-xs uppercase tracking-wide dark:bg-neutral-800/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          <CardGrid items={data?.content ?? []} />

          {data && data.totalPages > 1 && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="btn" disabled={page <= 0} onClick={goPrev}>
                Назад
              </button>
              <div className="text-sm opacity-80">
                Страница {(data.number ?? 0) + 1} из {data.totalPages}
              </div>
              <button className="btn" disabled={data.number + 1 >= data.totalPages} onClick={goNext}>
                Вперёд
              </button>
            </div>
          )}
        </div>
      )}
    </Container>
  )
}
