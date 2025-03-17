import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ListingsService } from '../services/aws-service';
import { FaExternalLinkAlt, FaHome } from 'react-icons/fa';
import SEO from '../components/shared/SEO';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
  padding-top: calc(80px + ${props => props.theme.spacing.md});

  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.sm};
    padding-top: calc(60px + ${props => props.theme.spacing.sm});
  }
`;

const ImageGallery = styled.div`
  position: relative;
  height: 500px;
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
  overflow-x: auto;
  padding-bottom: ${props => props.theme.spacing.sm};
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    opacity: 1;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Details = styled.div`
  h1 {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
  }
`;

const Sidebar = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  height: fit-content;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${props => props.theme.spacing.md} 0;

  li {
    padding: ${props => props.theme.spacing.sm} 0;
    border-bottom: 1px solid ${props => props.theme.colors.lightGray};
    display: flex;
    justify-content: space-between;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: ${props => props.theme.spacing.md};
`;

const BaseButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const ContactButton = styled(BaseButton)`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const ViewListingButton = styled(BaseButton)`
  background: white;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const BackButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: transparent;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  margin-bottom: ${props => props.theme.spacing.md};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
`;

const OneHomeButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #007ead; /* OneHome blue color */
  color: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  text-decoration: none;
  font-weight: 500;
  width: 100%;
  margin-top: ${props => props.theme.spacing.sm};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: #005e82;
    transform: translateY(-2px);
  }
`;

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const data = await ListingsService.getListing(id);
      setListing(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching listing details:', error);
      setError('Failed to load listing details. Please try again later.');
      setLoading(false);
    }
  };

  // Generate dynamic SEO content based on the listing data
  const getSeoMetadata = () => {
    if (!listing) {
      return {
        title: 'Property Details',
        description: 'View detailed information about this property listing with Dan Weihmiller Real Estate in Colorado Springs.',
        image: '/images/og-image.jpg'
      };
    }

    return {
      title: `${listing.title}`,
      description: `${listing.bedrooms} bed, ${listing.bathrooms} bath, ${listing.squareFeet.toLocaleString()} sq ft home for ${listing.status === 'sold' ? 'SOLD' : '$' + listing.price.toLocaleString()} in ${listing.city}, ${listing.state}. ${listing.description.substring(0, 100)}...`,
      image: listing.images && listing.images.length > 0 ? listing.images[0] : '/images/og-image.jpg'
    };
  };

  const seoData = getSeoMetadata();

  if (loading) {
    return (
      <DetailContainer>
        <LoadingSpinner>Loading listing details...</LoadingSpinner>
      </DetailContainer>
    );
  }

  if (error) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate('/listings')}>Back to Listings</BackButton>
        <ErrorMessage>{error}</ErrorMessage>
      </DetailContainer>
    );
  }

  if (!listing) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate('/listings')}>Back to Listings</BackButton>
        <ErrorMessage>Listing not found</ErrorMessage>
      </DetailContainer>
    );
  }

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        image={seoData.image}
        pageName={listing ? `Property - ${listing.address}` : 'Property Details'}
      />
      
      <DetailContainer>
        <BackButton onClick={() => navigate('/listings')}>Back to Listings</BackButton>

        <ImageGallery>
          <MainImage src={listing.images[activeImage]} alt={listing.title} />
        </ImageGallery>

        {listing.images.length > 1 && (
          <Thumbnails>
            {listing.images.map((image, index) => (
              <Thumbnail
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                active={activeImage === index}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </Thumbnails>
        )}

        <ContentGrid>
          <Details>
            <h1>{listing.title}</h1>
            <p>{listing.address}</p>
            <p>{listing.city}, {listing.state} {listing.zipCode}</p>
            {listing.mlsNumber && <p>MLS# {listing.mlsNumber}</p>}
            <p>{listing.description}</p>
          </Details>

          <Sidebar>
            <h2>${listing.price.toLocaleString()}</h2>
            <FeatureList>
              <li>
                <span>Bedrooms</span>
                <span>{listing.bedrooms}</span>
              </li>
              <li>
                <span>Bathrooms</span>
                <span>{listing.bathrooms}</span>
              </li>
              <li>
                <span>Square Feet</span>
                <span>{listing.squareFeet.toLocaleString()}</span>
              </li>
              <li>
                <span>Status</span>
                <span>{listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}</span>
              </li>
            </FeatureList>
            <ButtonGroup>
              <ContactButton as={Link} to={`/contact?listing=${id}`}>Contact Agent</ContactButton>
              {listing.oneHomeUrl && (
                <OneHomeButton href={listing.oneHomeUrl} target="_blank" rel="noopener noreferrer">
                  <FaHome size={16} /> View on OneHome <FaExternalLinkAlt size={12} />
                </OneHomeButton>
              )}
            </ButtonGroup>
          </Sidebar>
        </ContentGrid>
      </DetailContainer>
    </>
  );
};

export default ListingDetail; 