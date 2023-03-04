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

    if (isDisabled) {
      dayCards.push(
        <DayCard disabled key={i}>
          <DayCardBanner disabled>
            {format(new Date(year, month - 1, i + 1), 'eee')}
          </DayCardBanner>
          <DayCardContent>{i + 1}</DayCardContent>
        </DayCard>
      )
    } else {
      dayCards.push(
        <Link
          key={i}
          to={`/app${format(new Date(year, month - 1, i + 1), '/yyyy/MM/dd')}`}
        >
          <DayCard key={i}>
            <DayCardBanner>
              {format(new Date(year, month - 1, i + 1), 'eee')}
            </DayCardBanner>
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
