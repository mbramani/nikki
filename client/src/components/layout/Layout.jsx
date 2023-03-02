import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

// skeletons
import { BlockSkeleton, FromSkeleton } from '../skeletons/index'

// react components
import { Navbar, Footer } from '../index'

export default function Layout() {
  const location = useLocation()

  const pathArray = ['/', '/terms-and-conditions', '/privacy-policy']

  const skelton = pathArray.includes(location?.pathname) ? (
    <BlockSkeleton />
  ) : (
    <FromSkeleton />
  )

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
