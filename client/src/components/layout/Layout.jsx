import { Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

// skeletons
import { BlockSkeleton, FromSkeleton, NavbarSkeleton } from '../skeletons/index'

// react components
import { Navbar, Footer } from '../index'

// rtk query hook
import { useGetUserQuery } from '../../features/user/userSlice'

export default function Layout() {
  const { data: user, isLoading } = useGetUserQuery('user')
  const location = useLocation()
  const pathArray = ['/terms-and-conditions', '/privacy-policy']

  const skelton = pathArray.includes(location?.pathname) ? (
    <BlockSkeleton />
  ) : (
    <FromSkeleton />
  )

  if (isLoading && location?.pathname !== '/') {
    return (
      <>
        <NavbarSkeleton />
        {skelton}
      </>
    )
  }

  if (user?.email && location?.pathname !== '/') {
    return <Navigate to="/app" replace />
  }

  return (
    <>
      <Navbar simple />
      <Suspense fallback={skelton}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}
