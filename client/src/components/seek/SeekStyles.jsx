import { Link } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { GradientDiv } from '../../routes/RoutesStyles'
import { NavLinks } from '../navbar/NavbarStyles'

export const SeekContainer = styled(GradientDiv)`
  ${tw`flex items-center justify-between w-full px-2 rounded-md h-14 md:px-4`}
`
export const SeekLinks = styled(NavLinks)``

export const SeekLink = styled(Link)`
  ${tw`w-8 h-8 p-1 rounded-md shadow shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-b dark:from-gray-800/90 dark:to-slate-800/90 from-gray-200/90 to-slate-200/90 backdrop-filter backdrop-blur-lg hover:ring-2 focus:ring-2 ring-gray-900 dark:ring-gray-50 focus:outline-none`}

  svg {
    ${tw`fill-gray-900 dark:fill-gray-50 `}
  }
`
export const DisableLink = styled.div`
  ${tw`w-8 h-8 p-1 rounded-md shadow shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-b dark:from-gray-800/90 dark:to-slate-800/90 from-gray-200/90 to-slate-200/90 backdrop-filter backdrop-blur-lg`}
  svg {
    ${tw`fill-gray-500 dark:fill-gray-400 `}
  }
`
