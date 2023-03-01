import tw, { styled } from 'twin.macro'
import { GradientDiv } from '../RoutesStyles'

export const UserCard = styled(GradientDiv)`
  ${tw`flex flex-col items-center justify-center w-full h-full gap-2 py-8`}
  button {
    ${tw`w-full h-full`}
  }
`
export const UserCardBody = styled.div`
  ${tw`w-fit`}
  p {
    ${tw`mx-2 text-xl font-bold text-left md:text-2xl`}
  }
`
export const UserCardFooter = styled.div`
  ${tw`grid gap-2 md:grid-cols-2`}
`

export const Span = styled.span`
  ${tw`text-lg font-medium md:text-xl`}
`
