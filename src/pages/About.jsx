import styled from '@emotion/styled';
import sceneImg from '../assets/images/scene.jpg';
import SEO from '../components/shared/SEO';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const AboutHero = styled.div`
  position: relative;
  background: url(${sceneImg}) center/cover no-repeat;
  height: 300px;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 3rem;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const ContentSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const About = () => {
  return (
    <>
      <SEO 
        pageName="About" 
        description="Get to know Dan Weihmiller, dedicated real estate professional serving Colorado Springs. Learn about my experience, background, approach and commitment to excellence in real estate."
        useProfileImage={true}
      />
      
      <AboutContainer>
        <AboutHero>
          <HeroTitle>About Dan Weihmiller</HeroTitle>
        </AboutHero>
        
        <ContentSection>
          <Paragraph>
            A licensed real estate professional serving the Front Range of Colorado Springs since 1987, 
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
            Specializing in residential real estate in the Front Range of Colorado Springs, Dan has 
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