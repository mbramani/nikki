import tw, { styled } from 'twin.macro'

export const PrimaryButton = styled.button`
  ${tw`h-10 px-4 py-2 rounded-md shadow w-fit shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-b dark:from-gray-800/80 dark:to-slate-800/80 from-gray-200/80 to-slate-200/80 backdrop-filter backdrop-blur-lg hover:ring focus:ring ring-gray-800 dark:ring-gray-100 focus:outline-none ring-offset-2 dark:ring-offset-gray-900`}
`
export const Button = styled.button`
  ${tw`h-8`}
`
