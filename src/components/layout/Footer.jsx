import styled from '@emotion/styled';
import expLogo from '../../assets/images/exp_realty_logo.png';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  margin-top: auto;
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm};
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
`;

const FooterSection = styled.div`
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
      bottom: -4px;
      width: 0;
      height: 2px;
      background-color: ${props => props.theme.colors.accent};
      transition: ${props => props.theme.transitions.default};
    }
    
    &:hover::after {
      width: 100%;
    }
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
      
      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  p {
    margin-bottom: 0.5rem;
    opacity: 0.8;
    
    @media (max-width: 768px) {
      margin-bottom: 0.75rem;
    }
  }

  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    display: inline-block;
    opacity: 0.8;

    &:hover {
      color: ${props => props.theme.colors.accent};
      transform: translateX(4px);
      opacity: 1;
    }
    
    @media (max-width: 768px) {
      &:hover {
        transform: none;
      }
    }
  }
`;

const BrokerageSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const BrokerageLogo = styled.img`
  height: 20px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.9;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h3>Dan Weihmiller</h3>
          <p>Serving the Front Range</p>
          <p>of Colorado Springs</p>
          <BrokerageSection>
            <BrokerageLogo src={expLogo} alt="eXp Realty" />
          </BrokerageSection>
        </FooterSection>
        <FooterSection>
          <h3>Contact</h3>
          <p>
            <a href="tel:7193018257">(719) 301-8257</a>
          </p>
          <p>
            <a href="mailto:dan@danweihmiller.com">dan@danweihmiller.com</a>
          </p>
        </FooterSection>
        <FooterSection>
          <h3>Quick Links</h3>
          <p><a href="/listings">View Listings</a></p>
          <p><a href="/about">About Dan</a></p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: '0.7' }}>
            © {new Date().getFullYear()} All rights reserved | Website by <a href="https://hh6.io" target="_blank" rel="noopener noreferrer" style={{ opacity: '0.8' }}>HH6 Influential</a>
          </p>
        </FooterSection>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer; 