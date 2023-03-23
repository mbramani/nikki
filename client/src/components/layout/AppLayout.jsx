import { Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

// rtk query hook
import { useGetUserQuery } from '../../features/user/userSlice'

// skeleton
import { BlockSkeleton, NavbarSkeleton } from '../skeletons/index'

// react component
import { Navbar } from '../index'

export default function AppLayout() {
  const { data: user, isLoading } = useGetUserQuery('user')
  const location = useLocation()

  if (isLoading) {
    return (
      <>
        <NavbarSkeleton />
        <BlockSkeleton />
      </>
    )
  }

  return user?.email ? (
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
