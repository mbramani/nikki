import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Turnstile from 'react-turnstile'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// react-component
import { Icon } from '../../components'

// rtk query mutations hook
import { useResetUserPasswordMutation } from '../../features/user/userSlice'

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

const passwordRegExp = /[0-9a-zA-Z@#$%]{6,18}/

const validationSchema = yup.object({
  password: yup
    .string()
    .matches(passwordRegExp, 'Please enter a strong password')
    .required('Password is a required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match')
    .required('Confirm Password is a required'),
})

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const resetToken = searchParams.get('token')

  const [resetUserPassword, { isLoading, isSuccess }] =
    useResetUserPasswordMutation()
  const theme = useSelector((state) => state.theme.value)

  const [isTurnstileVerified, setIsTurnstileVerified] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    let timer

    if (!resetToken) {
      toast.error('Token is invalid !', {
        position: toast.POSITION.TOP_RIGHT,
      })

      timer = setTimeout(() => navigate('/', { replace: true }), 1500)
    }

    if (isSuccess) {
      timer = setTimeout(() => navigate('/login', { replace: true }), 1500)
    }

    return () => {
      clearTimeout(timer)

      toast.dismiss()
    }
  }, [isSuccess])

  async function onSubmit(values) {
    try {
      await resetUserPassword({ resetToken, newPassword: values.password }).unwrap()

      toast.success('Password updated successfully !', {
        position: toast.POSITION.TOP_RIGHT,
      })
    } catch (error) {
      toast.error(`${error.data?.msg || error?.error}`, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })

  const IsPasswordError = formik.touched.password && formik.errors.password
  const isConfirmPasswordError =
    formik.touched.confirmPassword && formik.errors.confirmPassword

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={formik.handleSubmit}>
          <InputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={IsPasswordError}
            />
            {IsPasswordError ? (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            ) : null}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="text"
              placeholder="Repeat Password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={isConfirmPasswordError}
            />
            {isConfirmPasswordError ? (
              <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
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
