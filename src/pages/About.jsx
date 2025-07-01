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
        pageName="About Dan Weihmiller"
        title="Dan Weihmiller | Colorado Springs Realtor"
        description="Meet Dan Weihmiller, your trusted Colorado Springs Realtor with 35+ years of experience. Licensed Realtor specializing in military relocation, VA loans, and Front Range real estate."
        useProfileImage={true}
      />
      
      <AboutContainer>
        <AboutHero>
          <HeroTitle>About Dan Weihmiller</HeroTitle>
        </AboutHero>
        
        <ContentSection>
          <Paragraph>
            Dan Weihmiller is your trusted Colorado Springs Realtor with over 35 years of experience serving military families and residents throughout the Front Range. Licensed with eXp Realty since 1987, Dan has established himself as Colorado Springs' leading Military Relocation Professional (MRP), specializing in VA loans, military PCS moves, and expert guidance for Fort Carson, Peterson AFB, and Schriever AFB personnel.
          </Paragraph>
          
          <Paragraph>
            As a certified Military Relocation Professional, Dan understands the unique challenges of military moves and the importance of finding the right home quickly and efficiently. His expertise with VA loans and military benefits has helped hundreds of service members achieve homeownership with zero down payment throughout Colorado Springs, Monument, and the surrounding Front Range communities.
          </Paragraph>

          <Paragraph>
            Dan's comprehensive knowledge of Colorado Springs neighborhoods – from the Powers corridor perfect for Peterson AFB families to the Fountain communities ideal for Fort Carson personnel – allows him to match military families with the perfect location based on base proximity, school quality, and BAH optimization. His deep understanding of local market trends, military-friendly lenders, and property values ensures clients receive accurate, up-to-date guidance throughout their real estate journey.
          </Paragraph>

          <Paragraph>
            Whether you're a first-time military home buyer using VA loan benefits, a veteran looking to upgrade your forever home, or a civilian family relocating to Colorado Springs, Dan's Military Relocation Professional certification and decades of local expertise make him the ideal partner for achieving your real estate goals in America's premier military community.
          </Paragraph>

          <ContactButton href="/contact">Get in Touch</ContactButton>
        </ContentSection>
      </AboutContainer>
    </>
  );
};

export default About; 