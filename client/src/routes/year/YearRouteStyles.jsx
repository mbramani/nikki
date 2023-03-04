import tw, { styled } from 'twin.macro'
import { GradientDiv } from '../RoutesStyles'

export const MonthCardsGrid = styled.div`
  ${tw`grid  mt-4 md:mt-5 gap-4 grid-cols-[repeat(auto-fit, minmax(180px, 1fr))]`}

  a {
    ${tw`rounded focus:ring-2 ring-gray-800 dark:ring-gray-100 focus:outline-none ring-offset-2 dark:ring-offset-gray-900`}
  }
`
export const MonthCard = styled(GradientDiv)`
  ${tw`p-10 font-medium text-center text-gray-900 dark:text-gray-50 hover:ring-2 ring-gray-800 dark:ring-gray-100 focus:outline-none ring-offset-2 dark:ring-offset-gray-900`}

  && {
    ${({ disabled }) =>
      disabled &&
      tw`select-none text-gray-500/80 dark:text-gray-400/80 dark:from-gray-800/20 dark:to-slate-800/20 from-gray-200/20 to-slate-200/20 hover:ring-0 ring-gray-800/10 dark:ring-gray-100/10`}
  }
`
