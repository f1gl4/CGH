import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import CardsPage from './features/cards/CardsPage'
import CardDetailsPage from './features/cards/CardDetailsPage'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import MePage from './features/auth/MePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <CardsPage /> },
      { path: 'cards/:id', element: <CardDetailsPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'me', element: <MePage /> },
    ],
  },
])
