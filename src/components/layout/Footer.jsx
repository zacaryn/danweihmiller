import styled from '@emotion/styled';

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
    
    @media (max-width: 768px) {
      margin-bottom: 0.75rem;
    }
  }

  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    transition: ${props => props.theme.transitions.fast};
    display: inline-block;
    
    &:hover {
      color: ${props => props.theme.colors.accent};
      transform: translateX(4px);
    }
    
    @media (max-width: 768px) {
      &:hover {
        transform: none;
      }
    }
  }
`;

const SocialSection = styled.div`
  margin-top: 1rem;
  display: flex;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin-right: 0.5rem;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
  }
  
  svg {
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <h3>Dan Weihmiller Realty</h3>
          <p>Serving the Front Range</p>
          <p>of Colorado Springs</p>
          <p>EXP Realty LLC</p>
        </FooterSection>
        <FooterSection>
          <h3>Contact</h3>
          <p>
            <a href="tel:7193018257">(719) 301-8257</a>
          </p>
          <p>
            <a href="mailto:buildingincolorado22@gmail.com">buildingincolorado22@gmail.com</a>
          </p>
        </FooterSection>
        <FooterSection>
          <h3>Quick Links</h3>
          <p><a href="/listings">View Listings</a></p>
          <p><a href="/about">About Dan</a></p>
          <p>© {new Date().getFullYear()} All rights reserved</p>
          <p><small>Website by <a href="https://hh6influential.com/" target="_blank" rel="noopener noreferrer">HH6 Influential</a></small></p>
        </FooterSection>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer; 