import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import fileDownload from 'js-file-download'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// react components
import { Icon, UserModal, UserPasswordModal } from '../../components'

// rtk query
import { apiSlice } from '../../features/api/apiSlice'
import { useLazyGetAllPagesQuery } from '../../features/page/pageSlice'
import { useGetUserQuery } from '../../features/user/userSlice'

// redux action
import { logoutUser } from '../../features/auth/authSlice'

// styled-components
import { PrimaryButton } from '../../styles/ButtonStyles'
import { Container } from '../../styles/Container'
import { Paragraph } from '../../styles/TypographyStyles'
import { SectionContainer } from '../RoutesStyles'
import { LoadingWrapper } from '../../pages/login/LoginStyles'
import { Span, UserCard, UserCardBody, UserCardFooter } from './UserRouteStyles'

export default function UserRoute() {
  const [isModalOpen, setIsModalOpen] = useState({
    user: false,
    userPassword: false,
  })

  const { data: userDetails } = useGetUserQuery('user')
  const [trigger, { isLoading }] = useLazyGetAllPagesQuery()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toggleModal = (modalName) =>
    setIsModalOpen((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }))

  const handleExport = async () => {
    try {
      const result = await trigger()
      fileDownload(JSON.stringify(result.data), 'data.json')
      toast.success('Data Exported successfully !')
    } catch (error) {
      toast.error(`${error?.data?.msg || error.error}`)
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(apiSlice.util.resetApiState())
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/', { replace: true })
  }

  return (
    <Container>
      <SectionContainer>
        <ToastContainer limit={5} />
        <UserCard>
          <UserCardBody>
            <Paragraph>
              Name : <Span>{userDetails?.name}</Span>
            </Paragraph>
            <Paragraph>
              Email : <Span>{userDetails?.email}</Span>
            </Paragraph>
          </UserCardBody>
          <UserCardFooter>
            <PrimaryButton
              aria-label="edit profile"
              type="button"
              onClick={() => toggleModal('user')}
            >
              Edit
            </PrimaryButton>
            <PrimaryButton
              aria-label="update password"
              type="button"
              onClick={() => toggleModal('userPassword')}
            >
              Update Password
            </PrimaryButton>
            <PrimaryButton
              aria-label="export data"
              type="button"
              onClick={() => handleExport()}
            >
              {isLoading ? (
                <LoadingWrapper>
                  <Icon icon="loading" />
                </LoadingWrapper>
              ) : (
                'Export Data'
              )}
            </PrimaryButton>
            <PrimaryButton
              aria-label="log out"
              type="button"
              onClick={() => handleLogout()}
            >
              LogOut
            </PrimaryButton>
          </UserCardFooter>
        </UserCard>
        {isModalOpen.user &&
          createPortal(
            <UserModal
              userDetails={userDetails}
              toggleUserModal={() => toggleModal('user')}
            />,
            document.body
          )}
        {isModalOpen.userPassword &&
          createPortal(
            <UserPasswordModal
              toggleUserPasswordModal={() => toggleModal('userPassword')}
            />,
            document.body
          )}
      </SectionContainer>
    </Container>
  )
}
