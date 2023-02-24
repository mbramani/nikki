import { Link as Ln } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { Container as MainContainer } from '../../styles/Container'

export const Container = styled(MainContainer)`
  ${tw`h-[75vh] flex justify-center items-center`}
`
export const FormContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full h-full max-w-md border rounded-lg shadow-2xl dark:border-gray-800 shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-t dark:from-gray-800/60 dark:to-slate-800/60 from-gray-200/60 to-slate-200/60 backdrop-filter backdrop-blur-lg`}

  button {
    ${tw`w-full h-12 mt-2 mb-1 text-lg font-medium bg-gradient-to-b dark:from-gray-800/80 dark:to-slate-800/80 from-gray-200/80 to-slate-200/80 hover:ring-2 focus:ring-2`}
  }
`
export const LoadingWrapper = styled.div`
  ${tw`flex flex-row items-center justify-center w-full`}
  svg {
    ${tw`w-5 h-5 mr-3 -ml-4 animate-spin`}
  }
  circle {
    ${tw`opacity-25`}
  }
  path {
    ${tw`opacity-75`}
  }
`
export const LinksContainer = styled.div`
  ${tw`w-64 my-2 ml-1 h-fit`}
`
export const LinkText = styled.div`
  ${tw`my-1 text-base `}
`
export const Link = styled(Ln)`
  ${tw`font-medium underline underline-offset-2 hover:underline-offset-4`}
`
