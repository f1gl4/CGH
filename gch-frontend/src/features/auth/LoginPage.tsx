import { FormEvent, useState } from 'react'
import { useLogin, useMe } from './useAuth'
import Container from '../../components/Container'
import ErrorView from '../../components/ErrorView'
import Spinner from '../../components/Spinner'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('alice@example.com')
  const [password, setPassword] = useState('secret123')
  const { mutateAsync, isPending, isError, error } = useLogin()
  const { data: me } = useMe()
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await mutateAsync({ email, password })
    navigate('/')
  }

  if (me) {
    return (
      <Container>
        <div className="card">
          <div className="text-lg font-semibold mb-2">Вы уже вошли как {me.nickname}</div>
          <div className="text-sm opacity-80">Перейти на главную</div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form className="card space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        <button className="btn" type="submit" disabled={isPending}>
          {isPending ? 'Входим...' : 'Login'}
        </button>
        {isError && <ErrorView message={(error as any)?.response?.data?.detail ?? 'Login failed'} />}
        <div className="text-sm">
          Нет аккаунта? <Link to="/register">Register</Link>
        </div>
      </form>
      {isPending && <Spinner/>}
    </Container>
  )
}
