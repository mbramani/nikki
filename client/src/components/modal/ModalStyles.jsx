import tw, { styled } from 'twin.macro'
import { GradientDiv } from '../../routes/RoutesStyles'

export const ModalBackground = styled.div`
  ${tw`outline-none fixed z-[1000] top-0 left-0 w-full h-full bg-slate-100/50 dark:bg-slate-800/50 overflow-y-auto overflow-x-hidden transition-opacity`}
`

export const ModalContainer = styled(GradientDiv)`
  ${tw`relative flex flex-col items-center w-auto h-full max-w-sm py-12 mx-4 mt-20 transition duration-500 ease-in-out delay-100 shadow-2xl rounded-xl md:mt-24 md:mx-auto max-h-96 md:max-w-lg`}
`
export const ModalFooter = styled.div`
  ${tw`my-6`}
  button {
    ${tw`w-24 mx-3 text-center`}
  }
`
