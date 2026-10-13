import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { button } from '../../styles/buttons';
import PropTypes from 'prop-types';
import { FiPlay } from 'react-icons/fi';
import { listingBadges, listingPath, splitAddress } from '../../hooks/useCbListings';
import { mediaForListing } from '../../config/listing-media';
import { trackPixelCustom } from '../../lib/meta-pixel';

const NAVY = '#0E1F45';

const Wrap = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
  background: #fff;
  border: 1px solid rgba(14, 31, 69, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 34px rgba(14, 31, 69, 0.08);

  @media (max-width: 860px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Media = styled.div`
  position: relative;
  min-height: 360px;
  background: #0b1225;
  overflow: hidden;

  @media (max-width: 860px) {
    min-height: 0;
    aspect-ratio: 3 / 2;
  }
`;

const Cover = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Backdrop = styled.img`
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
  object-fit: cover;
  filter: blur(26px) brightness(0.5);
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  aspect-ratio: 9 / 16;
  max-width: 100%;
  background: #000;
`;

const PlayButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem 0.8rem 1rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: ${NAVY};
  font: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.15s ease;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.04);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  padding: clamp(1.25rem, 3vw, 2.25rem);
`;

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.secondary};
`;

const Price = styled.p`
  margin: 0.2rem 0 0;
  font-family: ${p => p.theme.fonts.heading};
  font-size: clamp(2.1rem, 4vw, 2.8rem);
  font-weight: 600;
  line-height: 1.05;
  color: ${NAVY};
`;

const Street = styled.h3`
  margin: 0.3rem 0 0;
  font-family: ${p => p.theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${p => p.theme.colors.text};
`;

const City = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: ${p => p.theme.colors.darkGray};
`;

const Facts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin: 0.9rem 0 0;
  padding: 0.85rem 0 0;
  list-style: none;
  border-top: 1px solid rgba(14, 31, 69, 0.1);

  li {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.darkGray};
  }

  strong {
    display: block;
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1.45rem;
    letter-spacing: 0;
    color: ${NAVY};
    text-transform: none;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 0.35rem;
  margin-top: 0.75rem;

  span {
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background: ${p => p.theme.colors.lightGray};
    font-size: 0.72rem;
    font-weight: 700;
    color: ${NAVY};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.1rem;
`;

const Button = styled(Link)`
  ${p => button(p.$primary ? 'primary' : 'outline')}
`;

/** Featured listing: big photo (or inline video tour), price, facts and the two key actions. */
const ListingSpotlight = ({ listing, eyebrow = 'Featured listing' }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const media = mediaForListing(listing.mlsId);
  const { street, city } = splitAddress(listing.address);
  const path = listingPath(listing);
  const sold = listing.status === 'sold';
  const cover = listing.photos?.[0] || listing.photo;

  const play = () => {
    setPlaying(true);
    trackPixelCustom('PlayListingVideo', { content_name: listing.address, content_ids: [String(listing.mlsId)] });
    setTimeout(() => videoRef.current?.play().catch(() => {}), 0);
  };

  return (
    <Wrap>
      <Media>
        {playing && media?.video ? (
          <>
            {media.poster && <Backdrop src={media.poster} alt="" aria-hidden />}
            <Video ref={videoRef} src={media.video} poster={media.poster} controls playsInline preload="metadata" />
          </>
        ) : (
          <>
            {cover && <Cover src={cover} alt={`${street}, ${city}`} />}
            {media?.video && (
              <PlayButton type="button" onClick={play}>
                <FiPlay aria-hidden /> Watch the video tour
              </PlayButton>
            )}
          </>
        )}
      </Media>
      <Info>
        <Eyebrow>{sold ? 'Recently sold' : eyebrow}</Eyebrow>
        <Price>{listing.price}</Price>
        <Street>{street}</Street>
        {city && <City>{city}</City>}
        <Facts>
          <li>
            <strong>{listing.beds}</strong>Beds
          </li>
          <li>
            <strong>{listing.baths}</strong>Baths
          </li>
          <li>
            <strong>{listing.squareFeet}</strong>Sq Ft
          </li>
        </Facts>
        {listingBadges(listing).length > 0 && (
          <Tags>
            {listingBadges(listing).map((b) => (
              <span key={b.key}>{b.label}</span>
            ))}
          </Tags>
        )}
        <Actions>
          <Button to={path} $primary>
            View this home
          </Button>
          {!sold && <Button to={`${path}#inquiry`}>Request a showing</Button>}
        </Actions>
      </Info>
    </Wrap>
  );
};

ListingSpotlight.propTypes = {
  listing: PropTypes.object.isRequired,
  eyebrow: PropTypes.string,
};

export default ListingSpotlight;
