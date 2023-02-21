import PropTypes from 'prop-types'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserQuery } from '../../features/user/userSlice'
import { toggleTheme, selectTheme } from '../../features/theme/themeSlice'

// utils-functions
import { todayUrl, yearUrl } from '../../utils/date'

// svg
import { ReactComponent as LogoIcon } from '../../data/icons/logo.svg'
import { ReactComponent as LoginIcon } from '../../data/icons/login.svg'
import { ReactComponent as MoonIcon } from '../../data/icons/moon.svg'
import { ReactComponent as SunIcon } from '../../data/icons/sun.svg'
import { ReactComponent as RocketIcon } from '../../data/icons/rocket.svg'
import { ReactComponent as PenIcon } from '../../data/icons/pen.svg'
import { ReactComponent as UserIcon } from '../../data/icons/user.svg'
import { ReactComponent as CalendarIcon } from '../../data/icons/calendar.svg'

// styled-components
import { NavbarSkeleton } from '../skeletons'
import {
  Header,
  Nav,
  AppLink,
  LogoText,
  NavLinks,
  NavLink,
  ThemeButton,
} from './NavbarStyles'

export default function Navbar({ simple }) {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  const { isLoading, isError } = useGetUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  )
  const isAuth = !isError && !isLoading

  if (isLoading) {
    return <NavbarSkeleton />
  }

  let navLinks

  if (simple) {
    navLinks = isAuth ? (
      <NavLink to="app" aria-label="app">
        <RocketIcon />
      </NavLink>
    ) : (
      <NavLink to="login" aria-label="login">
        <LoginIcon />
      </NavLink>
    )
  } else {
    navLinks = (
      <>
        <NavLink to={todayUrl()} aria-label="edit">
          <PenIcon />
        </NavLink>
        <NavLink to={yearUrl()} aria-label="calendar">
          <CalendarIcon />
        </NavLink>
        <NavLink to="user" aria-label="user">
          <UserIcon />
        </NavLink>
      </>
    )
  }
  const handleThemeBtnClick = () => dispatch(toggleTheme())
  return (
    <Header>
      <Nav>
        <AppLink to={simple ? '/' : 'app'} aria-label={simple ? 'home' : 'app'}>
          <LogoIcon />
          <LogoText>IKKI</LogoText>
        </AppLink>
        <NavLinks>
          <ThemeButton type="button" onClick={handleThemeBtnClick}>
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </ThemeButton>
          {navLinks}
        </NavLinks>
      </Nav>
    </Header>
  )
}

Navbar.propTypes = {
  simple: PropTypes.bool,
}

Navbar.defaultProps = {
  simple: false,
}
