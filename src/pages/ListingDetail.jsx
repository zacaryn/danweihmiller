import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import SEO from '../components/shared/SEO';
import { PageRoot, PageMain, EngagementCTA } from '../components/layout/PageShell';
import { fetchCbListingDetail } from '../services/cb-listings-service';
import { mediaForListing } from '../config/listing-media';
import { AGENT_NAME, AGENT_PHONE, AGENT_PHONE_HREF, BROKERAGE_NAME, CB_AGENT_PROFILE_URL } from '../config/agent';
import { trackPixel, trackPixelCustom } from '../lib/meta-pixel';

const SMS_HREF = 'sms:7193018257';

const Wrap = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: calc(var(--site-nav-height, 72px) + 1.5rem) 1.25rem 0;

  @media (max-width: 768px) {
    padding: calc(var(--site-nav-height, 68px) + 1rem) 1rem 0;
  }
`;

const Crumb = styled.p`
  margin: 0 0 1rem;
  font-size: 0.82rem;
  color: ${props => props.theme.colors.darkGray};

  a {
    color: ${props => props.theme.colors.secondary};
    font-weight: 600;
    text-decoration: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(300px, 1fr);
  gap: 2rem;
  align-items: start;

  /* let columns shrink below their content (the thumbnail strip would otherwise widen the page) */
  & > * {
    min-width: 0;
  }

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }
`;

const MainPhoto = styled.button`
  display: block;
  position: relative;
  width: 100%;
  padding: 0;
  padding-top: 66%;
  border: 0;
  border-radius: 6px;
  overflow: hidden;
  background: ${props => props.theme.colors.lightGray};
  cursor: zoom-in;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
`;

const Thumb = styled.button`
  flex: 0 0 auto;
  width: 92px;
  height: 64px;
  padding: 0;
  border: 2px solid ${props => (props.$active ? props.theme.colors.primary : 'transparent')};
  border-radius: 4px;
  overflow: hidden;
  background: ${props => props.theme.colors.lightGray};
  cursor: pointer;
  opacity: ${props => (props.$active ? 1 : 0.8)};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Panel = styled.aside`
  position: sticky;
  top: calc(var(--site-nav-height, 72px) + 1rem);
  background: ${props => props.theme.colors.white};
  border: 1px solid rgba(14, 31, 69, 0.12);
  border-radius: 6px;
  padding: 1.5rem;

  @media (max-width: 960px) {
    position: static;
  }
`;

const StatusPill = styled.span`
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.55rem;
  border-radius: 2px;
  color: white;
  background: ${props => (props.$active ? '#2e7d32' : props.theme.colors.darkGray)};
`;

const Price = styled.p`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2.6rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0.6rem 0 0.2rem;
  line-height: 1.05;
`;

const Address = styled.h1`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.05rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 1rem;
  line-height: 1.45;
`;

const Facts = styled.ul`
  list-style: none;
  margin: 0 0 1.25rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(14, 31, 69, 0.1);
  border-bottom: 1px solid rgba(14, 31, 69, 0.1);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  text-align: center;

  strong {
    display: block;
    font-family: ${props => props.theme.fonts.heading};
    font-size: 1.6rem;
    color: ${props => props.theme.colors.primary};
    line-height: 1.1;
  }

  span {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.darkGray};
  }
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.95rem 1rem;
  margin-bottom: 0.6rem;
  border-radius: 3px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid ${props => props.theme.colors.primary};
  background: ${props => (props.$primary ? props.theme.colors.primary : 'transparent')};
  color: ${props => (props.$primary ? 'white' : props.theme.colors.primary)};
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${props => (props.$primary ? props.theme.colors.secondary : props.theme.colors.lightGray)};
  }
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
`;

const AgentNote = styled.p`
  margin: 0.4rem 0 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.darkGray};
  text-align: center;
`;

const OutLink = styled.a`
  display: block;
  margin-top: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Section = styled.section`
  margin-top: 2.25rem;

  h2 {
    font-family: ${props => props.theme.fonts.heading};
    font-size: 1.6rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin: 0 0 0.75rem;
  }
`;

const Description = styled.p`
  margin: 0;
  max-width: 72ch;
  font-size: 1rem;
  line-height: 1.75;
  color: ${props => props.theme.colors.text};
  white-space: pre-line;
`;

const DetailList = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0 1.5rem;
  margin: 0;

  div {
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(14, 31, 69, 0.08);
  }

  dt {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${props => props.theme.colors.darkGray};
  }

  dd {
    margin: 0.2rem 0 0;
    font-size: 1rem;
    color: ${props => props.theme.colors.text};
  }
`;

const VideoWrap = styled.div`
  max-width: 380px;

  video {
    width: 100%;
    aspect-ratio: 9 / 16;
    border-radius: 6px;
    background: #000;
    display: block;
  }
`;

const Disclaimer = styled.p`
  margin: 2rem 0 0;
  font-size: 0.72rem;
  line-height: 1.55;
  color: ${props => props.theme.colors.darkGray};
  opacity: 0.85;
`;

const StateMessage = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};

  a {
    color: ${props => props.theme.colors.secondary};
    font-weight: 600;
  }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(10, 16, 32, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const LightboxButton = styled.button`
  position: absolute;
  background: rgba(255, 255, 255, 0.14);
  border: 0;
  color: white;
  font-size: 1.6rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  cursor: pointer;
`;

const stripHtml = (html) => (html ? html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '');

function formatLot(listing) {
  const acres = Number(listing.lotSizeAcres);
  const sqft = Number(listing.lotSizeSquareFeet);
  if (acres && sqft) return `${acres.toFixed(2)} acres (${sqft.toLocaleString()} sq ft)`;
  if (acres) return `${acres.toFixed(2)} acres`;
  if (sqft) return `${sqft.toLocaleString()} sq ft`;
  return null;
}

/** Listing page, built from the Coldwell Banker sync. Works for every listing on Dan's profile automatically. */
const ListingDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | missing | error
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState('loading');
    setPhotoIndex(0);
    fetchCbListingDetail(id)
      .then((d) => {
        if (cancelled) return;
        if (!d) {
          setState('missing');
          return;
        }
        setData(d);
        setState('ready');
      })
      .catch((err) => {
        console.error('Listing load failed:', err);
        if (!cancelled) setState('error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const listing = data?.listing;
  const photos = listing?.photos?.length ? listing.photos : listing?.photo ? [listing.photo] : [];

  useEffect(() => {
    if (!listing) return;
    trackPixel('ViewContent', {
      content_name: listing.address,
      content_ids: [String(listing.mlsId)],
      content_type: 'home_listing',
      value: listing.priceNumber || undefined,
      currency: 'USD',
    });
  }, [listing]);

  useEffect(() => {
    if (!lightbox || photos.length === 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setPhotoIndex((i) => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, photos.length]);

  if (state !== 'ready') {
    return (
      <PageRoot>
        <SEO pageName="Listing" title={`Listing | ${AGENT_NAME}, ${BROKERAGE_NAME}`} noIndex />
        <Wrap>
          <StateMessage>
            {state === 'loading' && 'Loading listing…'}
            {state === 'missing' && (
              <>
                This listing is no longer available. <Link to="/listings">See Dan&apos;s current listings</Link> or{' '}
                <Link to="/contact">contact Dan</Link>.
              </>
            )}
            {state === 'error' && (
              <>
                This listing couldn&apos;t be loaded right now.{' '}
                <a href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  View it on Coldwell Banker
                </a>{' '}
                or call Dan at <a href={AGENT_PHONE_HREF}>{AGENT_PHONE}</a>.
              </>
            )}
          </StateMessage>
        </Wrap>
      </PageRoot>
    );
  }

  const isActive = listing.status === 'active';
  const media = mediaForListing(listing.mlsId);
  const street = listing.address?.split(',')[0] || listing.address;
  const showingTopic = `Showing request: ${listing.address} (MLS# ${listing.mlsId})`;
  const pixelParams = { content_name: listing.address, content_ids: [String(listing.mlsId)] };
  const details = [
    ['Property type', listing.propertyType],
    ['Year built', listing.yearBuilt],
    ['Lot size', formatLot(listing)],
    ['Heating', listing.heating],
    ['Cooling', listing.cooling],
    ['MLS#', listing.mlsId],
  ].filter(([, v]) => v !== null && v !== undefined && v !== '');

  const step = (delta) => (e) => {
    e.stopPropagation();
    setPhotoIndex((i) => (i + delta + photos.length) % photos.length);
  };

  return (
    <>
      <SEO
        pageName={street}
        title={`${street} · ${listing.price} | ${AGENT_NAME}, ${BROKERAGE_NAME}`}
        description={`${listing.address}: ${listing.beds} bed, ${listing.baths} bath, ${listing.squareFeet} sq ft ${(
          listing.propertyType || 'home'
        ).toLowerCase()} listed at ${listing.price}. Schedule a private showing with ${AGENT_NAME}.`}
        image={photos[0]}
        useDynamicOg={false}
      />
      <PageRoot>
        <Wrap>
          <Crumb>
            <Link to="/listings">My Listings</Link> / {street}
          </Crumb>

          <Grid>
            <div>
              {photos.length > 0 && (
                <>
                  <MainPhoto type="button" onClick={() => setLightbox(true)} aria-label="Open photo gallery">
                    <img src={photos[photoIndex]} alt={`${street}, photo ${photoIndex + 1} of ${photos.length}`} />
                  </MainPhoto>
                  {photos.length > 1 && (
                    <Thumbs>
                      {photos.map((src, i) => (
                        <Thumb
                          key={src}
                          type="button"
                          $active={i === photoIndex}
                          onClick={() => setPhotoIndex(i)}
                          aria-label={`Show photo ${i + 1}`}
                        >
                          <img src={src} alt="" loading="lazy" />
                        </Thumb>
                      ))}
                    </Thumbs>
                  )}
                </>
              )}
            </div>

            <Panel>
              <StatusPill $active={isActive}>{isActive ? 'For Sale' : listing.status}</StatusPill>
              <Price>{listing.price}</Price>
              <Address>{listing.address}</Address>
              <Facts>
                <li>
                  <strong>{listing.beds}</strong>
                  <span>Beds</span>
                </li>
                <li>
                  <strong>{listing.baths}</strong>
                  <span>Baths</span>
                </li>
                <li>
                  <strong>{listing.squareFeet}</strong>
                  <span>Sq Ft</span>
                </li>
              </Facts>

              {isActive && (
                <Button
                  as={Link}
                  to={`/contact?topic=${encodeURIComponent(showingTopic)}`}
                  $primary
                  onClick={() => trackPixel('Schedule', pixelParams)}
                >
                  Request a Private Showing
                </Button>
              )}
              <ButtonRow>
                <Button href={AGENT_PHONE_HREF} onClick={() => trackPixel('Contact', { ...pixelParams, method: 'call' })}>
                  Call Dan
                </Button>
                <Button href={SMS_HREF} onClick={() => trackPixel('Contact', { ...pixelParams, method: 'text' })}>
                  Text Dan
                </Button>
              </ButtonRow>
              <AgentNote>
                {AGENT_NAME} · {AGENT_PHONE}
                <br />
                {BROKERAGE_NAME}
              </AgentNote>
              <OutLink
                href={listing.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackPixelCustom('ViewCBListing', pixelParams)}
              >
                Full listing details on Coldwell Banker →
              </OutLink>
            </Panel>
          </Grid>

          {media?.video && (
            <Section>
              <h2>Video Tour</h2>
              <VideoWrap>
                <video
                  src={media.video}
                  poster={media.poster}
                  controls
                  playsInline
                  preload="none"
                  onPlay={() => trackPixelCustom('PlayListingVideo', pixelParams)}
                />
              </VideoWrap>
            </Section>
          )}

          {listing.description && (
            <Section>
              <h2>About This Home</h2>
              <Description>{listing.description}</Description>
            </Section>
          )}

          {details.length > 0 && (
            <Section>
              <h2>Home Facts</h2>
              <DetailList>
                {details.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </DetailList>
            </Section>
          )}

          {listing.disclaimer && <Disclaimer>{stripHtml(listing.disclaimer)}</Disclaimer>}
        </Wrap>
        <PageMain>
          <EngagementCTA />
        </PageMain>
      </PageRoot>

      {lightbox && photos.length > 0 && (
        <Lightbox onClick={() => setLightbox(false)} role="dialog" aria-label="Photo gallery">
          <img src={photos[photoIndex]} alt="" onClick={(e) => e.stopPropagation()} />
          <LightboxButton type="button" style={{ top: '1rem', right: '1rem' }} aria-label="Close">
            ×
          </LightboxButton>
          {photos.length > 1 && (
            <>
              <LightboxButton type="button" style={{ left: '1rem', top: '50%' }} aria-label="Previous photo" onClick={step(-1)}>
                ‹
              </LightboxButton>
              <LightboxButton type="button" style={{ right: '1rem', top: '50%' }} aria-label="Next photo" onClick={step(1)}>
                ›
              </LightboxButton>
            </>
          )}
        </Lightbox>
      )}
    </>
  );
};

export default ListingDetail;
