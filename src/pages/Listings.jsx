import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ListingCard from '../components/listings/ListingCard';
import { ListingsService } from '../services/aws-service';
import SEO from '../components/shared/SEO';

const ListingsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md} 0;
  }
`;

const ListingsHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: 0 ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: 0 ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const FilterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.lightGray};
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  padding: 0 ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
    padding: 0;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  padding: ${props => props.theme.spacing.xl};
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.darkGray};
  padding: ${props => props.theme.spacing.xl};
  font-size: 1.125rem;
`;

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await ListingsService.getAllListings();
        setListings(data);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to load listings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchListings();
  }, []);
  
  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true;
    return listing.status === filter;
  });
  
  if (isLoading) {
    return (
      <ListingsContainer>
        <LoadingSpinner>Loading listings...</LoadingSpinner>
      </ListingsContainer>
    );
  }
  
  if (error) {
    return (
      <ListingsContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </ListingsContainer>
    );
  }
  
  return (
    <>
      <SEO 
        pageName="Listings" 
        description="Browse Dan Weihmiller's featured real estate listings in Colorado Springs. Find homes, properties, and investment opportunities in top neighborhoods."
        image="/images/og-image.jpg"
      />
      
      <ListingsContainer>
        <ListingsHeader>
          <Title>Available Properties</Title>
          <Subtitle>
            Explore our collection of exceptional properties in Colorado Springs and find your perfect home.
          </Subtitle>
        </ListingsHeader>
        
        <FilterBar>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Properties
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
          <EmptyMessage>
            No {filter !== 'all' ? filter : ''} properties available at the moment.
          </EmptyMessage>
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