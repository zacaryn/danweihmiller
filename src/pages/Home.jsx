import styled from '@emotion/styled';
import sceneImg from '../assets/images/scene.jpg';
import expLogo from '../assets/images/exp_realty_logo.png';
import headshot from '../assets/images/headshot.jpg';
import SEO from '../components/shared/SEO';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone, FaHome, FaSearch, FaChartLine, FaBook, FaUser } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: max(55vh, 500px);
  padding-top: 80px;
  padding-bottom: ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, rgba(23, 51, 107, 0.6), rgba(23, 51, 107, 0.4)), url(${sceneImg}) center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-left: calc(-50vw + 50%);

  @media (max-height: 700px) {
    min-height: max(65vh, 480px);
    padding-bottom: ${props => props.theme.spacing.lg};
  }

  @media (max-height: 600px) {
    min-height: max(75vh, 450px);
    padding-bottom: ${props => props.theme.spacing.md};
    align-items: flex-start;
    padding-top: 100px;
  }

  @media (max-height: 500px) {
    min-height: 85vh;
    padding-top: 80px;
    padding-bottom: ${props => props.theme.spacing.lg};
    align-items: flex-start;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    min-height: 55vh;
    padding-top: 60px;
    padding-bottom: ${props => props.theme.spacing.lg};
  }

  @media (max-width: 480px) {
    min-height: 60vh;
    padding-top: 60px;
    padding-bottom: ${props => props.theme.spacing.xl};
  }
`;

const HeroContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(auto, 600px) 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${props => props.theme.spacing.lg};
    padding: 0 ${props => props.theme.spacing.md};
    max-width: 100%;
    justify-items: center;
  }

  @media (max-width: 480px) {
    padding: 0 ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.md};
    margin: 0;
    width: 100%;
  }
`;

const IntroSection = styled.div`
  color: ${props => props.theme.colors.white};

  @media (max-width: 968px) {
    order: 2;
    max-width: 100%;
    margin: 0 auto;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${props => props.theme.spacing.lg};
  margin-right: -2rem;
  height: fit-content;
  max-height: 60vh;

  @media (max-width: 968px) {
    order: 1;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
    padding: ${props => props.theme.spacing.md};
    height: auto;
    max-height: none;
  }

  @media (max-width: 480px) {
    padding: 0;
    margin: 0 auto;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  width: 350px;

  @media (max-height: 600px) {
    gap: 4px;
    padding: ${props => props.theme.spacing.sm};
    width: 320px;
  }

  @media (max-height: 500px) {
    gap: 2px;
    padding: ${props => props.theme.spacing.xs};
    width: 300px;
  }

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.sm};
    width: 300px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    width: 280px;
    padding: ${props => props.theme.spacing.sm};
    gap: 4px;
    margin: 0 auto;
  }

  @media (max-width: 360px) {
    width: 260px;
    padding: ${props => props.theme.spacing.xs};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 4px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${props => props.theme.borderRadius.large};
    background: linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 100%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3px;
  }

  @media (max-width: 480px) {
    padding: 2px;
  }
`;

const ProfileImage = styled.img`
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: ${props => props.theme.shadows.medium};
  flex-shrink: 0;

  @media (max-height: 600px) {
    width: 200px;
    height: 200px;
  }

  @media (max-height: 500px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.xs} 0;
  justify-content: center;
  width: 100%;

  @media (max-width: 480px) {
    gap: ${props => props.theme.spacing.lg};
    padding: 2px 0;
  }
`;

const StatItem = styled.div`
  text-align: center;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -${props => props.theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    height: 30px;
    width: 1px;
    background: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 480px) {
    &:not(:last-child)::after {
      right: -${props => props.theme.spacing.sm};
      height: 25px;
    }
  }
`;

const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.white};
  line-height: 1;
  margin-bottom: 0.25rem;
  font-family: 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 1.9rem;
  }

  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  opacity: 0.9;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: rgba(34, 102, 46, 0.9);
  backdrop-filter: blur(10px);
  color: white;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    background: rgba(46, 125, 50, 0.9);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  }

  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    font-size: 0.95rem;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 480px) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: 0.9rem;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const BrandingTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xs};

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: ${props => props.theme.spacing.xs};
  }
`;

const AgentName = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  line-height: 1.1;
  color: inherit;
  margin: 0;
  font-weight: normal;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    1px 1px 2px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const AgentSubtitle = styled.h2`
  font-size: 1.4rem;
  color: inherit;
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  font-weight: 600;
  opacity: 1;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.6),
    1px 1px 2px rgba(0, 0, 0, 0.9);
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const Separator = styled.span`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.white};
  opacity: 0.8;
  margin: 0 ${props => props.theme.spacing.sm};

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0 ${props => props.theme.spacing.xs};
    opacity: 0.6;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const BrokerageLogo = styled.img`
  height: 30px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  margin-top: 12px;

  @media (max-width: 768px) {
    height: 24px;
    margin-top: 8px;
  }

  @media (max-width: 480px) {
    height: 20px;
    margin-top: 6px;
  }
`;

const SmallBrokerageLogo = styled(BrokerageLogo)`
  height: 24px;
  margin-top: 8px;

  @media (max-width: 768px) {
    height: 20px;
    margin-top: 6px;
  }

  @media (max-width: 480px) {
    height: 16px;
    margin-top: 4px;
  }
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  line-height: 1.2;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: inherit;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
  color: inherit;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
  
  @media (max-width: 968px) {
    justify-content: center;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
    margin-top: ${props => props.theme.spacing.md};
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const BaseButton = styled.a`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  transition: ${props => props.theme.transitions.fast};
  text-align: center;
  min-width: 160px;

  @media (max-width: 480px) {
    width: 100%;
    min-width: unset;
    padding: ${props => props.theme.spacing.sm};
  }
`;

const PrimaryButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.white};

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: transparent;
  color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.white};

  &:hover {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.sm};
  background: linear-gradient(
    135deg,
    #f8f9fb 0%,
    #e8eef7 50%,
    #f1f5fb 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${props => props.theme.colors.primary}33,
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(23, 51, 107, 0.03) 0%,
      transparent 70%
    );
    border-radius: 50%;
  }

  @media (max-height: 700px) {
    margin-top: ${props => props.theme.spacing.md};
  }

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm};
    margin-top: ${props => props.theme.spacing.xs};
    
    &::after {
      width: 250px;
      height: 250px;
      top: -30%;
      right: -20%;
    }
  }

  @media (max-width: 480px) {
    margin-top: 0;
  }
`;

const FeaturesGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${props => props.theme.spacing.md};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 600px;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const FeatureCard = styled.a`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(23, 51, 107, 0.08);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      to right,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.accent}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 30px rgba(23, 51, 107, 0.15);
    background: ${props => props.theme.colors.white};

    &::before {
      opacity: 1;
    }

    svg {
      transform: scale(1.1) translateY(-4px);
      color: ${props => props.theme.colors.primary};
    }
  }

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
    
    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 480px) {
    padding: ${props => props.theme.spacing.sm};
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(23, 51, 107, 0.08), rgba(23, 51, 107, 0.04));
  border-radius: 50%;
  margin-bottom: ${props => props.theme.spacing.sm};
  position: relative;
  border: 2px solid rgba(23, 51, 107, 0.1);

  svg {
    color: ${props => props.theme.colors.primary};
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
  }

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-family: 'Playfair Display', serif;
  position: relative;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const FeatureText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  justify-content: center;
  padding-top: ${props => props.theme.spacing.xs};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.white};
  opacity: 0.8;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.9;
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    opacity: 1;
    transform: translateX(4px);
  }

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const Home = () => {
  return (
    <>
      <SEO 
        pageName="Home"
        title="Dan Weihmiller | Colorado Springs Realtor"
        description="Trusted Colorado Springs Realtor with 35+ years of experience. Specializing in military relocation, VA loans, and real estate throughout Colorado Springs, Monument, and the Front Range. Contact Dan today!"
        useProfileImage={false}
      />
      <div>
        <HeroSection>
          <HeroContent>
            <IntroSection>
              <BrandingTitle>
                <AgentName>Dan Weihmiller</AgentName>
              </BrandingTitle>
              <AgentSubtitle>Realtor, Colorado Springs</AgentSubtitle>
              <Subtitle>
                Bringing over 35 years of trusted real estate experience to the Front Range of Colorado Springs. Specializing in military relocation, VA loans, and helping families find their perfect home in our beautiful community.
              </Subtitle>
              <ButtonGroup>
                <PrimaryButton href="/contact">Connect With Dan</PrimaryButton>
                <SecondaryButton href="/search">Search Properties</SecondaryButton>
              </ButtonGroup>
            </IntroSection>
            <ProfileSection>
              <ProfileCard>
                <ImageContainer>
                  <ProfileImage src={headshot} alt="Dan Weihmiller - Colorado Springs Realtor" />
                </ImageContainer>
                
                <Stats>
                  <StatItem>
                    <StatNumber>35+</StatNumber>
                    <StatLabel>Years Experience</StatLabel>
                  </StatItem>
                  <StatItem>
                    <StatNumber>500+</StatNumber>
                    <StatLabel>Properties Sold</StatLabel>
                  </StatItem>
                </Stats>

                <CallButton href="tel:7193018257">
                  <FaPhone />
                  Call (719) 301-8257
                </CallButton>
              </ProfileCard>
            </ProfileSection>
          </HeroContent>
        </HeroSection>

        <FeaturesSection>
          <FeaturesGrid>
            <FeatureCard href="/search">
              <IconWrapper>
                <FaSearch size={36} />
              </IconWrapper>
              <FeatureTitle>Search Properties</FeatureTitle>
              <FeatureText>
                Explore Colorado Springs homes for sale throughout the Front Range. From single-family homes to new construction, find your perfect match in our premier military community.
              </FeatureText>
            </FeatureCard>
            <FeatureCard href="/resources">
              <IconWrapper>
                <FaBook size={36} />
              </IconWrapper>
              <FeatureTitle>Real Estate Resources</FeatureTitle>
              <FeatureText>
                Expert guides on VA loans Colorado Springs, military PCS relocation, first-time buyer programs, and Fort Carson housing. Make informed decisions with local expertise.
              </FeatureText>
            </FeatureCard>
            <FeatureCard href="/about">
              <IconWrapper>
                <FaUser size={36} />
              </IconWrapper>
              <FeatureTitle>Meet Dan</FeatureTitle>
              <FeatureText>
                Learn about my 35+ years of real estate experience in Colorado Springs. Discover how my proven track record and local knowledge can benefit you.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>
      </div>
    </>
  );
};

export default Home;