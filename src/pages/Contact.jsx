import styled from '@emotion/styled';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from '../components/contact/ContactForm';
import SEO from '../components/shared/SEO';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    color: ${props => props.theme.colors.text};
  }
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
  h2 {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
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
  display: flex;
  align-items: center;
  gap: 1rem;

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

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    background-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.primary};
    border-radius: 50%;
  }

  .content {
    flex: 1;
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

const SocialSection = styled.div`
  margin-top: 3rem;
  
  h2 {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  transition: ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.small};
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

const SocialCard = styled(ContactCard)`
  margin-top: 2rem;
  text-align: center;
  padding: 2rem;
`;

const Contact = () => {
  return (
    <>
      <SEO 
        pageName="Contact" 
        description="Get in touch with Dan Weihmiller, expert real estate agent in Colorado Springs. Whether you're buying, selling, or have questions about the market, I'm here to help."
        useProfileImage={true}
      />
      
      <ContactContainer>
        <ContactHeader>
          <h1>Get in Touch</h1>
          <p>
            Looking to buy or sell property in the Front Range of Colorado Springs? 
            I'm here to help answer any of your real estate questions and guide you 
            through the process.
          </p>
        </ContactHeader>
        
        {/* Inquiry Form with Card - Front and Center */}
        <ContactCard style={{ marginBottom: '3rem' }}>
          <ContactForm />
        </ContactCard>
        
        <ContactGrid>
          <ContactInfo>
            <h2>Contact Information</h2>
            
            <ContactCard>
              <ContactMethod>
                <div className="icon">
                  <FaPhone />
                </div>
                <div className="content">
                  <h3>Phone</h3>
                  <a href="tel:7193018257">(719) 301-8257</a>
                </div>
              </ContactMethod>

              <ContactMethod>
                <div className="icon">
                  <FaEnvelope />
                </div>
                <div className="content">
                  <h3>Email</h3>
                  <a href="mailto:buildingincolorado22@gmail.com">buildingincolorado22@gmail.com</a>
                </div>
              </ContactMethod>

              <ContactMethod>
                <div className="icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="content">
                  <h3>Office</h3>
                  <p>EXP Realty LLC</p>
                  <p>9800 Pyramid Ct #400, Englewood</p>
                  <a href="tel:8884402724">(888) 440-2724</a>
                </div>
              </ContactMethod>

              <ContactMethod>
                <div className="icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="content">
                  <h3>Location</h3>
                  <p>Colorado Springs, CO</p>
                </div>
              </ContactMethod>
            </ContactCard>
          </ContactInfo>

          <div>
            <ContactCard style={{ marginBottom: '2rem' }}>
              <h2>Office Hours</h2>
              <p>Available Monday through Saturday</p>
              <p>9:00 AM - 6:00 PM</p>
              <p style={{ marginTop: '1rem' }}>
                For urgent matters, please don't hesitate to call or email outside of regular hours.
              </p>
            </ContactCard>
            
            <SocialCard>
              <h2>Follow Dan on Social Media</h2>
              <p>Get the latest updates on new properties, market trends, and real estate advice.</p>
              
              <SocialLinks style={{ justifyContent: 'center' }}>
                <SocialButton href="#" title="Facebook" aria-label="Facebook">
                  <FaFacebookF />
                </SocialButton>
                <SocialButton href="https://www.linkedin.com/in/danweihmiller/" title="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </SocialButton>
                <SocialButton href="#" title="Instagram" aria-label="Instagram">
                  <FaInstagram />
                </SocialButton>
              </SocialLinks>
            </SocialCard>
          </div>
        </ContactGrid>
      </ContactContainer>
    </>
  );
};

export default Contact; 