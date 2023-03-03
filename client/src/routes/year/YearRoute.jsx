import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { addYears, subYears, format, isThisYear, getMonth } from 'date-fns'

// utils function
import { months } from '../../utils/date'

// styled components
import { Seek } from '../../components'
import { Container } from '../../styles/Container'
import { MonthCard, MonthCardDisabled, MonthsGrid } from './YearRouteStyles'

export default function YearRoute() {
  const { year } = useParams()
  const currentDate = new Date(year, 0, 1)

  let monthIndexesToInclude = 11
  if (isThisYear(currentDate)) {
    monthIndexesToInclude = getMonth(new Date())
  }

  return (
    <Container>
      <Seek
        title={year}
        prev={format(subYears(currentDate, 1), 'yyyy')}
        next={format(addYears(currentDate, 1), 'yyyy')}
        disableNext={year >= new Date().getFullYear()}
      />
      <MonthsGrid>
        {months.long.map((month, index) => {
          const isDisabled = monthIndexesToInclude < index
          return isDisabled ? (
            <MonthCardDisabled
              key={`${month}-${index}`}
              aria-label={month}
              aria-disabled
            >
              {month}
            </MonthCardDisabled>
          ) : (
            <Link
              key={`${month}-${index}`}
              aria-label={month}
              to={`/app${format(new Date(year, index), '/yyyy/MM')}`}
            >
              <MonthCard>{month}</MonthCard>
            </Link>
          )
        })}
      </MonthsGrid>
    </Container>
  )
}
