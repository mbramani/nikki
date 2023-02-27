import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectUser } from '../../features/auth/authSlice'
import { Navbar } from '../index'

export default function AppLayout() {
  const user = useSelector(selectUser)
  const location = useLocation()

  return user.email ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
