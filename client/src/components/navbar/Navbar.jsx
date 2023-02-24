import PropTypes from 'prop-types'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserQuery } from '../../features/user/userSlice'
import { toggleTheme, selectTheme } from '../../features/theme/themeSlice'

// react component
import { Icon } from '../index'

// utils-functions
import { todayUrl, yearUrl } from '../../utils/date'

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
        <Icon icon="rocket" />
      </NavLink>
    ) : (
      <NavLink to="login" aria-label="login">
        <Icon icon="login" />
      </NavLink>
    )
  } else {
    navLinks = (
      <>
        <NavLink to={todayUrl()} aria-label="edit">
          <Icon icon="pen" />
        </NavLink>
        <NavLink to={yearUrl()} aria-label="calendar">
          <Icon icon="calendar" />
        </NavLink>
        <NavLink to="user" aria-label="user">
          <Icon icon="user" />
        </NavLink>
      </>
    )
  }
  const handleThemeBtnClick = () => dispatch(toggleTheme())
  return (
    <Header>
      <Nav>
        <AppLink to={simple ? '/' : 'app'} aria-label={simple ? 'home' : 'app'}>
          <Icon icon="logo" />
          <LogoText>IKKI</LogoText>
        </AppLink>
        <NavLinks>
          <ThemeButton
            type="button"
            onClick={handleThemeBtnClick}
            aria-label="theme"
          >
            {theme === 'dark' ? <Icon icon="moon" /> : <Icon icon="sun" />}
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
