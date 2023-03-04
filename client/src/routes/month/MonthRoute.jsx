import { Link, useParams } from 'react-router-dom'
import {
  isAfter,
  isThisYear,
  isThisMonth,
  format,
  addMonths,
  subMonths,
  getDaysInMonth,
  startOfMonth,
} from 'date-fns'

// react component
import { Seek } from '../../components'

// styled component
import { Container } from '../../styles/Container'
import {
  DayCard,
  DayCardBanner,
  DayCardContent,
  DayCardsGrid,
} from './MonthRouteStyles'

export default function MonthRoute() {
  const { year, month } = useParams()
  const currentDay = new Date(year, month - 1)

  let dayIndexesToInclude = 31
  if (isThisYear(currentDay)) {
    dayIndexesToInclude = new Date().getDate()
  }

  const dayCards = []

  for (let i = 0; i < getDaysInMonth(currentDay); i++) {
    const isDisabled = dayIndexesToInclude <= i && isThisMonth(currentDay)

    const date = new Date(year, month - 1, i + 1)
    if (isDisabled) {
      dayCards.push(
        <DayCard key={i} disabled aria-disabled aria-label={i}>
          <DayCardBanner disabled>{format(date, 'eee')}</DayCardBanner>
          <DayCardContent>{i + 1}</DayCardContent>
        </DayCard>
      )
    } else {
      dayCards.push(
        <Link key={i} to={`/app${format(date, '/yyyy/MM/dd')}`} aria-label={i}>
          <DayCard>
            <DayCardBanner>{format(date, 'eee')}</DayCardBanner>
            <DayCardContent>{i + 1}</DayCardContent>
          </DayCard>
        </Link>
      )
    }
  }

  return (
    <Container>
      <Seek
        title={format(currentDay, 'yyyy MMMM')}
        prev={format(subMonths(currentDay, 1), 'yyyy/MM')}
        next={format(addMonths(currentDay, 1), 'yyyy/MM')}
        disableNext={isAfter(currentDay, startOfMonth(subMonths(new Date(), 1)))}
      />
      <DayCardsGrid>{dayCards}</DayCardsGrid>
    </Container>
  )
}
