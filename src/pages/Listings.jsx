import styled from '@emotion/styled';
import ListingCard from '../components/listings/ListingCard';
import { useState, useEffect } from 'react';
import { getListings } from '../services/listings-service';
import SEO from '../components/shared/SEO';

const ListingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  padding-top: calc(80px + ${props => props.theme.spacing.md});
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
    padding-top: calc(60px + ${props => props.theme.spacing.md});
  }
`;

const ListingsHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.darkGray};
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const ComingSoonMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};

  h2 {
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const PrimaryButton = styled.a`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  transition: ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.small};
  border: 2px solid ${props => props.theme.colors.primary};
  min-width: 160px;
  text-align: center;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    border-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: ${props => props.theme.spacing.sm};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const FilterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  box-shadow: ${props => props.theme.shadows.small};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: 0.9rem;
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.primary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.error};
`;

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getListings();
        setListings(data);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to load listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true;
    return listing.status === filter;
  });

  if (loading) {
    return (
      <ListingsContainer>
        <ListingsHeader>
          <Title>Property Listings</Title>
        </ListingsHeader>
        <LoadingSpinner>Loading listings...</LoadingSpinner>
      </ListingsContainer>
    );
  }

  if (error) {
    return (
      <ListingsContainer>
        <ListingsHeader>
          <Title>Property Listings</Title>
        </ListingsHeader>
        <ErrorMessage>{error}</ErrorMessage>
      </ListingsContainer>
    );
  }

  return (
    <>
      <SEO 
        pageName="Listings" 
        description="Browse Dan Weihmiller's featured real estate listings in Colorado Springs and the Front Range. Find homes, properties, and investment opportunities in top neighborhoods."
        image="/images/og-image.jpg"
      />
      
      <ListingsContainer>
        <ListingsHeader>
          <Title>Property Listings</Title>
          <Subtitle>
            Discover available properties in the Front Range of Colorado Springs
          </Subtitle>
        </ListingsHeader>

        <FilterBar>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All Listings
          </FilterButton>
          <FilterButton 
            active={filter === 'active'} 
            onClick={() => setFilter('active')}
          >
            Active
          </FilterButton>
          <FilterButton 
            active={filter === 'pending'} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </FilterButton>
          <FilterButton 
            active={filter === 'sold'} 
            onClick={() => setFilter('sold')}
          >
            Sold
          </FilterButton>
        </FilterBar>

        {filteredListings.length === 0 ? (
          <ErrorMessage>No listings found.</ErrorMessage>
        ) : (
          <ListingsGrid>
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </ListingsGrid>
        )}
      </ListingsContainer>
    </>
  );
};

export default Listings; 