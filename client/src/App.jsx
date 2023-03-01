import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken } from './features/auth/authActions'
import { selectTheme } from './features/theme/themeSlice'
import { selectTokens } from './features/auth/authSlice'

// pages
import { Layout, AppLayout } from './components/index'
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Privacy,
  Terms,
} from './pages/index'

// routes
import { AppRoute, UserRoute } from './routes'

export default function App() {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const { refreshToken } = useSelector(selectTokens)

  const FIFTEEN_MINUTES = 900000

  useEffect(() => {
    let interval
    if (refreshToken) {
      dispatch(setAccessToken({ refreshToken }))

      interval = setInterval(
        () => dispatch(setAccessToken({ refreshToken })),
        FIFTEEN_MINUTES
      )
    }
    return () => clearInterval(interval)
  }, [refreshToken])

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
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="terms-and-conditions" element={<Terms />} />
        <Route path="privacy-policy" element={<Privacy />} />
      </Route>
      <Route path="app" element={<AppLayout />}>
        <Route index element={<AppRoute />} />
        <Route path="user" element={<UserRoute />} />
      </Route>
    </Routes>
  )
}
