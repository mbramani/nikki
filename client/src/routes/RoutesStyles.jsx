import tw, { styled } from 'twin.macro'

export const SectionContainer = styled.section`
  ${tw`flex flex-col items-center justify-center w-full h-full max-w-xl mx-auto`}

  button {
    ${tw`h-12 mt-2 mb-1 text-lg font-medium w-fit bg-gradient-to-b dark:from-gray-800/80 dark:to-slate-800/80 from-gray-200/80 to-slate-200/80 hover:ring-2 focus:ring-2`}
  }
`
export const GradientDiv = styled.div`
  ${tw`border rounded-lg shadow-2xl dark:border-gray-800 shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-t dark:from-gray-800/60 dark:to-slate-800/60 from-gray-200/60 to-slate-200/60 backdrop-filter backdrop-blur-lg`}
`
