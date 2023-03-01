import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//  rtk query mutations hook
import { useUpdateUserPasswordMutation } from '../../features/user/userSlice'

// react component
import Icon from '../Icon'

// styled-component
import { LoadingWrapper } from '../../pages/login/LoginStyles'
import { PrimaryButton } from '../../styles/ButtonStyles'
import { ModalBackground, ModalContainer, ModalFooter } from './ModalStyles'
import {
  Form,
  Label,
  InputContainer,
  Input,
  ErrorMessage,
} from '../../styles/FormStyles'

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

export default function UserPasswordModal({ toggleUserPasswordModal }) {
  const [updateUserPassword, { isLoading, isSuccess }] =
    useUpdateUserPasswordMutation()

  useEffect(() => {
    let timer

    if (isSuccess) {
      timer = setTimeout(() => toggleUserPasswordModal(), 1500)
    }

    return () => clearTimeout(timer)
  }, [isSuccess])

  async function onSubmit(values) {
    try {
      await updateUserPassword({ newPassword: values.password }).unwrap()

      toast.success('Password updated successfully !', {
        position: toast.POSITION.TOP_RIGHT,
      })
    } catch (error) {
      toast.error(`${error?.data?.msg || error.error}`, {
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
    <ModalBackground tabIndex={0} aria-modal="true" aria-hidden="true">
      <ModalContainer>
        <Form onSubmit={formik.handleSubmit}>
          <InputContainer>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Your New Password"
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
          <ModalFooter>
            <PrimaryButton aria-label="submit" type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoadingWrapper>
                  <Icon icon="loading" />
                </LoadingWrapper>
              ) : (
                'Submit'
              )}
            </PrimaryButton>
            <PrimaryButton
              aria-label="cancel"
              type="button"
              onClick={toggleUserPasswordModal}
            >
              Cancel
            </PrimaryButton>
          </ModalFooter>
        </Form>
      </ModalContainer>
    </ModalBackground>
  )
}

UserPasswordModal.propTypes = {
  toggleUserPasswordModal: PropTypes.func.isRequired,
}
