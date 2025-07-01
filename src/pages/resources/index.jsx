import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import SEO from '../../components/shared/SEO';
import { useTheme } from '@emotion/react';
import bluebirdLogo from '../../assets/images/bluebird.png';
import creditUnlimitedLogo from '../../assets/images/creditunlimited.png';

const ResourcesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.darkGray};
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 0.5rem;
  }
`;

const ArticleCard = styled(Link)`
  display: block;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 1.5rem;
  text-decoration: none;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: ${props => props.theme.transitions.default};
  text-align: left;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
  }
`;

const ArticleTitle = styled.h2`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.75rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ArticleDescription = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const PartnersFloatingContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: 1200px) {
    right: 15px;
  }

  @media (max-width: 968px) {
    position: static;
    transform: none;
    flex-direction: row;
    justify-content: center;
    margin: ${props => props.theme.spacing.lg} 0;
    padding: 0 ${props => props.theme.spacing.md};
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PartnerFloatingCard = styled.div`
  position: relative;
  cursor: pointer;

  &:hover .partner-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(-50%) translateX(-10px);
  }

  @media (max-width: 968px) {
    &:hover .partner-tooltip {
      transform: translateX(50%) translateY(-10px);
    }
  }
`;

const PartnerMiniCard = styled.a`
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 30px rgba(23, 51, 107, 0.2);
  }

  @media (max-width: 968px) {
    width: 160px;
    height: 160px;
  }
`;

const PartnerMiniLogo = styled.img`
  width: 70%;
  height: auto;
  max-height: 70%;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(15%) sepia(46%) saturate(2916%) hue-rotate(202deg) brightness(97%) contrast(98%);
`;

const PartnerTooltip = styled.div`
  position: absolute;
  right: 150px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(23, 51, 107, 0.1);
  padding: ${props => props.theme.spacing.md};
  width: 300px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(10px);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid white;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }

  @media (max-width: 968px) {
    position: absolute;
    top: -160px;
    right: 50%;
    transform: translateX(50%);
    width: 280px;

    &::after {
      top: 100%;
      right: 50%;
      transform: translateX(50%);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
      border-bottom: none;
    }
  }
`;



const PartnersBadge = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: rgba(23, 51, 107, 0.9);
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  z-index: 99;

  @media (max-width: 968px) {
    display: none;
  }
`;

const articles = [
  {
    title: 'Working with a Colorado Springs Listing Agent',
    description: 'Learn how a professional Colorado Springs listing agent can maximize your home\'s value and streamline the selling process in our competitive market.',
    path: '/resources/listing-agent',
  },
  {
    title: 'Military Relocation Colorado Springs',
    description: 'Complete PCS guide for Fort Carson, Peterson AFB, and Schriever AFB families. Expert military relocation assistance for Colorado Springs.',
    path: '/resources/military-relocation',
  },
  {
    title: 'VA Loans Colorado Springs',
    description: 'Complete guide to VA loans in Colorado Springs - eligibility, benefits, and how to maximize your military home buying benefits.',
    path: '/resources/va-loans',
  },
  {
    title: 'Custom Home Building Colorado Springs',
    description: 'Expert guidance on building your custom home in Colorado Springs, from land selection to construction methods and local contractors.',
    path: '/resources/custom-home-building',
  },
  {
    title: 'New Construction Homes Colorado Springs',
    description: 'Explore the benefits and process of buying newly constructed homes in Colorado Springs\' growing communities.',
    path: '/resources/new-construction',
  },
  {
    title: 'First Time Home Buyers Colorado Springs',
    description: 'Complete guide for first-time buyers in Colorado Springs including FHA loans, down payment assistance, and best neighborhoods.',
    path: '/resources/first-time-home-buyers',
  },
  {
    title: 'Buying Land in Colorado Springs',
    description: 'Essential information for purchasing land in Colorado Springs including zoning, utilities, and development considerations.',
    path: '/resources/land',
  },
  {
    title: 'Single Family Homes Colorado Springs',
    description: 'Everything you need to know about purchasing single-family homes in Colorado Springs neighborhoods.',
    path: '/resources/single-family-home',
  },
];

const ResourcesPage = () => {
  const theme = useTheme();
  
  return (
    <>
      <SEO 
        pageName="Real Estate Resources & Guides"
        title="Colorado Springs Real Estate Guide | Expert Resources & Tips"
        description="Comprehensive Colorado Springs real estate guides from your trusted local Realtor. Expert resources on VA loans, military relocation, first-time buying, and Colorado Springs neighborhoods."
      />
      <ResourcesContainer>
        <Header>
          <Title>Colorado Springs Real Estate Guide & Resources</Title>
          <Subtitle>
            Expert Colorado Springs real estate guidance from your trusted local Realtor. Comprehensive resources for military families, first-time buyers, and all your Colorado Springs real estate needs.
          </Subtitle>
        </Header>
        
        <ArticlesGrid>
          {articles.map((article) => (
            <ArticleCard to={article.path} key={article.path}>
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleDescription>{article.description}</ArticleDescription>
            </ArticleCard>
          ))}
        </ArticlesGrid>

        <PartnersFloatingContainer>
          <PartnerFloatingCard>
            <PartnerMiniCard 
              href="https://bluebirdmortgage.com/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <PartnerMiniLogo src={bluebirdLogo} alt="Bluebird Mortgage" />
            </PartnerMiniCard>
            <PartnerTooltip className="partner-tooltip">
              <h4 style={{ margin: 0, fontSize: '1rem', color: theme.colors.primary, marginBottom: '8px' }}>
                Bluebird Mortgage
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: 1.4 }}>
                Expert guidance from David Jeffrey, NMLS licensed mortgage broker specializing in VA loans and military relocations
              </p>
              <a 
                href="https://bluebirdmortgage.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: theme.colors.primary,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginTop: '8px',
                  display: 'inline-block'
                }}
              >
                Visit Website →
              </a>
            </PartnerTooltip>
          </PartnerFloatingCard>

          <PartnerFloatingCard>
            <PartnerMiniCard 
              href="https://www.creditunlimited.com/?optimus=1&pp=14031" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <PartnerMiniLogo src={creditUnlimitedLogo} alt="Credit Unlimited" />
            </PartnerMiniCard>
            <PartnerTooltip className="partner-tooltip">
              <h4 style={{ margin: 0, fontSize: '1rem', color: theme.colors.primary, marginBottom: '8px' }}>
                Credit Unlimited
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666', lineHeight: 1.4 }}>
                Take control of your credit! Bad credit can affect more than just your ability to get a loan, it can affect your life. Take Control of Your Life by Taking Control of Your Credit.
              </p>
              <a 
                href="https://www.creditunlimited.com/?optimus=1&pp=14031" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: theme.colors.primary,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginTop: '8px',
                  display: 'inline-block'
                }}
              >
                Visit Website →
              </a>
            </PartnerTooltip>
          </PartnerFloatingCard>
        </PartnersFloatingContainer>

        <PartnersBadge>Trusted Partners</PartnersBadge>
      </ResourcesContainer>
    </>
  );
};

export default ResourcesPage; 