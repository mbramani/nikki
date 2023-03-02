import tw, { styled } from 'twin.macro'
import { Container } from '../../styles/Container'
import { NavbarSkeleton } from '../navbar/NavbarStyles'

export const BlockSkeleton = styled(Container)`
  ${tw`z-0 border border-gray-200 rounded-lg shadow h-[75vh] shadow-gray-100 dark:shadow-gray-900 bg-gradient-to-t dark:from-gray-800/60 dark:to-slate-800/60 from-gray-200/60 to-slate-200/60 backdrop-filter backdrop-blur-md dark:border-gray-800 animate-pulse`}
`
export const FromSkeleton = styled(BlockSkeleton)`
  ${tw`max-w-md`}
`
export { NavbarSkeleton }
