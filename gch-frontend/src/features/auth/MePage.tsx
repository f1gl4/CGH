import Container from '../../components/Container'
import Spinner from '../../components/Spinner'
import ErrorView from '../../components/ErrorView'
import { useMe } from './useAuth'
import { Link } from 'react-router-dom'

export default function MePage() {
  const { data, isLoading, isError } = useMe()

  if (isLoading) return <Spinner />
  if (isError || !data) return (
    <Container>
      <ErrorView message="Нужна авторизация" />
      <div className="text-sm mt-2"><Link to="/login">Перейти к входу</Link></div>
    </Container>
  )

  return (
    <Container>
      <h1 className="mb-4 text-2xl font-bold">Profile</h1>
      <div className="card space-y-1">
        <div><span className="opacity-70">ID:</span> {data.id}</div>
        <div><span className="opacity-70">Email:</span> {data.email}</div>
        <div><span className="opacity-70">Nickname:</span> {data.nickname}</div>
      </div>
    </Container>
  )
}
