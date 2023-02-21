// data
import terms from '../../assets/data/terms'

// styled-components
import { TermContainer, TermsSection } from './TermsStyles'
import { Container } from '../../styles/Container'
import {
  Paragraph,
  PrimaryHeading,
  SecondaryHeading,
} from '../../styles/TypographyStyles'

const Paragraphs = ({ paragraphsArr, index }) =>
  paragraphsArr.map((paragraph, paragraphIndex) => (
    <Paragraph key={`${paragraph.substring(0, paragraphIndex)}_${index}`}>
      {paragraph}
    </Paragraph>
  ))

export default function Terms() {
  return (
    <Container>
      <TermsSection>
        <PrimaryHeading>Terms & Conditions</PrimaryHeading>
        {terms.map((obj, index) => (
          <TermContainer key={`${obj.heading}_${index}`}>
            <SecondaryHeading>{obj.heading}</SecondaryHeading>
            <Paragraphs paragraphsArr={obj.paragraphs} index={index} />
          </TermContainer>
        ))}
      </TermsSection>
    </Container>
  )
}
