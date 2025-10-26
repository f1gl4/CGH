import { Link, useNavigate } from 'react-router-dom'
import { getToken, clearToken } from '../lib/storage'

export default function Navbar() {
  const token = getToken()
  const navigate = useNavigate()

  function onLogout() {
    clearToken()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200/70 bg-white/80 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-900/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold">GCH</Link>

        <nav className="flex items-center gap-3">
          <Link to="/" className="btn">Cards</Link>
          {token ? (
            <>
              <Link to="/me" className="btn">Me</Link>
              <button className="btn" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
