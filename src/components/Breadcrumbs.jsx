import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const BreadcrumbContainer = styled.nav`
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const BreadcrumbList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.darkGray};

  &:not(:last-child)::after {
    content: "›";
    margin: 0 0.5rem;
    color: ${props => props.theme.colors.darkGray};
  }

  a {
    color: ${props => props.theme.colors.darkGray};
    text-decoration: none;
    padding: 4px 0;
    display: inline-block;
    
    &:hover {
      text-decoration: underline;
    }
  }

  &:last-child {
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }

  @media (max-width: 768px) {
    line-height: 1.4;
  }
`;

const Breadcrumbs = ({ items }) => {
  const siteUrl = 'https://danweihmiller.com';
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.path ? `${siteUrl}${item.path}` : undefined
    }))
  };

  return (
    <BreadcrumbContainer>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              item.label
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string
    })
  ).isRequired
};

export default Breadcrumbs; 