import styled from '@emotion/styled';
import sceneImg from '../assets/images/scene.jpg';
import headshot from '../assets/images/DWHeadshot.png';
import SEO from '../components/shared/SEO';
import { homeHeroOverlay } from '../styles/heroOverlays';
import { button } from '../styles/buttons';
import { EngagementCTA } from '../components/layout/PageShell';
import { Link } from 'react-router-dom';
import { FaPhone, FaHome, FaBook, FaUser } from 'react-icons/fa';
import NowShowingRibbon from '../components/home/NowShowingRibbon';
import FeaturedListings from '../components/home/FeaturedListings';
import ReelsStrip from '../components/home/ReelsStrip';
import { useCbListings } from '../hooks/useCbListings';

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
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto;
    gap: 1.75rem;
  }
`;

const HeroIntro = styled.div`
  min-width: 0;
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

const PrimaryButton = styled(Link)`
  ${button('light', 'lg')}

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SecondaryButton = styled(Link)`
  ${button('outlineLight', 'lg')}

  @media (max-width: 480px) {
    width: 100%;
  }
`;

/* the navy call button, sized and shaped like the other hero buttons */
const PhoneButton = styled.a`
  ${button('primary', 'lg')}
  border: 2px solid rgba(255, 255, 255, 0.5);
  letter-spacing: 0.04em;
  box-shadow: 0 4px 16px rgba(8, 18, 40, 0.35);

  &:hover {
    background: #1b3366;
    border-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 6px 20px rgba(8, 18, 40, 0.42);
  }

  @media (max-width: 480px) {
    width: 100%;
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
  padding: clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 3rem);
  background: ${props => props.theme.colors.background};
`;

const FeaturesGrid = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const FeatureCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  background: ${props => props.theme.colors.white};
  border: ${props => props.theme.borders.subtle};
  border-radius: ${props => props.theme.borderRadius.large};
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &::after {
    content: 'Learn more →';
    margin-top: 1rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.secondary};
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(14, 31, 69, 0.2);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const IconWrapper = styled.div`
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(14, 31, 69, 0.06);
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
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

const ClosingCta = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 3rem) clamp(3rem, 6vw, 4.5rem);

  aside {
    margin-top: 0;
  }
`;

const Home = () => {
  const { active, loading: listingsLoading } = useCbListings();
  const listingsLine = listingsLoading
    ? 'Homes Dan is representing right now, with photos, video tours and private showings.'
    : active.length
      ? `${active.length === 1 ? '1 home' : `${active.length} homes`} for sale now, with photos, video tours and one-tap showing requests.`
      : "See homes Dan has recently sold, and be first to know when his next listing goes live.";

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
              <NowShowingRibbon />
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
                <PrimaryButton to="/contact">Connect With Dan</PrimaryButton>
                <SecondaryButton to="/listings">View Listings</SecondaryButton>
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
          <HeroScrollHint href="#featured-listings">Scroll</HeroScrollHint>
        </HeroSection>

        <FeaturedListings />

        <ReelsStrip />

        <FeaturesSection id="home-features">
          <FeaturesGrid>
            <FeatureCard to="/listings">
              <IconWrapper>
                <FaHome size={22} />
              </IconWrapper>
              <FeatureTitle>Dan&apos;s Listings</FeatureTitle>
              <FeatureText>{listingsLine}</FeatureText>
            </FeatureCard>
            <FeatureCard to="/resources">
              <IconWrapper>
                <FaBook size={22} />
              </IconWrapper>
              <FeatureTitle>Real Estate Resources</FeatureTitle>
              <FeatureText>
                Expert guides on VA loans Colorado Springs, military PCS relocation, first-time buyer programs, and Fort Carson housing. Make informed decisions with local expertise.
              </FeatureText>
            </FeatureCard>
            <FeatureCard to="/about">
              <IconWrapper>
                <FaUser size={22} />
              </IconWrapper>
              <FeatureTitle>Meet Dan</FeatureTitle>
              <FeatureText>
                Learn about my career with Coldwell Banker since 1985 and decades of Colorado Springs real estate experience. Discover how my proven track record and local knowledge can benefit you.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        <ClosingCta>
          <EngagementCTA
            title="Thinking about buying or selling?"
            description="Get straightforward advice from a Colorado Springs broker with four decades of local experience."
          />
        </ClosingCta>
      </div>
    </>
  );
};

export default Home;