import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Card = styled.a`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.white};
  border: ${props => props.theme.borders.subtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: ${props => props.theme.transitions.fast};
  height: 100%;

  &:hover {
    border-color: rgba(14, 31, 69, 0.22);
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};
  }
`;

const ImageWrap = styled.div`
  position: relative;
  padding-top: 62%;
  background: ${props => props.theme.colors.lightGray};
`;

const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoCount = styled.span`
  position: absolute;
  left: 0.65rem;
  bottom: 0.65rem;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.45rem;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  border-radius: 2px;
`;

const Status = styled.span`
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  background: ${props => (props.$active ? '#2e7d32' : props.theme.colors.darkGray)};
  color: white;
  border-radius: 2px;
`;

const Body = styled.div`
  padding: 1rem 1.1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
`;

const Price = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.65rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  line-height: 1.1;
`;

const Meta = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const Address = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.45;
  color: ${props => props.theme.colors.darkGray};
`;

const MlsRow = styled.p`
  margin: 0.35rem 0 0;
  padding-top: 0.65rem;
  border-top: ${props => props.theme.borders.subtle};
  font-size: 0.78rem;
  color: ${props => props.theme.colors.darkGray};
`;

const formatStatus = (status) => {
  if (!status) return '';
  const lower = status.toLowerCase();
  if (lower === 'active') return 'Active';
  if (lower === 'sold') return 'Sold';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const BrokerageListingCard = ({ listing }) => {
  const isActive = listing.status?.toLowerCase() === 'active';

  return (
    <Card href={listing.detailUrl} target="_blank" rel="noopener noreferrer">
      <ImageWrap>
        {listing.photo && <Image src={listing.photo} alt="" loading="lazy" />}
        {listing.photoCount > 1 && <PhotoCount>{listing.photoCount} photos</PhotoCount>}
        <Status $active={isActive}>{formatStatus(listing.status)}</Status>
      </ImageWrap>
      <Body>
        <Price>{listing.price}</Price>
        <Meta>
          {listing.beds} Beds · {listing.baths} Baths · {listing.squareFeet} sqft ·{' '}
          {listing.propertyType}
        </Meta>
        <Address>{listing.address}</Address>
        <MlsRow>
          MLS# {listing.mlsId}
          {listing.officeName ? ` · ${listing.officeName}` : ''}
        </MlsRow>
      </Body>
    </Card>
  );
};

BrokerageListingCard.propTypes = {
  listing: PropTypes.shape({
    detailUrl: PropTypes.string.isRequired,
    photo: PropTypes.string,
    photoCount: PropTypes.number,
    status: PropTypes.string,
    price: PropTypes.string,
    beds: PropTypes.number,
    baths: PropTypes.number,
    squareFeet: PropTypes.string,
    propertyType: PropTypes.string,
    address: PropTypes.string,
    mlsId: PropTypes.string,
    officeName: PropTypes.string,
  }).isRequired,
};

export default BrokerageListingCard;
