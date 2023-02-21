import tw, { styled } from 'twin.macro'
import { Container } from '../../styles/Container'

export const TermsSection = styled.section`
  h1 {
    ${tw`mt-1 mb-4 text-center`}
  }
`
export const TermContainer = styled.div`
  h2 {
    ${tw`mt-2 mb-1`}
  }
  p {
    ${tw`my-1`}
  }
`

export const TermSkeleton = styled(Container)`
  ${tw`z-0 border border-gray-200 rounded-lg shadow h-[75vh] shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-t dark:from-gray-800/60 dark:to-slate-800/60 from-gray-200/60 to-slate-200/60 backdrop-filter backdrop-blur-md dark:border-gray-800 animate-pulse`}
`
