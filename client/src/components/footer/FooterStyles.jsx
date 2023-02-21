import tw, { styled } from 'twin.macro'
import { NavLink as NL } from '../navbar/NavbarStyles'

export const FooterContainer = styled.footer`
  ${tw`flex flex-col items-center justify-center h-16 border-b border-gray-200 shadow shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-t dark:from-gray-800/60 dark:to-slate-800/60 from-gray-200/60 to-slate-200/60 backdrop-filter backdrop-blur-lg dark:border-gray-800`}
`
export const NavLink = styled(NL)`
  ${tw`w-fit h-6 md:h-8 text-xs md:text-sm`}
`
export const Copyrights = styled.span`
  ${tw`text-xs m-2`}
`
