import { useNavigate } from 'react-router-dom'

// data
import quotes from '../../assets/data/quotes'

// utils function
import { getDayOfYear, todayUrl } from '../../utils/date'

// styled-components
import { Container } from '../../styles/Container'
import { Paragraph, PrimaryHeading } from '../../styles/TypographyStyles'
import { PrimaryButton } from '../../styles/ButtonStyles'
import { AppContainer, QuotesContainer, ParagraphContainer } from './AppRouteStyles'

export default function AppRoute() {
  const navigate = useNavigate()
  const todaysQuote = quotes[getDayOfYear() % quotes.length]

  return (
    <Container>
      <AppContainer>
        <QuotesContainer>
          <PrimaryHeading>{todaysQuote.quote}</PrimaryHeading>
          <Paragraph>-{todaysQuote.author}</Paragraph>
        </QuotesContainer>
        <ParagraphContainer>
          <Paragraph>
            This your space for wandering thoughts and ideas. Write about whatever is
            on your mind.
          </Paragraph>
        </ParagraphContainer>
        <PrimaryButton
          type="button"
          onClick={() => {
            navigate(`/app/${todayUrl()}`)
          }}
        >
          Write about today
        </PrimaryButton>
      </AppContainer>
    </Container>
  )
}
