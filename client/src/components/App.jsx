import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { selectTheme } from '../features/theme/themeSlice'

// pages
import { Layout } from './index'
import { Home, Login, Register, Privacy, Terms } from '../pages/index'
import { setAccessToken } from '../features/auth/authActions'

export default function App() {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const tokens = useSelector((state) => state.auth.tokens)

  const FIFTEEN_MINUTES = 900000

  useEffect(() => {
    let interval
    if (tokens.refreshToken) {
      interval = setInterval(
        () => dispatch(setAccessToken({ refreshToken: tokens.refreshToken })),
        FIFTEEN_MINUTES
      )
    }
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }

    return () => {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('theme')
    }
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
      </Route>
    </Routes>
  )
}
