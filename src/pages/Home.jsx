import styled from '@emotion/styled';
import sceneImg from '../assets/images/scene.jpg';
import headshot from '../assets/images/DWHeadshot.png';
import SEO from '../components/shared/SEO';
import { homeHeroOverlay } from '../styles/heroOverlays';
import { FaPhone, FaSearch, FaBook, FaUser } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: min(92vh, 880px);
  padding: calc(80px + 2.5rem) 0 3rem;
  background:
    ${homeHeroOverlay},
    url(${sceneImg}) center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100vw;
  margin-left: calc(-50vw + 50%);

  @media (max-width: 968px) {
    min-height: auto;
    padding: calc(72px + 1.75rem) 0 2.5rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 3rem);
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 380px);
  grid-template-rows: auto auto;
  gap: 0 clamp(2rem, 5vw, 4rem);
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1.75rem;
  }
`;

const HeroIntro = styled.div`
  color: ${props => props.theme.colors.white};
  max-width: 640px;
  grid-column: 1;
  grid-row: 1;
  padding-bottom: 1.25rem;

  @media (max-width: 968px) {
    max-width: none;
    grid-column: 1;
    grid-row: 1;
    padding-bottom: 0;
  }
`;

const HeroBody = styled.div`
  color: ${props => props.theme.colors.white};
  max-width: 640px;
  grid-column: 1;
  grid-row: 2;

  @media (max-width: 968px) {
    max-width: none;
    grid-column: 1;
    grid-row: 3;
  }
`;

const HeroEyebrow = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &::before {
    content: '';
    width: 2rem;
    height: 1px;
    background: rgba(255, 255, 255, 0.45);
    flex-shrink: 0;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(2.35rem, 5vw, 3.75rem);
  line-height: 1.05;
  font-weight: 600;
  margin: 0 0 0.75rem;
  letter-spacing: -0.02em;
`;

const HeroTagline = styled.p`
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  line-height: 1.45;
  font-weight: 500;
  margin: 0 0 1.25rem;
  color: rgba(255, 255, 255, 0.92);
`;

const HeroLead = styled.p`
  font-size: 1.05rem;
  line-height: 1.65;
  margin: 0 0 1.75rem;
  color: rgba(255, 255, 255, 0.78);
  max-width: 52ch;

  @media (max-width: 968px) {
    max-width: none;
  }
`;

const HeroMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 2rem;
  padding: 1.25rem 0;
  margin-bottom: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);

  @media (max-width: 968px) {
    gap: 1.25rem 1.75rem;
  }
`;

const Metric = styled.div``;

const MetricValue = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 0.35rem;
`;

const MetricLabel = styled.div`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const HeroButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};
  border: 1px solid transparent;
  white-space: nowrap;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const PrimaryButton = styled(HeroButton)`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border-color: ${props => props.theme.colors.white};

  &:hover {
    background: transparent;
    color: ${props => props.theme.colors.white};
  }
`;

const SecondaryButton = styled(HeroButton)`
  background: transparent;
  color: ${props => props.theme.colors.white};
  border-color: rgba(255, 255, 255, 0.55);

  &:hover {
    border-color: ${props => props.theme.colors.white};
    background: rgba(255, 255, 255, 0.08);
  }
`;

const PhoneButton = styled(HeroButton)`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-weight: 700;
  font-size: 0.82rem;
  padding: 0.9rem 1.4rem;
  box-shadow: 0 4px 16px rgba(8, 18, 40, 0.35);

  svg {
    width: 0.95rem;
    height: 0.95rem;
  }

  &:hover {
    background: ${props => props.theme.colors.secondary};
    border-color: rgba(255, 255, 255, 0.65);
    box-shadow: 0 5px 18px rgba(8, 18, 40, 0.4);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  justify-self: end;
  width: 100%;
  max-width: 380px;
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: center;

  @media (max-width: 968px) {
    grid-column: 1;
    grid-row: 2;
    justify-self: stretch;
    max-width: min(420px, 100%);
    margin: 0 auto;
    align-self: start;
  }
`;

const PortraitFrame = styled.div`
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.5rem;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);

  &::before {
    content: '';
    position: absolute;
    inset: -0.65rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    pointer-events: none;
  }
`;

const PortraitImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center top;
`;

const PortraitCaption = styled.div`
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);
  text-align: center;
`;

const HeroScrollHint = styled.a`
  position: absolute;
  left: 50%;
  bottom: 1.25rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.2s ease;

  &::after {
    content: '↓';
    font-size: 0.85rem;
    line-height: 1;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.85);
  }

  @media (max-width: 968px) {
    display: none;
  }
`;

const FeaturesSection = styled.section`
  padding: ${props => props.theme.spacing.xl} clamp(1.25rem, 4vw, 3rem);
  margin-top: 0;
  background: ${props => props.theme.colors.background};
  position: relative;
  border-top: ${props => props.theme.borders.subtle};

  @media (max-height: 700px) {
    margin-top: ${props => props.theme.spacing.md};
  }

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.sm};
    margin-top: ${props => props.theme.spacing.xs};
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
  box-shadow: none;
  transition: ${props => props.theme.transitions.fast};
  text-decoration: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  position: relative;
  border: ${props => props.theme.borders.subtle};

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(14, 31, 69, 0.22);
    box-shadow: ${props => props.theme.shadows.small};

    svg {
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
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.lightGray};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.sm};
  position: relative;
  border: ${props => props.theme.borders.subtle};

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
  font-size: 1.35rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-family: ${props => props.theme.fonts.heading};
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

const Home = () => {
  return (
    <>
      <SEO
        pageName="Home"
        ogTitle="Colorado Springs Realtor"
        ogDescription="Broker with Coldwell Banker since 1985 — military relocation, VA loans, and Front Range real estate."
      />
      <div>
        <HeroSection>
          <HeroContent>
            <HeroIntro>
              <HeroEyebrow>Coldwell Banker · Colorado Springs · Since 1985</HeroEyebrow>
              <HeroTitle>Dan Weihmiller</HeroTitle>
              <HeroTagline>
                Trusted local Realtor for military families, VA loans, and Front Range homeownership.
              </HeroTagline>
            </HeroIntro>
            <HeroBody>
              <HeroLead>
                Four decades of guidance buying and selling in Colorado Springs, Monument, and surrounding communities — with the personal attention you expect from a long-standing Coldwell Banker agent.
              </HeroLead>
              <HeroMetrics>
                <Metric>
                  <MetricValue>40+</MetricValue>
                  <MetricLabel>Years Experience</MetricLabel>
                </Metric>
                <Metric>
                  <MetricValue>500+</MetricValue>
                  <MetricLabel>Properties Sold</MetricLabel>
                </Metric>
              </HeroMetrics>
              <HeroActions>
                <PrimaryButton href="/contact">Connect With Dan</PrimaryButton>
                <SecondaryButton href="/search">Search Properties</SecondaryButton>
                <PhoneButton href="tel:7193018257" id="hero-call-cta">
                  <FaPhone aria-hidden />
                  (719) 301-8257
                </PhoneButton>
              </HeroActions>
            </HeroBody>
            <HeroVisual>
              <PortraitFrame>
                <PortraitImage src={headshot} alt="Dan Weihmiller — Colorado Springs Realtor" />
              </PortraitFrame>
              <PortraitCaption>Military Relocation Professional · MRP</PortraitCaption>
            </HeroVisual>
          </HeroContent>
          <HeroScrollHint href="#home-features">Scroll</HeroScrollHint>
        </HeroSection>

        <FeaturesSection id="home-features">
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
                Learn about my career with Coldwell Banker since 1985 and decades of Colorado Springs real estate experience. Discover how my proven track record and local knowledge can benefit you.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>
      </div>
    </>
  );
};

export default Home;