import tw, { styled } from 'twin.macro'
import {
  Container as MainContainer,
  FormContainer as FC,
} from '../login/LoginStyles'

export const Container = styled(MainContainer)`
  ${tw`min-h-screen h-full`}
`
export const FormContainer = styled(FC)`
  ${tw`py-6 h-screen`}
`
