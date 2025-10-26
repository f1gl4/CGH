import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { saveToken, getToken } from '../../lib/storage'
import type { LoginResponse, User } from '../../types'

export function useLogin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await api.post<LoginResponse>('/auth/login', payload)
      saveToken(data.accessToken)
      return data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

export function useRegister() {
  const login = useLogin()
  return useMutation({
    mutationFn: async (payload: { email: string; nickname: string; password: string }) => {
      await api.post('/auth/register', payload)
    },
    onSuccess: async (_, vars) => {
      await login.mutateAsync({ email: vars.email, password: vars.password })
    },
  })
}

export function useMe() {
  const token = getToken()
  return useQuery({
    queryKey: ['me', token],
    queryFn: async () => {
      const { data } = await api.get<User>('/auth/me')
      return data
    },
    enabled: !!token,
  })
}
