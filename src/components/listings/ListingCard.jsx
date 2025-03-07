import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  transition: ${props => props.theme.transitions.default};
  display: block;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Status = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => {
    switch (props.status) {
      case 'active': return 'rgba(46, 204, 113, 0.9)';
      case 'pending': return 'rgba(241, 196, 15, 0.9)';
      case 'sold': return 'rgba(231, 76, 60, 0.9)';
      default: return 'rgba(0, 0, 0, 0.7)';
    }
  }};
  color: white;
  border-radius: ${props => props.theme.borderRadius.small};
  font-weight: 500;
`;

const Content = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Price = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const Address = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const Features = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.darkGray};
  font-size: 0.9rem;
`;

const ListingCard = ({ listing }) => {
  const { 
    id,
    images, 
    status, 
    price, 
    address, 
    city, 
    state, 
    zipCode,
    bedrooms,
    bathrooms,
    squareFeet
  } = listing;

  return (
    <Card to={`/listings/${id}`}>
      <ImageContainer>
        <Image src={images[0]} alt={address} />
        <Status status={status}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Status>
      </ImageContainer>
      <Content>
        <Price>${price.toLocaleString()}</Price>
        <Address>{address}</Address>
        <Address>{city}, {state} {zipCode}</Address>
        <Features>
          <span>{bedrooms} Beds</span>
          <span>{bathrooms} Baths</span>
          <span>{squareFeet.toLocaleString()} Sq Ft</span>
        </Features>
      </Content>
    </Card>
  );
};

export default ListingCard; 