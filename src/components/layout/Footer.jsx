import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import cbLogo from '../../assets/images/CBLogo.png';
import {
  AGENT_EMAIL,
  AGENT_EMAIL_HREF,
  AGENT_PHONE,
  AGENT_PHONE_HREF,
  CB_AGENT_PROFILE_URL,
  BROKERAGE_NAME,
  OFFICE_ADDRESS,
  OFFICE_PHONE,
  OFFICE_PHONE_HREF,
} from '../../config/agent';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl} clamp(1.25rem, 4vw, 2rem) ${props => props.theme.spacing.md};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem 2.5rem;
`;

const FooterSection = styled.div`
  h3 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 0.85rem;
    color: ${props => props.theme.colors.white};
    letter-spacing: 0.02em;
  }

  p {
    margin-bottom: 0.45rem;
    font-size: 0.92rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.78);
  }

  a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-size: 0.92rem;
    transition: ${props => props.theme.transitions.fast};
    display: inline-block;

    &:hover {
      color: ${props => props.theme.colors.white};
    }
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.4rem;
  }
`;

const BrandRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
`;

const BrokerageLogo = styled.img`
  height: 44px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
`;

const LegalBlock = styled.div`
  max-width: 1280px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.78rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.62);

  p {
    margin-bottom: 0.75rem;
  }

  a {
    color: rgba(255, 255, 255, 0.78);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const CopyrightSection = styled.div`
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);

  a {
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;

    &:hover {
      color: ${props => props.theme.colors.white};
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <BrandRow>
            <BrokerageLogo src={cbLogo} alt="Coldwell Banker" />
            <div>
              <h3>Dan Weihmiller</h3>
              <p>{BROKERAGE_NAME}</p>
              <p>Serving Colorado Springs since 1985</p>
            </div>
          </BrandRow>
          <p>{OFFICE_ADDRESS}</p>
          <p>
            Office: <a href={OFFICE_PHONE_HREF}>{OFFICE_PHONE}</a>
          </p>
          <p>
            <a href={AGENT_PHONE_HREF}>{AGENT_PHONE}</a> (Dan)
          </p>
          <p>
            <a href={AGENT_EMAIL_HREF}>{AGENT_EMAIL}</a>
          </p>
          <p>
            <a href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              Coldwell Banker agent profile
            </a>
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Explore</h3>
          <FooterLinks>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search Properties</Link></li>
            <li><Link to="/listings">My Listings</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/about">About Dan</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Resources</h3>
          <FooterLinks>
            <li><Link to="/resources/military-relocation">Military Relocation</Link></li>
            <li><Link to="/resources/va-loans">VA Loans</Link></li>
            <li><Link to="/resources/first-time-home-buyers">First-Time Buyers</Link></li>
            <li><Link to="/resources/listing-agent">Listing Agent</Link></li>
            <li><Link to="/resources/new-construction">New Construction</Link></li>
            <li><Link to="/resources/single-family-home">Single-Family Homes</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Legal & Policies</h3>
          <FooterLinks>
            <li><Link to="/legal/privacy">Privacy Policy</Link></li>
            <li><Link to="/legal/terms">Terms of Use</Link></li>
            <li><Link to="/legal/fair-housing">Fair Housing</Link></li>
            <li><Link to="/legal/accessibility">Accessibility</Link></li>
            <li><Link to="/legal/mls-disclaimer">MLS & IDX Disclaimer</Link></li>
            <li><Link to="/legal/brokerage-disclosure">Brokerage Disclosure</Link></li>
          </FooterLinks>
        </FooterSection>
      </FooterContent>

      <LegalBlock>
        <p>
          <strong>Equal Housing Opportunity.</strong> We do not discriminate on the basis of race, color,
          religion, sex, disability, familial status, national origin, sexual orientation, gender identity,
          or any other protected class.
        </p>
        <p>
          Coldwell Banker® and the Coldwell Banker logos are registered and unregistered service marks owned
          by Coldwell Banker Real Estate LLC. The Coldwell Banker System fully supports the principles of the
          Fair Housing Act and the Equal Opportunity Act. Each office is independently owned and operated.
          This site is operated by Dan Weihmiller, a licensed Colorado real estate agent affiliated with
          Coldwell Banker; it is not the corporate website of Coldwell Banker Real Estate LLC.
        </p>
        <p>
          Listing data on this site is provided in part through IDX / MLS programs and is deemed reliable but
          not guaranteed. See our{' '}
          <Link to="/legal/mls-disclaimer">MLS & IDX Disclaimer</Link> for details.
        </p>
      </LegalBlock>

      <CopyrightSection>
        © {new Date().getFullYear()} Dan Weihmiller. All rights reserved. · Website by{' '}
        <a href="https://hh6influential.com" target="_blank" rel="noopener noreferrer">
          HH6 Influential
        </a>
      </CopyrightSection>
    </FooterWrapper>
  );
};

export default Footer;
