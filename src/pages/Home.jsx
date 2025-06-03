import styled from '@emotion/styled';
import sceneImg from '../assets/images/scene.jpg';
import expLogo from '../assets/images/exp_realty_logo.png';
import headshot from '../assets/images/headshot.jpg';
import SEO from '../components/shared/SEO';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 100vh;
  padding-top: 80px; // Account for fixed navbar
  background: url(${sceneImg}) center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(23, 51, 107, 0.75),
      rgba(23, 51, 107, 0.35) 50%,
      rgba(23, 51, 107, 0.05)
    );
  }

  @media (max-width: 768px) {
    min-height: calc(100vh - 60px);
    padding: 100px 0 40px;
    
    &::after {
      background: linear-gradient(
        to bottom,
        rgba(23, 51, 107, 0.75),
        rgba(23, 51, 107, 0.35)
      );
    }
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
  }

  @media (max-width: 480px) {
    padding: 0 ${props => props.theme.spacing.sm};
    gap: ${props => props.theme.spacing.md};
  }
`;

const IntroSection = styled.div`
  color: ${props => props.theme.colors.white};

  @media (max-width: 968px) {
    order: 2;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-right: -2rem;

  @media (max-width: 968px) {
    order: 1;
    flex-direction: column;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    padding: ${props => props.theme.spacing.md};
    gap: ${props => props.theme.spacing.md};
    justify-content: center;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 180px;
  height: 180px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

const AgentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  padding-left: ${props => props.theme.spacing.lg};

  @media (max-width: 968px) {
    padding-left: 0;
  }
`;

const BrandingTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: ${props => props.theme.spacing.xs};
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

const AgentName = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  line-height: 1.2;
  color: inherit;
  margin: 0;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
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

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 968px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  justify-content: center;

  @media (max-width: 480px) {
    gap: ${props => props.theme.spacing.md};
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
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 480px) {
    &:not(:last-child)::after {
      right: -${props => props.theme.spacing.sm};
      height: 25px;
    }
  }
`;

const StatNumber = styled.div`
  font-size: 2.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.white};
  line-height: 1;
  margin-bottom: 0.25rem;
  font-family: 'Playfair Display', serif;

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 400;
  opacity: 0.9;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
  
  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
    margin-top: ${props => props.theme.spacing.md};
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
  background: ${props => props.theme.colors.background};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm};
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

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const FeatureText = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
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
        title="Dan Weihmiller | Colorado Springs Real Estate Expert"
        description="Expert real estate services in Colorado Springs and the Front Range. Dan Weihmiller brings over 35 years of trusted experience helping buyers and sellers in Colorado Springs, Monument, and surrounding areas."
        image="/images/og-image.jpg"
      />
      <div>
        <HeroSection>
          <HeroContent>
            <IntroSection>
              <BrandingTitle>
                <AgentName>Dan Weihmiller</AgentName>
                <Separator>|</Separator>
                <BrokerageLogo src={expLogo} alt="eXp Realty" />
              </BrandingTitle>
              <Subtitle>
                Bringing over 35 years of trusted real estate expertise to the Front Range of Colorado Springs.
              </Subtitle>
              <ButtonGroup>
                <PrimaryButton href="/contact">Connect With Dan</PrimaryButton>
                <SecondaryButton href="/listings">View Listings</SecondaryButton>
              </ButtonGroup>
            </IntroSection>
            <ProfileSection>
              <ImageWrapper>
                <AgentImage src={headshot} alt="Daniel Weihmiller" />
              </ImageWrapper>
              <ProfileInfo>
                <Stats>
                  <StatsRow>
                    <StatItem>
                      <StatNumber>35+</StatNumber>
                      <StatLabel>Years Experience</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatNumber>500+</StatNumber>
                      <StatLabel>Properties Sold</StatLabel>
                    </StatItem>
                  </StatsRow>
                  <SocialLinks>
                    <SocialLink href="https://www.facebook.com/danweihmillerrealtor" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <FaFacebookF />
                    </SocialLink>
                    <SocialLink href="https://www.linkedin.com/in/danweihmiller/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </SocialLink>
                    <SocialLink href="https://www.instagram.com/danweihmiller/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <FaInstagram />
                    </SocialLink>
                    <SocialLink href="mailto:buildingincolorado22@gmail.com" aria-label="Email">
                      <FaEnvelope />
                    </SocialLink>
                    <SocialLink href="tel:7193018257" aria-label="Phone">
                      <FaPhone />
                    </SocialLink>
                  </SocialLinks>
                </Stats>
                <ContactButton href="/contact">
                  Write me a message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginTop: '1px' }}>
                    <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                  </svg>
                </ContactButton>
              </ProfileInfo>
            </ProfileSection>
          </HeroContent>
        </HeroSection>

        <FeaturesSection>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureTitle>Local Expertise</FeatureTitle>
              <FeatureText>
                Deep understanding of Colorado Springs neighborhoods, market trends, and property values to help you make informed decisions.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Personalized Service</FeatureTitle>
              <FeatureText>
                Dedicated attention to your unique needs, whether you're buying your first home or selling an investment property.
              </FeatureText>
            </FeatureCard>
            <FeatureCard>
              <FeatureTitle>Proven Results</FeatureTitle>
              <FeatureText>
                A track record of successful transactions and satisfied clients throughout the Front Range region.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>
      </div>
    </>
  );
};

export default Home;