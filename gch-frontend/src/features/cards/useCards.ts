import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import type { Card, Page } from '../../types'

export function useCardsList(params: { q?: string; rarity?: string; powerMin?: number; page?: number; size?: number }) {
  const { q, rarity, powerMin, page = 0, size = 20 } = params
  return useQuery({
    queryKey: ['cards', { q, rarity, powerMin, page, size }],
    queryFn: async () => {
      const resp = await api.get<Page<Card>>('/cards', {
        params: {
          q,
          rarity,
          'attr.power.gte': powerMin,
          page,
          size,
        },
      })
      return resp.data
    },
  })
}

export function useCard(id: string) {
  return useQuery({
    queryKey: ['card', id],
    queryFn: async () => {
      const { data } = await api.get<Card>(`/cards/${id}`)
      return data
    },
    enabled: !!id,
  })
}
