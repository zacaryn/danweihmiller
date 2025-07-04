import styled from '@emotion/styled';
import expLogo from '../../assets/images/exp_realty_logo.png';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  margin-top: auto;
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  
  @media (max-width: 768px) {
    flex: 0 0 100%;
    min-width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: ${props => props.theme.spacing.sm};
    position: relative;
    display: inline-block;
    color: ${props => props.theme.colors.white};
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -4px;
      width: 100%;
      height: 2px;
      background-color: ${props => props.theme.colors.accent};
      transition: ${props => props.theme.transitions.default};
      transform: scaleX(0.7);
      transform-origin: center;
    }
    
    &:hover::after {
      transform: scaleX(1);
    }
  }

  p {
    margin-bottom: 0.5rem;
    opacity: 0.8;
  }

  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    display: inline-block;
    opacity: 0.8;

    &:hover {
      color: ${props => props.theme.colors.accent};
      transform: translateY(-2px);
      opacity: 1;
    }
  }
`;

const ServeWithLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const BrokerageLogo = styled.img`
  height: 20px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  vertical-align: middle;
`;

const CopyrightSection = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${props => props.theme.spacing.md};
  font-size: 0.9rem;
  opacity: 0.7;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    padding-left: ${props => props.theme.spacing.sm};
    padding-right: ${props => props.theme.spacing.sm};
  }
  
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    opacity: 0.8;
    transition: ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.accent};
      opacity: 1;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h3>Dan Weihmiller</h3>
          <p>Serving Colorado Springs with</p>
          <ServeWithLogo>
            <BrokerageLogo src={expLogo} alt="eXp Realty" />
          </ServeWithLogo>
          <p style={{ marginTop: '1rem' }}>
            <a href="tel:7193018257">(719) 301-8257</a>
          </p>
          <p>
            <a href="mailto:dan@danweihmiller.com">dan@danweihmiller.com</a>
          </p>
        </FooterSection>
        <FooterSection>
          <h3>Site Map</h3>
          <p><a href="/">Home</a></p>
          <p><a href="/search">Search Properties</a></p>
          <p><a href="/listings">My Listings</a></p>
          <p><a href="/resources">Resources</a></p>
          <p><a href="/about">About Dan</a></p>
          <p><a href="/contact">Contact</a></p>
        </FooterSection>
        <FooterSection>
          <h3>Popular Resources</h3>
          <p><a href="/resources/military-relocation">Military Relocation</a></p>
          <p><a href="/resources/va-loans">VA Loans</a></p>
          <p><a href="/resources/first-time-home-buyers">First Time Buyers</a></p>
          <p><a href="/resources/listing-agent">Listing Agent</a></p>
        </FooterSection>
        <FooterSection>
          <h3>More Resources</h3>
          <p><a href="/resources/new-construction">New Construction</a></p>
          <p><a href="/resources/custom-home-building">Custom Homes</a></p>
          <p><a href="/resources/land">Buying Land</a></p>
          <p><a href="/resources/single-family-home">Single Family Homes</a></p>
        </FooterSection>
      </FooterContent>
      
      <CopyrightSection>
        © {new Date().getFullYear()} All rights reserved | Website by <a href="https://hh6influential.com" target="_blank" rel="noopener noreferrer">HH6 Influential</a>
      </CopyrightSection>
    </FooterWrapper>
  );
};

export default Footer; 