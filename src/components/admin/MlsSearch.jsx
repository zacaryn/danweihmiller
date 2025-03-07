import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { fetchListingByAddress, getSampleListing } from '../../services/mlsService';

const SearchContainer = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h2`
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const Form = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.darkGray};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.primary ? props.theme.colors.primary : props.theme.colors.white};
  color: ${props => props.primary ? props.theme.colors.white : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  min-width: 120px;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.lightGray};
  }
`;

const ResultCard = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-top: ${props => props.theme.spacing.md};
`;

const PropertyInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.xs};
  
  span {
    font-weight: bold;
    color: ${props => props.theme.colors.primary};
    margin-right: ${props => props.theme.spacing.xs};
  }
`;

const WarningMessage = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  border: 1px solid #ffeeba;
`;

const MlsSearch = ({ onSearch, onListingFound, onBack }) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(true);

  useEffect(() => {
    // Check if the MLS API is configured
    const apiUrl = import.meta.env.VITE_MLS_API_URL;
    const apiKey = import.meta.env.VITE_MLS_API_KEY;
    
    if (apiUrl && apiKey) {
      setIsDemoMode(false);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Please enter an address to search');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      if (isDemoMode) {
        // For demo purposes, use the sample listing
        setTimeout(() => {
          const listing = getSampleListing();
          setResult(listing);
          setLoading(false);
          
          // If onSearch callback is provided, call it with the result
          if (onSearch) {
            onSearch([listing]);
          }
        }, 1000);
      } else {
        // In production, use the actual API
        const listing = await fetchListingByAddress(address);
        setResult(listing);
        setLoading(false);
        
        // If onSearch callback is provided, call it with the result
        if (onSearch) {
          onSearch([listing]);
        }
      }
    } catch (err) {
      console.error('Error searching MLS:', err);
      setError('Failed to find listing. Please check the address and try again.');
      setLoading(false);
    }
  };

  const handleImport = () => {
    if (result && onListingFound) {
      onListingFound(result);
    }
  };

  return (
    <SearchContainer>
      {isDemoMode && (
        <WarningMessage>
          <strong>Demo Mode:</strong> MLS API credentials not detected. The search will return a sample listing for demonstration purposes. 
          To connect to a real MLS API, add your API credentials to the .env file.
        </WarningMessage>
      )}
      
      <Form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Enter property address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button primary type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
        {onBack && (
          <Button onClick={onBack}>
            Cancel
          </Button>
        )}
      </Form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {result && (
        <ResultCard>
          <h3>Listing Found</h3>
          <PropertyInfo>
            <InfoItem>
              <span>Address:</span> {result.address}
            </InfoItem>
            <InfoItem>
              <span>City/State:</span> {result.city}, {result.state} {result.zipCode}
            </InfoItem>
            <InfoItem>
              <span>Price:</span> ${result.listPrice.toLocaleString()}
            </InfoItem>
            <InfoItem>
              <span>MLS#:</span> {result.mlsNumber}
            </InfoItem>
            <InfoItem>
              <span>Beds:</span> {result.bedrooms}
            </InfoItem>
            <InfoItem>
              <span>Baths:</span> {result.bathrooms}
            </InfoItem>
            <InfoItem>
              <span>Square Feet:</span> {result.squareFeet.toLocaleString()}
            </InfoItem>
            <InfoItem>
              <span>Status:</span> {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
            </InfoItem>
          </PropertyInfo>
          <Button primary onClick={handleImport}>
            Import Listing
          </Button>
        </ResultCard>
      )}
    </SearchContainer>
  );
};

export default MlsSearch; 