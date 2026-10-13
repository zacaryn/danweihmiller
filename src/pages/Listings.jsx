import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FiGrid, FiMap } from 'react-icons/fi';
import PropertyCard from '../components/listings/PropertyCard';
import ListingSpotlight from '../components/listings/ListingSpotlight';
import ListingsMap from '../components/listings/ListingsMap';
import { useCbListings, pickSpotlight } from '../hooks/useCbListings';
import { CB_AGENT_PROFILE_URL, AGENT_PHONE, AGENT_PHONE_HREF } from '../config/agent';
import SEO from '../components/shared/SEO';
import { PageRoot, PageHeader, PageMain, EngagementCTA } from '../components/layout/PageShell';

const NAVY = '#0E1F45';
const SOLD_PREVIEW = 6;

const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const Count = styled.h2`
  margin: 0 0 0.25rem;
  font-family: ${p => p.theme.fonts.heading};
  font-size: 1.6rem;
  font-weight: 600;
  color: ${NAVY};
`;

const SyncNote = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${p => p.theme.colors.darkGray};

  a {
    color: ${p => p.theme.colors.secondary};
    font-weight: 600;
    text-decoration: none;
  }
`;

const ViewToggle = styled.div`
  display: inline-flex;
  padding: 3px;
  border-radius: 8px;
  background: ${p => p.theme.colors.lightGray};
  border: 1px solid rgba(14, 31, 69, 0.08);
`;

const ViewButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border: 0;
  border-radius: 6px;
  background: ${p => (p.$active ? '#fff' : 'transparent')};
  color: ${p => (p.$active ? NAVY : p.theme.colors.darkGray)};
  box-shadow: ${p => (p.$active ? '0 1px 4px rgba(14,31,69,0.12)' : 'none')};
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;

  svg {
    width: 0.95rem;
    height: 0.95rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 680px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Section = styled.section`
  margin-top: 3rem;
`;

const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(14, 31, 69, 0.1);

  h2 {
    margin: 0;
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1.6rem;
    font-weight: 600;
    color: ${NAVY};
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: ${p => p.theme.colors.darkGray};
  }
`;

const TextButton = styled.button`
  display: block;
  margin: 1.25rem auto 0;
  padding: 0.6rem 1.1rem;
  border: 1px solid rgba(14, 31, 69, 0.22);
  border-radius: 6px;
  background: #fff;
  color: ${NAVY};
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${p => p.theme.colors.lightGray};
  }
`;

const Empty = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(14, 31, 69, 0.1);

  h2 {
    margin: 0 0 0.35rem;
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1.6rem;
    color: ${NAVY};
  }

  p {
    margin: 0;
    line-height: 1.55;
    color: ${p => p.theme.colors.darkGray};
  }

  @media (max-width: 680px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const EmptyActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  a {
    display: inline-flex;
    align-items: center;
    height: 2.6rem;
    padding: 0 1.1rem;
    border-radius: 6px;
    border: 1px solid ${NAVY};
    color: ${NAVY};
    font-size: 0.85rem;
    font-weight: 700;
    text-decoration: none;
  }

  a:first-of-type {
    background: ${NAVY};
    color: #fff;
  }
`;

const StateMessage = styled.p`
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.05rem;
  color: ${p => p.theme.colors.darkGray};

  a {
    color: ${p => p.theme.colors.secondary};
    font-weight: 600;
  }
`;

const Skeleton = styled.div`
  height: 380px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f1f2f5 25%, #e7e9ee 37%, #f1f2f5 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;

  @keyframes shimmer {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
`;

const Disclaimer = styled.p`
  margin: 3rem 0 0;
  font-size: 0.7rem;
  line-height: 1.55;
  color: ${p => p.theme.colors.darkGray};
  opacity: 0.85;
`;

const stripHtml = (html) => (html ? html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '');

const Listings = () => {
  const { data, active, sold, loading, error } = useCbListings();
  const [view, setView] = useState('grid');
  const [showAllSold, setShowAllSold] = useState(false);

  const spotlight = useMemo(() => pickSpotlight(active), [active]);
  const rest = useMemo(() => active.filter((l) => l !== spotlight), [active, spotlight]);
  const soldShown = showAllSold ? sold : sold.slice(0, SOLD_PREVIEW);
  const disclaimer = stripHtml(active[0]?.disclaimer || sold[0]?.disclaimer);
  const updated = data?.syncedAt ? new Date(data.syncedAt).toLocaleString() : null;

  return (
    <>
      <SEO
        pageName="Listings"
        title="Homes for Sale by Dan Weihmiller | Coldwell Banker · Colorado Springs"
        description="Homes for sale and recently sold by Dan Weihmiller, Broker with Coldwell Banker Realty in Colorado Springs. Photos, video tours and private showings."
        ogTitle="My Listings"
        image="/images/og-image.jpg"
      />
      <PageRoot>
        <PageHeader
          eyebrow="Coldwell Banker · MLS"
          title="My Listings"
          lead="Homes Dan is representing right now, with photos, video tours and one-tap showing requests. Synced automatically from his Coldwell Banker profile."
          primaryAction={{ to: '/contact', label: 'Request a Showing' }}
          secondaryAction={{ to: '/search', label: 'Search All MLS' }}
        />
        <PageMain>
          <Container>
            {loading && <Skeleton aria-label="Loading listings" />}

            {!loading && error && (
              <StateMessage>
                Listings couldn&apos;t be loaded right now.{' '}
                <a href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  View them on Coldwell Banker
                </a>{' '}
                or call Dan at <a href={AGENT_PHONE_HREF}>{AGENT_PHONE}</a>.
              </StateMessage>
            )}

            {!loading && !error && (
              <>
                {active.length > 0 ? (
                  <>
                    <Toolbar>
                      <div>
                        <Count>{active.length === 1 ? '1 home for sale' : `${active.length} homes for sale`}</Count>
                        <SyncNote>
                          Synced from{' '}
                          <a href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                            Dan&apos;s Coldwell Banker profile
                          </a>
                          {updated ? ` · Updated ${updated}` : ''}
                        </SyncNote>
                      </div>
                      <ViewToggle role="tablist" aria-label="View">
                        <ViewButton
                          type="button"
                          role="tab"
                          aria-selected={view === 'grid'}
                          $active={view === 'grid'}
                          onClick={() => setView('grid')}
                        >
                          <FiGrid aria-hidden /> Grid
                        </ViewButton>
                        <ViewButton
                          type="button"
                          role="tab"
                          aria-selected={view === 'map'}
                          $active={view === 'map'}
                          onClick={() => setView('map')}
                        >
                          <FiMap aria-hidden /> Map
                        </ViewButton>
                      </ViewToggle>
                    </Toolbar>

                    {view === 'map' ? (
                      <ListingsMap listings={active} />
                    ) : (
                      <>
                        {spotlight && <ListingSpotlight listing={spotlight} />}
                        {rest.length > 0 && (
                          <Section style={{ marginTop: '2.5rem' }}>
                            <SectionHead>
                              <h2>More homes for sale</h2>
                            </SectionHead>
                            <Grid>
                              {rest.map((l) => (
                                <PropertyCard key={l.id} listing={l} />
                              ))}
                            </Grid>
                          </Section>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <Empty>
                    <div>
                      <h2>No homes for sale right now</h2>
                      <p>
                        New listings appear here automatically. Thinking of selling? Dan can tell you what your home
                        would sell for in today&apos;s Colorado Springs market.
                      </p>
                    </div>
                    <EmptyActions>
                      <Link to="/contact?topic=Home%20value%20request">Get a home value</Link>
                      <Link to="/search">Search all homes</Link>
                    </EmptyActions>
                  </Empty>
                )}

                {sold.length > 0 && (
                  <Section>
                    <SectionHead>
                      <h2>Recently sold</h2>
                      <p>{sold.length === 1 ? '1 home' : `${sold.length} homes`} sold by Dan</p>
                    </SectionHead>
                    <Grid>
                      {soldShown.map((l) => (
                        <PropertyCard key={l.id} listing={l} />
                      ))}
                    </Grid>
                    {sold.length > SOLD_PREVIEW && (
                      <TextButton type="button" onClick={() => setShowAllSold((s) => !s)}>
                        {showAllSold ? 'Show fewer' : `Show all ${sold.length} sold homes`}
                      </TextButton>
                    )}
                  </Section>
                )}

                {disclaimer && <Disclaimer>{disclaimer}</Disclaimer>}
              </>
            )}
          </Container>
          {!loading && <EngagementCTA />}
        </PageMain>
      </PageRoot>
    </>
  );
};

export default Listings;
