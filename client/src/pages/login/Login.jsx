import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// react-component
import { Icon } from '../../components'

// redux-action
import { loginUser } from '../../features/auth/authActions'

// styled-components
import { PrimaryButton } from '../../styles/ButtonStyles'
import {
  Form,
  Label,
  Input,
  InputContainer,
  ErrorMessage,
} from '../../styles/FormStyles'
import {
  Container,
  FormContainer,
  Link,
  LinksContainer,
  LinkText,
  LoadingWrapper,
} from './LoginStyles'

const passwordRegExp = /[0-9a-zA-Z@#$%]{6,18}/

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required(),
  password: yup
    .string()
    .matches(passwordRegExp, 'Please enter a strong password')
    .required(),
})

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const origin = location.state?.from?.pathname || '/app'

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { isLoading, isSuccess, tokens } = auth

  useEffect(() => {
    let timer

    if (isSuccess) {
      toast.success('Login successfully !', {
        position: toast.POSITION.TOP_RIGHT,
      })

      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)

      timer = setTimeout(() => navigate(origin), 1500)
    }
    return () => {
      clearTimeout(timer)

      toast.dismiss()
    }
  }, [isSuccess])

  async function onSubmit(values) {
    try {
      await dispatch(loginUser(values)).unwrap()
    } catch (error) {
      toast.error(`${(error.msg && error.msg) || error}`, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })

  const IsEmailError = formik.touched.email && formik.errors.email
  const IsPasswordError = formik.touched.password && formik.errors.password

  return (
    <Container>
      <FormContainer>
        <Form onSubmit={formik.handleSubmit}>
          <InputContainer>
            <Label>Email</Label>
            <Input
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
            <Label>Password</Label>
            <Input
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
          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoadingWrapper>
                <Icon icon="loading" /> Login...
              </LoadingWrapper>
            ) : (
              'Login'
            )}
          </PrimaryButton>
        </Form>
        <LinksContainer>
          <LinkText>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </LinkText>
          <LinkText>
            Forgot password? <Link to="/reset-password">Reset Password</Link>
          </LinkText>
        </LinksContainer>
      </FormContainer>
      <ToastContainer limit={5} />
    </Container>
  )
}
