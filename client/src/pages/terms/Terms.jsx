import PropTypes from 'prop-types'

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

export function Paragraphs({ paragraphsArr, index }) {
  return paragraphsArr.map((paragraph, paragraphIndex) => (
    <Paragraph key={`${paragraph.substring(0, paragraphIndex)}_${index}`}>
      {paragraph}
    </Paragraph>
  ))
}

export default function Terms() {
  return (
    <Container>
      <TermsSection>
        <PrimaryHeading>Terms & Conditions</PrimaryHeading>
        <Paragraph>Last updated: 2023-02-28</Paragraph>
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

Paragraphs.prototype = {
  paragraphsArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
}
