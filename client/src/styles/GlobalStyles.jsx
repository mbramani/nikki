import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle({
  '*': {
    ...tw`transition-all ease-in-out scroll-smooth`,
  },
  body: {
    ...tw`font-sans text-gray-900 bg-slate-50 dark:bg-slate-900 dark:text-gray-50`,
  },
  '.Toastify__toast': {
    ...tw`bg-gray-100 dark:bg-gray-800 rounded-md text-gray-900 dark:text-gray-50 border border-gray-200 shadow shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-t dark:from-gray-800/60 dark:to-slate-800/60 from-gray-200/60 to-slate-200/60 backdrop-filter backdrop-blur dark:border-gray-800`,
  },
  '.Toastify__close-button': {
    svg: { ...tw`fill-gray-900 dark:fill-gray-50` },
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
