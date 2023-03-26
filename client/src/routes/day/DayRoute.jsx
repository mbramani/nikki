import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { addDays, subDays, format, isAfter, startOfYesterday } from 'date-fns'
import 'react-toastify/dist/ReactToastify.css'

// react component
import { Seek } from '../../components'

// react hook
import useDebounce from '../../hooks/useDebounce'

// rtk query hooks
import {
  useAddPageMutation,
  useGetPageQuery,
  useUpdatePageMutation,
} from '../../features/page/pageSlice'

// utils function
import { isDateValid } from '../../utils/date'

// styled components
import { Container } from '../../styles/Container'
import {
  PageContainer,
  PageHeader,
  PageSkeleton,
  PageTextArea,
} from './DayRouteStyles'
import { Button, PrimaryButton } from '../../styles/ButtonStyles'

export default function DayRoute() {
  const { day, month, year } = useParams()
  const currentDay = new Date(year, month - 1, day)

  if (!isDateValid(currentDay)) {
    return <Navigate to="/" replace />
  }

  const [page, setPage] = useState('')
  const debouncedPage = useDebounce(page, 6000)

  const getPageResult = useGetPageQuery({ day, month, year })
  const [addPage, addPageResult] = useAddPageMutation()
  const [updatePage, updatePageResult] = useUpdatePageMutation()

  useEffect(() => {
    if (getPageResult.data || getPageResult.data?.data === '') {
      setPage(getPageResult.data?.data)
    }
  }, [getPageResult.data])

  useEffect(() => {
    if (debouncedPage) {
      updatePage({ day, month, year, data: debouncedPage })
    }
  }, [debouncedPage])

  const createPage = async () => {
    try {
      await addPage({ day, month, year }).unwrap()
      setPage(addPageResult?.data?.data)
      toast.success('Page created successfully !')
    } catch (error) {
      toast.error(`${error?.data?.msg || error.error}`)
    }
  }

  let pageContent
  if (getPageResult.isLoading || getPageResult.isFetching) {
    pageContent = <PageSkeleton />
  } else if (getPageResult.error?.status === 404) {
    pageContent = (
      <PageContainer>
        <PrimaryButton aria-label="create page" onClick={() => createPage()}>
          {addPageResult.isLoading ? 'Creating Page...' : 'Create Page'}
        </PrimaryButton>
      </PageContainer>
    )
  } else if (getPageResult.isSuccess) {
    pageContent = (
      <PageContainer>
        <PageTextArea
          autoFocus
          value={page}
          onChange={(e) => setPage(e.target?.value)}
          aria-multiline
          placeholder="Start Writing..."
        />
      </PageContainer>
    )
  }

  return (
    <Container>
      <Seek
        title={format(currentDay, 'yyy MMM dd - eeee')}
        prev={format(subDays(currentDay, 1), 'yyy/MM/dd')}
        next={format(addDays(currentDay, 1), 'yyy/MM/dd')}
        disableNext={isAfter(currentDay, startOfYesterday())}
      />
      <PageHeader>
        {!getPageResult.isFetching && getPageResult.isSuccess && (
          <Button
            type="button"
            aria-label="save"
            disabled={updatePageResult.isLoading}
            onClick={() => {
              updatePage({ day, month, year, data: page })
            }}
          >
            {updatePageResult.isLoading ? 'saving...' : 'save'}
          </Button>
        )}
      </PageHeader>
      {pageContent}
      <ToastContainer limit={5} />
    </Container>
  )
}
