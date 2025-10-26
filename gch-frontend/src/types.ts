export type UUID = string

export type Page<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  number: number // текущая страница (0-based)
  size: number
}

export type Card = {
  id: UUID
  name: string
  rarity?: string | null
  setId?: UUID | null
  universeId?: UUID | null
  imageUrl?: string | null
  image_url?: string | null // на всякий
  attributes: Record<string, unknown>
  createdAt?: string
}

export type CardDetails = Card & {
  setName?: string | null
  universeName?: string | null
}

export type User = {
  id: UUID
  email: string
  nickname: string
}

export type LoginResponse = { accessToken: string }
