import { FormEvent, useState } from 'react'
import { useRegister } from './useAuth'
import Container from '../../components/Container'
import ErrorView from '../../components/ErrorView'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage() {
  const [email, setEmail] = useState('alice@example.com')
  const [nickname, setNickname] = useState('alice')
  const [password, setPassword] = useState('secret123')
  const { mutateAsync, isPending, isError, error } = useRegister()
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await mutateAsync({ email, nickname, password })
    navigate('/')
  }

  return (
    <Container>
      <h1 className="mb-4 text-2xl font-bold">Register</h1>
      <form className="card space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Nickname</label>
          <input className="input" value={nickname} onChange={e=>setNickname(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        <button className="btn" type="submit" disabled={isPending}>
          {isPending ? 'Создаём...' : 'Register'}
        </button>
        {isError && <ErrorView message={(error as any)?.response?.data?.detail ?? 'Registration failed'} />}
        <div className="text-sm">
          Уже есть аккаунт? <Link to="/login">Login</Link>
        </div>
      </form>
    </Container>
  )
}
