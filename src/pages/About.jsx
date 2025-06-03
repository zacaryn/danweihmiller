import styled from '@emotion/styled';
import sceneImg from '../assets/images/scene.jpg';
import SEO from '../components/shared/SEO';

const AboutContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
  padding-top: calc(80px + ${props => props.theme.spacing.md});

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md} 0;
    padding-top: calc(60px + ${props => props.theme.spacing.md});
  }
`;

const AboutHero = styled.div`
  position: relative;
  background: url(${sceneImg}) center/cover no-repeat;
  height: 300px;
  margin-bottom: ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(23, 51, 107, 0.75),
      rgba(23, 51, 107, 0.35)
    );
  }

  @media (max-width: 768px) {
    height: 200px;
    margin-bottom: ${props => props.theme.spacing.lg};
    border-radius: 0;
  }
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 3rem;
  position: relative;
  z-index: 1;
  text-align: center;
  font-family: 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ContentSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
    border-radius: 0;
    box-shadow: none;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  padding: 0 ${props => props.theme.spacing.xs};

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    padding: 0;
  }

  &:last-of-type {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  transition: ${props => props.theme.transitions.fast};
  text-align: center;
  min-width: 160px;
  border: 2px solid ${props => props.theme.colors.primary};
  margin: 0 ${props => props.theme.spacing.sm};

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  @media (max-width: 768px) {
    width: calc(100% - ${props => props.theme.spacing.md});
    min-width: unset;
    margin: 0 ${props => props.theme.spacing.xs};
  }
`;

const About = () => {
  return (
    <>
      <SEO 
        pageName="About" 
        title="Dan Weihmiller | Colorado Springs Real Estate Expert"
        description="Get to know Dan Weihmiller, dedicated real estate professional serving Colorado Springs. Learn about my experience, background, approach and commitment to excellence in real estate."
        useProfileImage={true}
      />
      
      <AboutContainer>
        <AboutHero>
          <HeroTitle>About Dan Weihmiller</HeroTitle>
        </AboutHero>
        
        <ContentSection>
          <Paragraph>
            A licensed real estate professional with eXp Realty serving Colorado Springs since 1987, 
            Dan Weihmiller has established himself as a trusted name in the community. Dan is dedicated 
            to providing exceptional service and is always happy to answer any of your real estate questions.
          </Paragraph>
          
          <Paragraph>
            Dan's approach to real estate is built on personal dedication, market knowledge, and 
            unparalleled customer service. He understands that buying or selling a home is more than 
            just a transaction – it's a life-changing experience that requires careful guidance and 
            expert advice.
          </Paragraph>

          <Paragraph>
            Specializing in residential real estate in Colorado Springs, Dan has 
            developed a deep understanding of local market trends, neighborhood characteristics, 
            and property values. This expertise allows him to provide his clients with accurate, 
            up-to-date information and realistic expectations.
          </Paragraph>

          <Paragraph>
            Whether you're a first-time homebuyer, looking to sell your property, or seeking 
            investment opportunities, Dan's experience and commitment to his clients' success 
            make him the ideal partner for all your real estate needs.
          </Paragraph>

          <ContactButton href="/contact">Get in Touch</ContactButton>
        </ContentSection>
      </AboutContainer>
    </>
  );
};

export default About; 