import React from 'react'
import PropTypes from 'prop-types'

// react component
import Icon from '../Icon'

// styled components
import { SecondaryHeading } from '../../styles/TypographyStyles'
import { DisableLink, SeekContainer, SeekLink, SeekLinks } from './SeekStyles'

export default function Seek({ title, prev, next, disableNext }) {
  return (
    <SeekContainer>
      <SecondaryHeading>{title}</SecondaryHeading>
      <SeekLinks>
        <SeekLink to={`/app/${prev}`} aria-label="previous">
          <Icon icon="prev" />
        </SeekLink>
        {disableNext ? (
          <DisableLink>
            <Icon icon="next" />
          </DisableLink>
        ) : (
          <SeekLink to={`/app/${next}`} aria-label="next">
            <Icon icon="next" />
          </SeekLink>
        )}
      </SeekLinks>
    </SeekContainer>
  )
}

Seek.propTypes = {
  title: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired,
  next: PropTypes.string,
  disableNext: PropTypes.bool,
}

Seek.defaultProps = {
  next: '',
  disableNext: false,
}
