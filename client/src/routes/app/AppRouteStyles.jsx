import tw, { styled } from 'twin.macro'
import { SectionContainer } from '../RoutesStyles'

export const AppContainer = styled(SectionContainer)`
  h1 {
    ${tw`tracking-wider text-center`}
  }
  p {
    ${tw`tracking-widest text-center`}
  }
`
export const QuotesContainer = styled.div`
  ${tw`my-8`}
  p {
    ${tw`mt-2`}
  }
`
export const ParagraphContainer = styled.div`
  ${tw`mx-4`}
  p {
    ${tw`my-4`}
  }
`
