import React from 'react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import SEO from './shared/SEO';
import Breadcrumbs from './Breadcrumbs';
import headshot from '../assets/images/headshot.jpg';
import scene from '../assets/images/scene.jpg';
import fortcarson from '../assets/images/fortcarson.jpg';
import coloradosprings from '../assets/images/coloradosprings.jpg';
import valoan from '../assets/images/valoan.jpg';
import construction from '../assets/images/construction.jpg';
import customhome from '../assets/images/customhome.jpg';
import realestateagent from '../assets/images/realestateagent.jpg';
import homebuyer from '../assets/images/homebuyer.jpg';
import familyhome from '../assets/images/familyhome.jpg';

const ArticleContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  padding-top: 80px;

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

const BreadcrumbWrapper = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
    margin-bottom: 0;
  }
`;

const HeroSection = styled.div`
  position: relative;
  background: ${props => `url(${props.backgroundImage}) center/cover no-repeat`};
  height: 400px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  margin: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg} 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(23, 51, 107, 0.85),
      rgba(23, 51, 107, 0.45) 50%,
      rgba(23, 51, 107, 0.15)
    );
  }

  @media (max-width: 768px) {
    height: 350px;
    margin: 0;
    border-radius: 0;
    
    &::after {
      background: linear-gradient(
        to bottom,
        rgba(23, 51, 107, 0.9),
        rgba(23, 51, 107, 0.75)
      );
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${props => props.theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
    text-align: center;
    justify-content: flex-start;
    padding-top: calc(${props => props.theme.spacing.xl} + 20px);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
  line-height: 1.2;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.white};
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.4;
  }
`;

const ArticleMeta = styled.div`
  max-width: 1000px;
  margin: ${props => props.theme.spacing.md} auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    margin-top: 0;
    background: ${props => props.theme.colors.white};
    border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  }
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.accent};

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const MetaText = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-family: 'Playfair Display', serif;
`;

const DateInfo = styled.div`
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};

  &:hover {
    color: ${props => props.theme.colors.accent};
    transform: translateX(-4px);
  }

  svg {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: ${props => props.theme.spacing.sm};
    background: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius.medium};
    
    &:hover {
      background: ${props => props.theme.colors.accent};
      color: ${props => props.theme.colors.white};
    }
  }
`;

const ArticleContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
    border-radius: 0;
  }

  h2 {
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    margin: 2.5rem 0 1.5rem;
    line-height: 1.3;
    font-family: 'Playfair Display', serif;

    @media (max-width: 768px) {
      font-size: 1.6rem;
      margin: 2rem 0 1rem;
    }
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.text};

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
  }

  ul, ol {
    margin-bottom: 2rem;
    padding-left: 1.5rem;

    @media (max-width: 768px) {
      margin-bottom: 1.5rem;
      padding-left: 1.25rem;
    }
  }

  li {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.text};

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 0.75rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.medium};
    margin: 2rem 0;

    @media (max-width: 768px) {
      margin: 1.5rem 0;
      border-radius: ${props => props.theme.borderRadius.small};
    }
  }

  blockquote {
    margin: 2rem 0;
    padding: 1.5rem;
    border-left: 4px solid ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background};
    border-radius: 0 ${props => props.theme.borderRadius.medium} ${props => props.theme.borderRadius.medium} 0;
    font-style: italic;

    @media (max-width: 768px) {
      margin: 1.5rem 0;
      padding: 1rem;
    }
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: ${props => props.theme.transitions.fast};
    padding: 2px 0;

    &:hover {
      border-bottom-color: ${props => props.theme.colors.primary};
    }

    @media (max-width: 768px) {
      padding: 4px 0; // Larger touch target
    }
  }
`;

const ArticleLayout = ({ title, description, children, keywords }) => {
  const location = useLocation();
  const publishDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Resources', path: '/resources' },
    { label: title }
  ];

  // Determine which hero image to use based on the current path
  const getHeroImage = () => {
    const path = location.pathname;
    switch (path) {
      case '/resources/military-relocation':
        return fortcarson;
      case '/resources/land':
        return coloradosprings;
      case '/resources/va-loans':
        return valoan;
      case '/resources/new-construction':
        return construction;
      case '/resources/custom-home-building':
        return customhome;
      case '/resources/listing-agent':
        return realestateagent;
      case '/resources/first-time-home-buyers':
        return homebuyer;
      case '/resources/single-family-home':
        return familyhome;
      default:
        return scene;
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": getHeroImage(),
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "keywords": keywords,
    "author": {
      "@type": "Person",
      "name": "Dan Weihmiller",
      "url": "https://danweihmiller.com/about",
      "image": "https://danweihmiller.com/headshot.jpg"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dan Weihmiller Real Estate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://danweihmiller.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://danweihmiller.com${location.pathname}`
    }
  };

  return (
    <>
      <SEO 
        title={`${title} | Dan Weihmiller Real Estate Guide`}
        description={description}
        type="article"
        article={true}
        publishDate={new Date().toISOString()}
        pathname={location.pathname}
        schema={articleSchema}
        keywords={keywords}
      />
      <ArticleContainer>
        <BreadcrumbWrapper>
          <Breadcrumbs items={breadcrumbItems} />
        </BreadcrumbWrapper>
        <HeroSection backgroundImage={getHeroImage()}>
          <HeroContent>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </HeroContent>
        </HeroSection>
        <ArticleMeta>
          <AuthorSection>
            <AuthorImage src={headshot} alt="Dan Weihmiller" />
            <MetaText>
              <AuthorName>Dan Weihmiller</AuthorName>
              <DateInfo>{publishDate}</DateInfo>
            </MetaText>
          </AuthorSection>
          <NavLinks>
            <NavLink to="/resources">← Back to Resources</NavLink>
          </NavLinks>
        </ArticleMeta>
        <ArticleContent>
          {children}
        </ArticleContent>
      </ArticleContainer>
    </>
  );
};

export default ArticleLayout; 