import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle({
  '*': {
    ...tw`transition-all ease-in-out scroll-smooth`,
  },
  body: {
    ...tw`font-sans text-gray-900 bg-gradient-to-b from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 dark:text-slate-50`,
  },
})

export default function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <CustomStyles />
    </>
  )
}
