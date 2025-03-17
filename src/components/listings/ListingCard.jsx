import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  transition: ${props => props.theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.67%; // 3:2 aspect ratio
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FallbackImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.darkGray};
  font-size: 1rem;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background-color: #4CAF50;
          color: white;
        `;
      case 'pending':
        return `
          background-color: #FFA000;
          color: white;
        `;
      case 'sold':
        return `
          background-color: #F44336;
          color: white;
        `;
      default:
        return '';
    }
  }}
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.md};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
  font-size: 1.25rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Details = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.875rem;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const Description = styled.p`
  margin: 0 0 ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.875rem;
  line-height: 1.5;
  flex-grow: 1;
  
  /* Limit to 3 lines with ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`;

const Button = styled.a`
  flex: 1;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  font-size: 1.05rem;
  
  ${props => props.primary ? `
    background-color: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background-color: ${props.theme.colors.secondary};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.medium};
    }
  ` : `
    background-color: ${props.theme.colors.lightGray};
    color: ${props.theme.colors.text};
    
    &:hover {
      background-color: ${props.theme.colors.accent};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.small};
    }
  `}
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    height: 56px;
    padding: ${props => props.theme.spacing.md};
  }
`;

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ListingCard = ({ listing }) => {
  const [imageError, setImageError] = useState(false);
  const [publicImageUrl, setPublicImageUrl] = useState(null);
  
  const {
    id,
    title,
    price,
    status,
    bedrooms,
    bathrooms,
    squareFeet,
    description,
    coverImage,
    images,
    externalLink
  } = listing;
  
  // Determine the image URL to use
  const originalImageUrl = coverImage || (images && images.length > 0 ? images[0] : null);
  
  // Handle image load error and convert protected URLs to public
  const handleImageError = () => {
    console.log('Image failed to load:', originalImageUrl);
    setImageError(true);
  };
  
  useEffect(() => {
    if (originalImageUrl) {
      // Convert protected URL to public URL if needed
      if (originalImageUrl.includes('/protected/')) {
        const convertToPublicUrl = (url) => {
          // Extract the file path from the protected URL (everything after the bucket name)
          const urlParts = url.split('danweihmiller-property-images.s3.us-east-1.amazonaws.com/protected/');
          if (urlParts.length > 1) {
            // Get the path after "/protected/" but before any query parameters
            let filePath = urlParts[1].split('?')[0];
            // Construct the public URL
            return `https://danweihmiller-property-images.s3.us-east-1.amazonaws.com/public/${filePath}`;
          }
          return url;
        };
        
        const publicUrl = convertToPublicUrl(originalImageUrl);
        console.log('Converting to public URL:', publicUrl);
        setPublicImageUrl(publicUrl);
      } else {
        setPublicImageUrl(originalImageUrl);
      }
    }
  }, [originalImageUrl]);
  
  // Use the public image URL if available, otherwise use the original
  const imageUrl = publicImageUrl || originalImageUrl;
  
  return (
    <Card>
      <ImageContainer>
        {imageUrl && !imageError ? (
          <Image 
            src={imageUrl} 
            alt={title}
            onError={handleImageError} 
          />
        ) : (
          <FallbackImage>
            <i className="fas fa-home" style={{ fontSize: '3rem', opacity: 0.5 }}></i>
          </FallbackImage>
        )}
        <StatusBadge status={status}>{status}</StatusBadge>
      </ImageContainer>
      
      <Content>
        <Title>{title}</Title>
        <Price>{formatPrice(price)}</Price>
        
        <Details>
          <Detail>
            <i className="fas fa-bed" />
            {bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}
          </Detail>
          <Detail>
            <i className="fas fa-bath" />
            {bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}
          </Detail>
          <Detail>
            <i className="fas fa-ruler-combined" />
            {new Intl.NumberFormat().format(squareFeet)} sqft
          </Detail>
        </Details>
        
        <Description>{description}</Description>
        
        <ButtonGroup>
          <Button
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            primary
          >
            View Details
          </Button>
          <Button
            as={Link}
            to={`/contact?listing=${id}`}
          >
            Contact Agent
          </Button>
        </ButtonGroup>
      </Content>
    </Card>
  );
};

export default ListingCard; 