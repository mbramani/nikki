import tw, { styled } from 'twin.macro'
import { Link, NavLink as NL } from 'react-router-dom'

export const Header = styled.header`
  ${tw`flex justify-center h-16 border-b border-gray-200 shadow shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-t dark:from-gray-800/60 dark:to-slate-800/60 from-gray-200/60 to-slate-200/60 backdrop-filter backdrop-blur-lg dark:border-gray-800`}
`
export const NavbarSkeleton = styled(Header)`
  ${tw`animate-pulse`}
`
export const Nav = styled.nav`
  ${tw`flex items-center justify-between w-full max-w-2xl px-2 mx-auto gap-x-10`}
`
export const AppLink = styled(Link)`
  ${tw`flex h-10 p-1 w-fit`}
  svg {
    ${tw`fill-gray-900 dark:fill-gray-50`}
  }
`
export const LogoText = styled.span`
  ${tw`ml-1 text-xl font-medium`}
`
export const NavLinks = styled.div`
  ${tw`flex space-x-3 md:space-x-4 w-fit mr-2`}
`
export const NavLink = styled(NL)`
  ${tw`w-8 h-8 p-1 border-2 border-gray-200 rounded-md shadow shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-b dark:from-gray-800/90 dark:to-slate-800/90 from-gray-200/90 to-slate-200/90 backdrop-filter backdrop-blur-lg dark:border-gray-800 hover:border-gray-900 hover:dark:border-gray-50 `}

  svg {
    ${tw`fill-gray-900 dark:fill-gray-50 `}
  }

  &.active {
    ${tw`border-gray-900 dark:border-gray-50`}
  }
`
export const ThemeButton = styled.button`
  ${tw`w-8 h-8 p-1 border-2 border-gray-200 rounded-md shadow shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-b dark:from-gray-800/90 dark:to-slate-800/90 from-gray-200/90 to-slate-200/90 backdrop-filter backdrop-blur-lg dark:border-gray-800 hover:border-gray-900 hover:dark:border-gray-50 `}

  svg {
    ${tw`fill-gray-900 dark:fill-gray-50`}
  }
`
