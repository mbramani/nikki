import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Turnstile from 'react-turnstile'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// react-component
import { Icon } from '../../components'

// rtk query mutations hook
import { useForgotPasswordMutation } from '../../features/user/userSlice'

// styled-components
import { PrimaryButton } from '../../styles/ButtonStyles'
import {
  Form,
  Label,
  Input,
  InputContainer,
  ErrorMessage,
} from '../../styles/FormStyles'
import { FormContainer, LoadingWrapper, Container } from '../login/LoginStyles'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is a required'),
})

export default function ForgotPassword() {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation()
  const theme = useSelector((state) => state.theme.value)

  const [isTurnstileVerified, setIsTurnstileVerified] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    let timer

    if (isSuccess) {
      toast.success('Password reset email sent successfully !', {
        position: toast.POSITION.TOP_RIGHT,
      })

      timer = setTimeout(() => navigate('/', { replace: true }), 2000)
    }

    return () => {
      clearTimeout(timer)

      toast.dismiss()
    }
  }, [isSuccess])

  async function onSubmit(values) {
    try {
      await forgotPassword(values).unwrap()
    } catch (error) {
      toast.error(`${error.data?.msg || error?.error}`, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const formik = useFormik({
    initialValues: { email: '' },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })

  const IsEmailError = formik.touched.email && formik.errors.email

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={formik.handleSubmit}>
          <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={IsEmailError}
            />
            {IsEmailError ? (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            ) : null}
          </InputContainer>
          <Turnstile
            className="turnstile"
            sitekey={
              import.meta.env.DEV
                ? '1x00000000000000000000AA'
                : import.meta.env.VITE_CF_TURNSTILE_KEY
            }
            onVerify={() => setIsTurnstileVerified(true)}
            theme={theme}
          />
          <PrimaryButton type="submit" disabled={isLoading || !isTurnstileVerified}>
            {isLoading ? (
              <LoadingWrapper>
                <Icon icon="loading" /> Submitting...
              </LoadingWrapper>
            ) : (
              'Submit'
            )}
          </PrimaryButton>
        </Form>
      </FormContainer>
      <ToastContainer limit={5} />
    </Container>
  )
}
