import { Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

// rtk query hook
import { useGetUserQuery } from '../../features/user/userSlice'

// skeleton
import { BlockSkeleton, NavbarSkeleton, SeekSkeleton } from '../skeletons/index'

// react component
import { Navbar } from '../index'
import { Container } from '../../styles/Container'

export default function AppLayout() {
  const { data: user, isLoading } = useGetUserQuery('user')
  const location = useLocation()
  const pathArray = ['/app', '/app/user']

  const skelton = pathArray.includes(location?.pathname) ? (
    <Container>
      <BlockSkeleton />
    </Container>
  ) : (
    <Container>
      <SeekSkeleton />
      <BlockSkeleton />
    </Container>
  )

  if (isLoading) {
    return (
      <>
        <NavbarSkeleton />
        {skelton}
      </>
    )
  }

  return user?.email ? (
    <>
      <Navbar />
      <Suspense fallback={skelton}>
        <Outlet />
      </Suspense>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
