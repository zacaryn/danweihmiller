import styled from '@emotion/styled';

export const ArticleContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ArticleHeader = styled.header`
  margin-bottom: 2.5rem;
  text-align: center;
`;

export const ArticleTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

export const ArticleDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};
  max-width: 600px;
  margin: 0 auto;
`;

export const Section = styled.section`
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.25rem;
  line-height: 1.3;
`;

export const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

export const ListItem = styled.li`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: ${props => props.theme.shadows.small};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

export const ItemDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};
`;

export const Highlight = styled.div`
  background: ${props => props.theme.colors.background};
  border-left: 4px solid ${props => props.theme.colors.primary};
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 ${props => props.theme.borderRadius.medium} ${props => props.theme.borderRadius.medium} 0;
`;

export const HighlightText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
  margin: 0;
  font-style: italic;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 2.5rem;
`;

export const CTAButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${props => props.theme.colors.lightGray};
  margin: 2.5rem 0;
`; 