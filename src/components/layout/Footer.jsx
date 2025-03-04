import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  margin-top: auto;
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
  }

  p {
    margin-bottom: 0.5rem;
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
        </FooterSection>
        <FooterSection>
          <h3>Contact</h3>
          <p>
            <a href="tel:7193018257">(719) 301-8257</a>
          </p>
          <p>
            <a href="/contact">Send a Message</a>
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