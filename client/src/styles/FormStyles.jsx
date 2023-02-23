import tw, { styled } from 'twin.macro'

export const Form = styled.form`
  ${tw`w-64 h-fit`}
`
export const Label = styled.label`
  ${tw`block mb-1 text-lg `}
`
export const Input = styled.input`
  ${tw`w-full h-12 px-2 text-lg font-normal rounded-md bg-slate-200 dark:bg-slate-700/50 hover:ring-2 focus:ring-2 ring-gray-800 dark:ring-gray-100 focus:outline-none ring-offset-2 dark:ring-offset-gray-900 focus:border-none`}

  ${({ isError }) => isError && tw`border border-red-500`}
`
export const InputContainer = styled.div`
  ${tw`mb-2`}
`
export const ErrorMessage = styled.p`
  ${tw`mt-1 text-sm text-red-500`}
`
