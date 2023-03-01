import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
// react-component
import { Icon } from '../../components'

// svg
import { ReactComponent as BookSvg } from '../../assets/images/book.svg'

// data
import features from '../../assets/data/features'
import { PrimaryButton } from '../../styles/ButtonStyles'

// styled-components
import { Container } from '../../styles/Container'
import {
  PrimaryHeading,
  SecondaryHeading,
  TertiaryHeading,
  Paragraph,
} from '../../styles/TypographyStyles'
import {
  HeroImage,
  HeroSections,
  FeaturesSections,
  FeatureCard,
  FeaturesContainer,
  FeatureCardHeader,
  FeatureCardBody,
} from './HomeStyles'

function Feature({ icon, feature, description }) {
  return (
    <FeatureCard>
      <FeatureCardHeader>
        <Icon icon={icon} />
      </FeatureCardHeader>
      <FeatureCardBody>
        <TertiaryHeading>{feature}</TertiaryHeading>
        <Paragraph>{description}</Paragraph>
      </FeatureCardBody>
    </FeatureCard>
  )
}

export default function Home() {
  const navigate = useNavigate()
  return (
    <Container>
      <HeroSections>
        <PrimaryHeading>
          Keep track of your thoughts and memories, effortlessly.
        </PrimaryHeading>
        <Paragraph>
          Our website offers an easy and convenient way to keep track of your
          thoughts and memories. With our user-friendly interface, you can
          effortlessly capture your ideas, experiences, and emotions as they happen.
          Whether you want to remember a special moment, reflect on your growth, or
          simply clear your mind, our website makes it easy to do so. Start
          journaling today and enjoy the benefits of a more mindful, intentional
          life.
        </Paragraph>
        <PrimaryButton
          onClick={() => navigate('register')}
          type="button"
          aria-label="register"
        >
          Start Writing
        </PrimaryButton>
        <HeroImage>
          <BookSvg />
        </HeroImage>
      </HeroSections>
      <FeaturesSections>
        <SecondaryHeading>Features</SecondaryHeading>
        <Paragraph>
          Lightweight with the functionalities you need for journaling, and none of
          the things you don&apos;t:
        </Paragraph>
        <FeaturesContainer>
          {features.map((obj, index) => (
            <Feature
              key={`${obj.feature}_${index}`}
              icon={obj.icon}
              index={index}
              feature={obj.feature}
              description={obj.description}
            />
          ))}
        </FeaturesContainer>
      </FeaturesSections>
    </Container>
  )
}

Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  feature: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
