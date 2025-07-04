import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ListingCard from '../components/listings/ListingCard';
import { ListingsService } from '../services/aws-service';
import SEO from '../components/shared/SEO';
import { FaHome } from 'react-icons/fa';

const ListingsContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg} 0;
  
  @media (max-width: 768px) {
    padding: 80px ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`;

const ListingsHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: 0 ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.theme.spacing.md};
  }
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${props => props.theme.spacing.sm};
    padding: 0 ${props => props.theme.spacing.sm};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xs};
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
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
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





const ValuationContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const ValuationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.medium};

  @media (max-width: 768px) {
    gap: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.md};
  }
`;

const ValuationHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ValuationTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ValuationDescription = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 1.1rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ValuationFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const ValuationFeature = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ValuationIframeContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  height: 450px;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: 1024px) {
    height: 400px;
  }

  @media (max-width: 768px) {
    height: 350px;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
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
        title="Dan Weihmiller | Colorado Springs Real Estate Listings"
        description="Browse Dan Weihmiller's featured real estate listings in Colorado Springs. Find homes, properties, and investment opportunities in top neighborhoods."
        image="/images/og-image.jpg"
      />
      
      <ListingsContainer>
        <ListingsHeader>
          <Title>My Listings</Title>
          <Subtitle>
            Explore exclusive properties I'm representing for clients throughout Colorado Springs and surrounding areas.
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