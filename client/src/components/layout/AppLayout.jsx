import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

// redux
import { selectUser } from '../../features/auth/authSlice'

// skeleton
import { BlockSkeleton } from '../skeletons/index'

// react component
import { Navbar } from '../index'

export default function AppLayout() {
  const user = useSelector(selectUser)
  const location = useLocation()

  return user.email ? (
    <>
      <Navbar />
      <Suspense fallback={<BlockSkeleton />}>
        <Outlet />
      </Suspense>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
