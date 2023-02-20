import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle({
  '*': {
    ...tw`transition-all ease-in-out scroll-smooth`,
  },
  body: {
    ...tw`font-sans text-gray-900 bg-slate-50 dark:bg-slate-900 dark:text-gray-50`,
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
