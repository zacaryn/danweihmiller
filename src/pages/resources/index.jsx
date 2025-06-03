import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import SEO from '../../components/shared/SEO';

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

const articles = [
  {
    title: 'Working with a Listing Agent',
    description: 'Learn how a professional listing agent can maximize your home\'s value and streamline the selling process.',
    path: '/resources/listing-agent',
  },
  {
    title: 'Military Relocation in Colorado Springs',
    description: 'Your comprehensive guide to PCSing to Colorado Springs - from housing options to base locations.',
    path: '/resources/military-relocation',
  },
  {
    title: 'Understanding VA Loans',
    description: 'Everything you need to know about VA loans, eligibility, and benefits for military homebuyers.',
    path: '/resources/va-loans',
  },
  {
    title: 'New Construction Homes',
    description: 'Explore the benefits and process of buying a newly constructed home in Colorado Springs.',
    path: '/resources/new-construction',
  },
  {
    title: 'First Time Home Buyers Guide',
    description: 'A step-by-step guide to help you navigate your first home purchase with confidence.',
    path: '/resources/first-time-home-buyers',
  },
  {
    title: 'Buying Land in Colorado Springs',
    description: 'Essential information for purchasing land and planning your dream property.',
    path: '/resources/land',
  },
  {
    title: 'Single Family Home Buying Guide',
    description: 'Everything you need to know about purchasing a single-family home in today\'s market.',
    path: '/resources/single-family-home',
  },
];

const ResourcesPage = () => {
  return (
    <>
      <SEO 
        pageName="Real Estate Resources & Guides"
        title="Dan Weihmiller | Colorado Springs Real Estate Resources"
        description="Expert guidance and insights to help you make informed real estate decisions in Colorado Springs. Browse our collection of real estate guides and resources."
      />
      <ResourcesContainer>
        <Header>
          <Title>Real Estate Resources & Guides</Title>
          <Subtitle>
            Expert guidance and insights to help you make informed real estate decisions in Colorado Springs
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
      </ResourcesContainer>
    </>
  );
};

export default ResourcesPage; 