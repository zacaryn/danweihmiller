import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import SEO from './shared/SEO';

const ArticleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const ArticleHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.darkGray};
  max-width: 800px;
  margin: 0 auto;
`;

const ArticleContent = styled.div`
  h2 {
    font-size: 2rem;
    color: ${props => props.theme.colors.primary};
    margin: 2rem 0 1rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: ${props => props.theme.colors.text};
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
`;

const CTASection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 600;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ArticleLayout = ({ title, description, children }) => {
  return (
    <>
      <SEO 
        pageName={title}
        description={description}
        isArticle={true}
      />
      <ArticleContainer>
        <ArticleHeader>
          <Title>{title}</Title>
          {description && (
            <Description>{description}</Description>
          )}
        </ArticleHeader>
        
        <ArticleContent>
          {children}
        </ArticleContent>

        <CTASection>
          <CTATitle>Ready to Take the Next Step?</CTATitle>
          <CTAText>
            Let's discuss your real estate goals and how we can help you achieve them.
          </CTAText>
          <CTAButton to="/contact">
            Contact Us Today
          </CTAButton>
        </CTASection>
      </ArticleContainer>
    </>
  );
};

export default ArticleLayout; 