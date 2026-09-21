import styled from '@emotion/styled';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import ContactForm from '../components/contact/ContactForm';
import SEO from '../components/shared/SEO';
import {
  PageRoot,
  PageHeader,
  PageMain,
} from '../components/layout/PageShell';
import {
  AGENT_EMAIL,
  AGENT_EMAIL_HREF,
  AGENT_PHONE_HREF,
  BROKERAGE_NAME,
  OFFICE_ADDRESS,
  OFFICE_PHONE,
  OFFICE_PHONE_HREF,
  CB_AGENT_PROFILE_URL,
} from '../config/agent';

const ContactContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.lg};
  padding: 0 ${props => props.theme.spacing.sm};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
    padding: 0;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
`;

const ContactMethod = styled.div`
  margin-bottom: ${props => props.theme.spacing.sm};
  transition: ${props => props.theme.transitions.default};
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
  }
  
  h3 {
    font-size: 1.2rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.xs};

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }

  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    font-size: 1.1rem;
    transition: ${props => props.theme.transitions.fast};
    display: inline-block;
    word-break: break-word;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
      transform: translateX(4px);
    }

    @media (max-width: 768px) {
      font-size: 1rem;
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
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    min-width: 0; // Prevents content from overflowing
  }

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const ContactCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: ${props => props.theme.borders.subtle};
  transition: ${props => props.theme.transitions.default};
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
`;

const SocialSection = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  
  h2 {
    font-size: 1.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
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
    width: 24px;
    height: 24px;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const SocialCard = styled(ContactCard)`
  margin-top: ${props => props.theme.spacing.lg};
  text-align: center;
  padding: ${props => props.theme.spacing.lg};

  @media (max-width: 768px) {
    margin-top: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.md};
    border-radius: 0;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: ${props => props.theme.spacing.md};

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Contact = () => {
  return (
    <>
      <SEO 
        pageName="Contact"
        title="Contact Dan Weihmiller | Coldwell Banker · Colorado Springs"
        description="Contact Dan Weihmiller, Broker with Coldwell Banker Realty. Office: 1755 Telstar Dr. Ste. 250, Colorado Springs, CO 80920. Call (719) 301-8257 for buying, selling, or military relocation."
        useProfileImage={true}
      />
      
      <PageRoot>
        <PageHeader
          eyebrow="Contact · Colorado Springs"
          title="Get in Touch"
          lead="Questions about buying, selling, or relocating? Send a message or call — Dan typically responds within one business day."
          primaryAction={{ to: '/contact', label: 'Send a Message' }}
          secondaryAction={{ to: '/search', label: 'Search Homes' }}
        />
        <PageMain>
          <ContactContainer>
            <ContactCard style={{ marginBottom: '2rem' }}>
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
                  <a href={AGENT_PHONE_HREF}>(719) 301-8257</a>
                </div>
              </ContactMethod>

              <ContactMethod>
                <div className="icon">
                  <FaEnvelope />
                </div>
                <div className="content">
                  <h3>Email</h3>
                  <a href={AGENT_EMAIL_HREF}>{AGENT_EMAIL}</a>
                </div>
              </ContactMethod>

              <ContactMethod>
                <div className="icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="content">
                  <h3>Office</h3>
                  <p>{BROKERAGE_NAME}</p>
                  <p>{OFFICE_ADDRESS}</p>
                  <p>
                    <a href={OFFICE_PHONE_HREF}>{OFFICE_PHONE}</a>
                  </p>
                  <p>
                    <a href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                      Official Coldwell Banker profile
                    </a>
                  </p>
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
                <SocialButton href="https://www.facebook.com/danweihmillerrealtor" title="Facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </SocialButton>
                <SocialButton href="https://www.linkedin.com/in/danweihmiller/" title="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </SocialButton>
                <SocialButton href="https://www.instagram.com/danweihmiller/" title="Instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </SocialButton>
              </SocialLinks>
            </SocialCard>
          </div>
            </ContactGrid>
          </ContactContainer>
        </PageMain>
      </PageRoot>
    </>
  );
};

export default Contact; 