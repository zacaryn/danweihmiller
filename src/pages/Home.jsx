import styled from '@emotion/styled';
import sceneImg from '../assets/images/scene.jpg';

const HeroSection = styled.section`
  min-height: 90vh;
  background: url(${sceneImg}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.3)
    );
    transition: ${props => props.theme.transitions.slow};
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;
  background: rgba(255, 255, 255, 0.97);
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.large};
  padding: ${props => props.theme.spacing.xl};
  backdrop-filter: blur(5px);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
    max-width: 600px;
  }
`;

const AgentImage = styled.img`
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 968px) {
    margin: 0 auto;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  color: ${props => props.theme.colors.primary};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const BaseButton = styled.a`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  transition: ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.small};
  text-align: center;
  min-width: 160px;

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 968px) {
    width: 100%;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.primary};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    border-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const SecondaryButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};

  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  
  @media (max-width: 968px) {
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }
`;

const ExperienceSection = styled.section`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
`;

const ExperienceContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }
`;

const Home = () => {
  return (
    <div>
      <HeroSection>
        <HeroContent>
          <AgentImage src={'/src/assets/images/headshot.jpg'} alt="Daniel Weihmiller" />
          <HeroText>
            <Title>Dan Weihmiller Realty</Title>
            <Subtitle>
              Bringing over 35 years of trusted real estate expertise to the Front Range of Colorado Springs.
            </Subtitle>
            <ButtonGroup>
              <PrimaryButton href="/contact">Connect With Dan</PrimaryButton>
              <SecondaryButton href="/listings">View Listings</SecondaryButton>
            </ButtonGroup>
          </HeroText>
        </HeroContent>
      </HeroSection>

      <ExperienceSection>
        <ExperienceContainer>
          <h2>Your Colorado Springs Real Estate Expert</h2>
          <p>
            Since 1987, Dan Weihmiller has been a cornerstone of the Front Range of Colorado Springs real estate community. 
            With deep local roots and extensive market knowledge, Dan specializes in helping 
            both buyers and sellers achieve their real estate goals.
          </p>
          <p>
            Whether you're a first-time homebuyer, looking to upgrade, or interested in investment properties, 
            Dan's comprehensive understanding of the local market ensures you'll receive expert guidance every 
            step of the way.
          </p>
          <ButtonGroup>
            <PrimaryButton href="/about">Learn More About Dan</PrimaryButton>
            <SecondaryButton href="tel:7193018257">Call (719) 301-8257</SecondaryButton>
          </ButtonGroup>
        </ExperienceContainer>
      </ExperienceSection>
    </div>
  );
};

export default Home;