import { lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken } from './features/auth/authActions'
import { selectTheme } from './features/theme/themeSlice'
import { selectTokens } from './features/auth/authSlice'

// layouts
import { Layout, AppLayout } from './components/index'

// page
import { Home } from './pages/index'

// routes
import { AppRoute, YearRoute } from './routes'

// lazy pages
const Login = lazy(() => import('./pages/login/Login'))
const Register = lazy(() => import('./pages/register/Register'))
const ForgotPassword = lazy(() => import('./pages/forgot-password/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/reset-password/ResetPassword'))
const Privacy = lazy(() => import('./pages/privacy/Privacy'))
const Terms = lazy(() => import('./pages/terms/Terms'))

// lazy routes
const UserRoute = lazy(() => import('./routes/user/UserRoute'))

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
        <Route path=":year" element={<YearRoute />} />
      </Route>
    </Routes>
  )
}
