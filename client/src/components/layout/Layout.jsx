import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '../index'

export default function Layout() {
  return (
    <>
      <Navbar simple />
      <Outlet />
      <Footer />
    </>
  )
}
