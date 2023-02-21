// styled-components
import { NavLinks } from '../navbar/NavbarStyles'
import { FooterContainer, NavLink, Copyrights } from './FooterStyles'

export default function Footer() {
  return (
    <FooterContainer>
      <NavLinks>
        <NavLink
          to="https://github.com/mbramani/nikki"
          target="blank"
          area-label="github"
        >
          View on GitHub
        </NavLink>
        <NavLink to="terms" aria-label="terms of service">
          Terms of Service
        </NavLink>
        <NavLink to="privacy" aria-label="privacy policy">
          Privacy Policy
        </NavLink>
      </NavLinks>
      <Copyrights>&copy; Nikki. All Rights Reserved</Copyrights>
    </FooterContainer>
  )
}
