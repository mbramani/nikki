import tw, { styled } from 'twin.macro'
import { GradientDiv } from '../RoutesStyles'

export const DayCardsGrid = styled.div`
  ${tw`grid  mt-4 md:mt-5 gap-4 grid-cols-[repeat(auto-fit, minmax(100px, 1fr))]`}

  a {
    ${tw`rounded focus:ring-2 ring-gray-800 dark:ring-gray-100 focus:outline-none ring-offset-2 dark:ring-offset-gray-900`}
  }
`
export const DayCard = styled(GradientDiv)`
  ${tw`font-medium text-center text-gray-900 dark:text-gray-50 hover:ring-2 ring-gray-800 dark:ring-gray-100 focus:outline-none ring-offset-2 dark:ring-offset-gray-900`}

  && {
    ${({ disabled }) =>
      disabled &&
      tw`select-none text-gray-500/80 dark:text-gray-400/80 dark:from-gray-800/20 dark:to-slate-800/20 from-gray-200/20 to-slate-200/20 hover:ring-0 ring-gray-800/10 dark:ring-gray-100/10`}
  }
`
export const DayCardBanner = styled.div`
  ${tw`relative py-1 text-sm border-b rounded-t -top-0 dark:border-gray-800 bg-gradient-to-t dark:from-gray-800/80 dark:to-slate-800/80 from-gray-200/80 to-slate-200/80 backdrop-filter backdrop-blur-md`}

  && {
    ${({ disabled }) =>
      disabled &&
      tw`dark:from-gray-800/20 dark:to-slate-800/20 from-gray-200/20 to-slate-200/20`}
  }
`
export const DayCardContent = styled.div`
  ${tw`px-6 py-5`}
`
