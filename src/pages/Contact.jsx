import styled from '@emotion/styled';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  h1 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.text};
  }
`;

const ContactMethod = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
  transition: ${props => props.theme.transitions.default};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};

  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
  }
  
  h3 {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    font-size: 1.1rem;
    transition: ${props => props.theme.transitions.fast};
    display: inline-block;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      transform: translateX(4px);
    }
  }
`;

const ContactCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.default};

  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
    transform: translateY(-2px);
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <ContactGrid>
        <ContactInfo>
          <h1>Get in Touch</h1>
          <p>
            Looking to buy or sell property in the Front Range of Colorado Springs? 
            I'm here to help answer any of your real estate questions and guide you 
            through the process.
          </p>
          
          <ContactCard>
            <ContactMethod>
              <h3>Phone</h3>
              <a href="tel:7193018257">(719) 301-8257</a>
            </ContactMethod>

            <ContactMethod>
              <h3>Email</h3>
              <a href="mailto:danielweihmiller@gmail.com">danielweihmiller@gmail.com</a>
            </ContactMethod>

            <ContactMethod>
              <h3>Location</h3>
              <p>Colorado Springs, CO</p>
            </ContactMethod>
          </ContactCard>
        </ContactInfo>

        <ContactCard>
          <h2>Office Hours</h2>
          <p>Available Monday through Saturday</p>
          <p>9:00 AM - 6:00 PM</p>
          <p style={{ marginTop: '1rem' }}>
            For urgent matters, please don't hesitate to call or email outside of regular hours.
          </p>
        </ContactCard>
      </ContactGrid>
    </ContactContainer>
  );
};

export default Contact; 