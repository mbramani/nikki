import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Turnstile from 'react-turnstile'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// react-component
import { Icon } from '../../components'

// redux-action
import { registerUser } from '../../features/auth/authActions'

// styled-components
import { PrimaryButton } from '../../styles/ButtonStyles'
import { Container } from './RegisteStyles'
import {
  Form,
  Label,
  Input,
  InputContainer,
  ErrorMessage,
} from '../../styles/FormStyles'
import {
  FormContainer,
  Link,
  LinksContainer,
  LinkText,
  LoadingWrapper,
} from '../login/LoginStyles'

const passwordRegExp = /[0-9a-zA-Z@#$%]{6,18}/

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Should have a minimum 3 characters')
    .required('Name is a required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is a required'),
  password: yup
    .string()
    .matches(passwordRegExp, 'Please enter a strong password')
    .required('Password is a required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not match')
    .required('Confirm Password is a required'),
})

export default function Register() {
  const [isTurnstileVerified, setIsTurnstileVerified] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.value)
  const auth = useSelector((state) => state.auth)
  const { isLoading, isSuccess, tokens } = auth

  useEffect(() => {
    let timer

    if (isSuccess || tokens.accessToken) {
      toast.success('Register successfully !', {
        position: toast.POSITION.TOP_RIGHT,
      })

      timer = setTimeout(() => navigate('/app', { replace: true }), 2000)
    }

    return () => {
      clearTimeout(timer)
      toast.dismiss()
    }
  }, [isSuccess])

  async function onSubmit({ confirmPassword, ...data }) {
    try {
      await dispatch(registerUser(data)).unwrap()
    } catch (error) {
      toast.error(`${error?.msg || error}`, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })

  const IsNameError = formik.touched.name && formik.errors.name
  const IsEmailError = formik.touched.email && formik.errors.email
  const IsPasswordError = formik.touched.password && formik.errors.password
  const isConfirmPasswordError =
    formik.touched.confirmPassword && formik.errors.confirmPassword

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={formik.handleSubmit}>
          <InputContainer>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={IsNameError}
            />
            {IsNameError ? <ErrorMessage>{formik.errors.name}</ErrorMessage> : null}
          </InputContainer>
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
                <Icon icon="loading" /> Registering...
              </LoadingWrapper>
            ) : (
              'Register'
            )}
          </PrimaryButton>
        </Form>
        <LinksContainer>
          <LinkText>
            By registering htmlFor this site you are agreeing to the{' '}
            <Link to="/terms">Terms & Conditions</Link>
          </LinkText>
          <LinkText>
            Already have an account? <Link to="/login">Login</Link>
          </LinkText>
        </LinksContainer>
      </FormContainer>
      <ToastContainer limit={5} />
    </Container>
  )
}
