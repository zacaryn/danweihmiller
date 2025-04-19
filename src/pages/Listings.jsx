import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ListingCard from '../components/listings/ListingCard';
import { ListingsService } from '../services/aws-service';
import SEO from '../components/shared/SEO';
import { FaHome, FaSearch, FaChartLine } from 'react-icons/fa';

const ListingsContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} 0;
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.lg} 0;
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
    overflow-x: auto;
    justify-content: flex-start;
    padding: 0 ${props => props.theme.spacing.sm};
    margin-bottom: ${props => props.theme.spacing.lg};
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
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

const TabsContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  top: 80px;
  z-index: 10;
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    top: 60px;
    padding: ${props => props.theme.spacing.sm} 0;
  }
`;

const TabList = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  padding: 0 ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    justify-content: space-around;
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.lightGray};
  }

  svg {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.sm};
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
    font-size: 0.75rem;
    width: 33.33%;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    svg {
      font-size: 1.5rem;
    }
  }
`;

const WidgetContainer = styled.div`
  margin: 0 auto;
  height: calc(100vh - 180px); // Account for navbar and tabs
  min-height: 600px;
  position: relative;
  overflow: hidden; // Prevent scrolling inside the container
  
  @media (max-width: 768px) {
    height: calc(100vh - 140px);
    min-height: 500px;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const SearchLayout = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
  }
`;

const SearchSidebar = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  height: 600px;

  @media (max-width: 1024px) {
    height: 500px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;

const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const SearchInfo = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const SearchTitle = styled.h2`
  font-size: 1.75rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SearchDescription = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SearchTips = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const TipCard = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const TipTitle = styled.h3`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const TipText = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.5;
`;

const ContactCTA = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const CTATitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CTAText = styled.p`
  font-size: 1rem;
  margin-bottom: ${props => props.theme.spacing.md};
  opacity: 0.9;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
  text-decoration: none;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
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
  const [activeTab, setActiveTab] = useState('featured');
  
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
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'search':
        return (
          <SearchContainer>
            <SearchLayout>
              <SearchSidebar>
                <iframe 
                  src="https://danielweihmiller.exprealty.com/embedsmall.php"
                  allowtransparency="true"
                  title="Property Search"
                />
              </SearchSidebar>
              <SearchContent>
                <SearchInfo>
                  <SearchTitle>Start Your Home Search</SearchTitle>
                  <SearchDescription>
                    Use our search tool to explore available properties in Colorado Springs and surrounding areas.
                  </SearchDescription>
                  <SearchTips>
                    <TipCard>
                      <TipTitle>Search Tips</TipTitle>
                      <TipText>
                        Filter by price range, bedrooms, and location. Save your searches to get updates on new listings.
                      </TipText>
                    </TipCard>
                    <TipCard>
                      <TipTitle>Popular Features</TipTitle>
                      <TipText>
                        Look for mountain views, updated kitchens, finished basements, or specific school districts.
                      </TipText>
                    </TipCard>
                  </SearchTips>
                </SearchInfo>
                <ContactCTA>
                  <CTATitle>Need More Hands-on Help?</CTATitle>
                  <CTAText>
                    With over 35 years of experience in Colorado Springs real estate, Dan can help you find the perfect property.
                  </CTAText>
                  <CTAButton href="/contact">Contact Dan</CTAButton>
                </ContactCTA>
              </SearchContent>
            </SearchLayout>
          </SearchContainer>
        );
      case 'featured':
        return (
          <>
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
          </>
        );
      case 'valuation':
        return (
          <div style={{ 
            maxWidth: '1000px', 
            margin: '0 auto', 
            padding: '0 20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{
                fontSize: '24px',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                What's Your Home Worth?
              </h2>
              <iframe 
                src="https://danielweihmiller.exprealty.com/sellembed.php"
                style={{
                  width: '100%',
                  height: '160px',
                  border: 'none',
                  display: 'block'
                }}
                allowtransparency="true"
                frameBorder="0"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
      
      <TabsContainer>
        <TabList>
          <Tab
            active={activeTab === 'search'}
            onClick={() => setActiveTab('search')}
          >
            <FaSearch />
            <span>Property Search</span>
          </Tab>
          <Tab
            active={activeTab === 'featured'}
            onClick={() => setActiveTab('featured')}
          >
            <FaHome />
            <span>Featured Listings</span>
          </Tab>
          <Tab
            active={activeTab === 'valuation'}
            onClick={() => setActiveTab('valuation')}
          >
            <FaChartLine />
            <span>Home Valuation</span>
          </Tab>
        </TabList>
      </TabsContainer>

      <ListingsContainer>
        {renderTabContent()}
      </ListingsContainer>
    </>
  );
};

export default Listings; 