import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//  rtk query mutations hook
import { useUpdateUserMutation } from '../../features/user/userSlice'

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

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Should have a minimum 3 characters')
    .required('Name is a required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is a required'),
})

export default function UserModal({ userDetails, toggleUserModal }) {
  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation()

  useEffect(() => {
    let timer

    if (isSuccess) {
      timer = setTimeout(() => toggleUserModal(), 1500)
    }

    return () => clearTimeout(timer)
  }, [isSuccess])

  async function onSubmit({ email, name }) {
    try {
      if (email === userDetails.email) {
        await updateUser({ name }).unwrap()
      } else {
        await updateUser({ email, name }).unwrap()
      }

      toast.success('User updated successfully !')
    } catch (error) {
      toast.error(`${error?.data?.msg || error.error}`, {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  }

  const formik = useFormik({
    initialValues: { name: userDetails.name, email: userDetails.email },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })

  const IsNameError = formik.touched.name && formik.errors.name
  const IsEmailError = formik.touched.email && formik.errors.email

  return (
    <ModalBackground tabIndex={0} aria-modal="true" aria-hidden="true">
      <ModalContainer>
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
              onClick={toggleUserModal}
            >
              Cancel
            </PrimaryButton>
          </ModalFooter>
        </Form>
      </ModalContainer>
    </ModalBackground>
  )
}

UserModal.propTypes = {
  userDetails: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  toggleUserModal: PropTypes.func.isRequired,
}
