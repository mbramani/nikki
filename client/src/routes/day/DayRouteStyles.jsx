import tw, { styled } from 'twin.macro'
import { GradientDiv } from '../RoutesStyles'

export const PageContainer = styled(GradientDiv)`
  ${tw`[height: calc(100vh - 275px)] w-full  flex flex-col justify-center items-center`}
`
export const PageSkeleton = styled(PageContainer)`
  ${tw` animate-pulse`}
`
export const PageTextArea = styled.textarea`
  ${tw`[flex-grow: 0.85] relative rounded min-h-full w-full bg-transparent px-2 py-1 focus:ring-2 ring-gray-800 dark:ring-gray-100 focus:outline-none ring-offset-4 dark:ring-offset-gray-900`}
`
export const PageHeader = styled.div`
  ${tw`w-full h-6 my-1 md:my-2 px-1`}
`
