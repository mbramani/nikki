// react component
import { Paragraphs } from '../terms/Terms'

// data
import privacyPolicy from '../../assets/data/privacyPolicy'

// styled-components
import { PrivacyContainer, PrivacySection } from './PrivacyStyles'
import { Container } from '../../styles/Container'
import {
  Paragraph,
  PrimaryHeading,
  SecondaryHeading,
} from '../../styles/TypographyStyles'

export default function Privacy() {
  return (
    <Container>
      <PrivacySection>
        <PrimaryHeading>Privacy Policy</PrimaryHeading>
        <Paragraph>
          This privacy policy outlines how we collect, use, and protect personal
          information that you provide to us through our website NIKKI. We respect
          your privacy and are committed to protecting your personal information in
          accordance with applicable data protection laws.
        </Paragraph>
        {privacyPolicy.map((obj, index) => (
          <PrivacyContainer key={`${obj.heading}_${index}`}>
            <SecondaryHeading>{obj.heading}</SecondaryHeading>
            <Paragraphs paragraphsArr={obj.paragraphs} index={index} />
          </PrivacyContainer>
        ))}
      </PrivacySection>
    </Container>
  )
}
