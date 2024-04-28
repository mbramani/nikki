import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle({
  "*": {
    ...tw`scroll-smooth`,
  },
  body: {
    ...tw`font-sans text-gray-900 transition-all ease-in bg-slate-50 dark:bg-slate-900 dark:text-gray-50 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-200/80 scrollbar-track-slate-50 dark:scrollbar-thumb-gray-800/80 dark:scrollbar-track-slate-900`,
  },
  ".Toastify__toast": {
    ...tw`text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow dark:text-gray-50 shadow-gray-100 dark:shadow-gray-900 dark:bg-gray-800 backdrop-filter backdrop-blur dark:border-gray-800`,
  },
  ".Toastify__close-button": {
    svg: { ...tw`fill-gray-900 dark:fill-gray-50` },
  },
  ".turnstile": {
    ...tw`w-full `,
    iframe: {
      ...tw`max-w-[16rem]`,
    },
  },
});

export default function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <CustomStyles />
    </>
  );
}
