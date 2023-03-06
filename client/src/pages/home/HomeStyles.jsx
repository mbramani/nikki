import tw, { styled } from 'twin.macro'

export const HeroSections = styled.section`
  ${tw`flex flex-col justify-center my-4`}
  h1 {
    ${tw`mb-2 text-3xl text-center`}
  }
  p {
    ${tw`my-2 tracking-normal text-justify text-gray-700 dark:text-gray-200 `}
  }
  button {
    ${tw`px-10 mx-auto my-6 text-xl bg-gradient-to-b dark:from-gray-800/90 dark:to-slate-800/90 from-gray-200/90 to-slate-200/90 backdrop-filter backdrop-blur-lg `}
  }
`
export const HeroImage = styled.div`
  ${tw`my-4 h-72`}

  svg {
    ${tw`h-full mx-auto transition-all delay-1000 `}
  }

  .primary {
    ${tw`fill-gray-200 dark:fill-gray-900`}
  }

  .secondary {
    ${tw`fill-gray-300 dark:fill-gray-700`}
  }
`
export const FeaturesSections = styled.section`
  ${tw`py-2 my-4 border-t border-t-gray-300 dark:border-t-gray-700`}
  h2 {
    ${tw`mt-2 text-center`}
  }
  p {
    ${tw`mb-4 tracking-widest text-center`}
  }
`
export const FeaturesContainer = styled.div`
  ${tw`grid justify-center grid-cols-1 gap-4 md:grid-cols-2`}
`
export const FeatureCard = styled.div`
  ${tw`flex flex-row h-full gap-2 p-2 border border-gray-200 rounded-lg shadow cursor-pointer md:flex-col shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-t dark:from-gray-800/70 dark:to-slate-800/70 from-gray-200/70 to-slate-200/70 backdrop-filter backdrop-blur dark:border-gray-800 hover:ring ring-gray-800 dark:ring-gray-100 ring-offset-2 dark:ring-offset-gray-900`}
`
export const FeatureCardHeader = styled.div`
  ${tw`w-20 h-20 py-2 pr-1 mx-auto my-auto md:w-28 md:h-24 md:p-0 md:my-4`}
  svg {
    ${tw`w-20 h-16 md:h-24 md:w-28 fill-gray-900 dark:fill-gray-50`}
  }
`
export const FeatureCardBody = styled.div`
  h3 {
    ${tw`font-semibold text-center`}
  }
  p {
    ${tw`my-0 text-base tracking-normal text-justify`}
  }
`
