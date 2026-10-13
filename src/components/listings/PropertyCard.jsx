import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi';
import { listingBadges, listingPath, splitAddress } from '../../hooks/useCbListings';

const NAVY = '#0E1F45';
const PREVIEW_PHOTOS = 5;

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border: 1px solid rgba(14, 31, 69, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(14, 31, 69, 0.12);
    transform: translateY(-2px);
  }

  &:hover [data-arrow] {
    opacity: 1;
  }
`;

const Main = styled(Link)`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: inherit;
  text-decoration: none;
`;

const Photo = styled.div`
  position: relative;
  aspect-ratio: 3 / 2;
  background: ${p => p.theme.colors.lightGray};
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.25s ease;
  }

  ${p => p.$sold && 'img { filter: grayscale(0.35); }'}
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  margin-top: -1rem;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: ${NAVY};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease;

  svg {
    width: 1rem;
    height: 1rem;
  }

  @media (hover: none) {
    display: none;
  }
`;

const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0.6rem;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.35);
  }

  span[data-on] {
    background: #fff;
  }
`;

const Badges = styled.div`
  position: absolute;
  left: 0.6rem;
  top: 0.6rem;
  display: flex;
  gap: 0.35rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.22rem 0.5rem;
  border-radius: 4px;
  background: ${p => (p.$tone === 'new' ? '#2e7d32' : 'rgba(10, 16, 32, 0.78)')};
  color: #fff;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.03em;

  svg {
    width: 0.7rem;
    height: 0.7rem;
  }
`;

const Status = styled.span`
  position: absolute;
  right: 0.6rem;
  top: 0.6rem;
  padding: 0.22rem 0.5rem;
  border-radius: 4px;
  background: ${p => (p.$sold ? '#b42318' : '#fff')};
  color: ${p => (p.$sold ? '#fff' : NAVY)};
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PhotoCount = styled.span`
  position: absolute;
  right: 0.6rem;
  bottom: 0.55rem;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  background: rgba(10, 16, 32, 0.65);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.9rem 1rem 0.75rem;
`;

const Price = styled.p`
  margin: 0;
  font-family: ${p => p.theme.fonts.heading};
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 1.1;
  color: ${NAVY};
`;

const Facts = styled.p`
  margin: 0.1rem 0 0;
  font-size: 0.9rem;
  color: ${p => p.theme.colors.darkGray};

  strong {
    color: ${p => p.theme.colors.text};
  }
`;

const Street = styled.p`
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${p => p.theme.colors.text};
`;

const City = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${p => p.theme.colors.darkGray};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding: 0.65rem 1rem 0.8rem;
  border-top: 1px solid rgba(14, 31, 69, 0.08);
  font-size: 0.75rem;
  color: ${p => p.theme.colors.darkGray};
`;

const ShowingLink = styled(Link)`
  flex: 0 0 auto;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${p => p.theme.colors.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

/** Listing card: swipe or arrow through the first few photos, badges, price, facts, and a showing shortcut. */
const PropertyCard = ({ listing }) => {
  const photos = (listing.photos?.length ? listing.photos : [listing.photo]).filter(Boolean).slice(0, PREVIEW_PHOTOS);
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const sold = listing.status === 'sold';
  const { street, city } = splitAddress(listing.address);
  const path = listingPath(listing);

  const step = (delta) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + delta + photos.length) % photos.length);
  };

  return (
    <Card>
      <Main to={path} aria-label={`${street}, ${listing.price}`}>
        <Photo
          $sold={sold}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null || photos.length < 2) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 35) setIndex((i) => (i + (dx < 0 ? 1 : -1) + photos.length) % photos.length);
          }}
        >
          {photos[index] && <img src={photos[index]} alt="" loading="lazy" draggable={false} />}
          <Badges>
            {listingBadges(listing).map((b) => (
              <Badge key={b.key} $tone={b.key}>
                {b.key === 'video' && <FiPlay aria-hidden />}
                {b.label}
              </Badge>
            ))}
          </Badges>
          <Status $sold={sold}>{sold ? 'Sold' : 'For sale'}</Status>
          {photos.length > 1 && (
            <>
              <Arrow data-arrow type="button" style={{ left: '0.5rem' }} aria-label="Previous photo" onClick={step(-1)}>
                <FiChevronLeft />
              </Arrow>
              <Arrow data-arrow type="button" style={{ right: '0.5rem' }} aria-label="Next photo" onClick={step(1)}>
                <FiChevronRight />
              </Arrow>
              <Dots aria-hidden>
                {photos.map((p, i) => (
                  <span key={p} data-on={i === index ? '' : undefined} />
                ))}
              </Dots>
            </>
          )}
          {listing.photoCount > 1 && <PhotoCount>{listing.photoCount} photos</PhotoCount>}
        </Photo>
        <Body>
          <Price>{listing.price}</Price>
          <Facts>
            <strong>{listing.beds}</strong> bd · <strong>{listing.baths}</strong> ba · <strong>{listing.squareFeet}</strong> sq ft
          </Facts>
          <Street>{street}</Street>
          {city && <City>{city}</City>}
        </Body>
      </Main>
      <Footer>
        <span>MLS# {listing.mlsId}</span>
        {!sold && <ShowingLink to={`${path}#inquiry`}>Request a showing →</ShowingLink>}
      </Footer>
    </Card>
  );
};

PropertyCard.propTypes = {
  listing: PropTypes.shape({
    slug: PropTypes.string,
    mlsId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    photo: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    photoCount: PropTypes.number,
    status: PropTypes.string,
    price: PropTypes.string,
    beds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    baths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    squareFeet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    address: PropTypes.string,
    daysOnMarket: PropTypes.number,
  }).isRequired,
};

export default PropertyCard;
