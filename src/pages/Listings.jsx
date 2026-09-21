import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import BrokerageListingCard from '../components/listings/BrokerageListingCard';
import { fetchCbAgentListings } from '../services/cb-listings-service';
import { CB_AGENT_PROFILE_URL } from '../config/agent';
import SEO from '../components/shared/SEO';
import {
  PageRoot,
  PageHeader,
  PageMain,
  EngagementCTA,
} from '../components/layout/PageShell';

const ListingsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

const ResultsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: 0 ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    padding: 0;
    flex-direction: column;
    align-items: stretch;
  }
`;

const ResultsHeading = styled.div``;

const ResultsCount = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.35rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.35rem;
`;

const SyncNote = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: ${props => props.theme.colors.darkGray};
  line-height: 1.5;
`;

const ProfileLink = styled.a`
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const InlineLink = styled(Link)`
  font-weight: 600;
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FilterButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    background: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.lightGray};
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const ListingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  padding: 0 ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;

const StateMessage = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.darkGray};

  &[data-variant='error'] {
    color: ${props => props.theme.colors.primary};
  }
`;

const MlsDisclaimer = styled.p`
  margin: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md} 0;
  font-size: 0.72rem;
  line-height: 1.55;
  color: ${props => props.theme.colors.darkGray};
  opacity: 0.85;
`;

const stripDisclaimerHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
};

function formatResultsLabel(filter, count) {
  if (count === 0) {
    if (filter === 'sold') return 'No sold listings';
    if (filter === 'all') return 'No listings';
    return 'No active listings';
  }
  if (filter === 'sold') {
    return count === 1 ? '1 Sold listing' : `${count} Sold listings`;
  }
  if (filter === 'all') {
    return count === 1 ? '1 Listing' : `${count} Listings`;
  }
  return count === 1 ? '1 Home for Sale' : `${count} Homes for Sale`;
}

const Listings = () => {
  const [cbData, setCbData] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('active');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const data = await fetchCbAgentListings();
        if (!cancelled) setCbData(data);
      } catch (err) {
        console.error('CB listings sync failed:', err);
        if (!cancelled) setLoadError('Listings could not be loaded right now.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const listings = useMemo(() => {
    if (!cbData) return [];
    if (filter === 'sold') return cbData.sold || [];
    if (filter === 'all') return [...(cbData.active || []), ...(cbData.sold || [])];
    return cbData.active || [];
  }, [cbData, filter]);

  const mlsDisclaimer = stripDisclaimerHtml(
    cbData?.active?.[0]?.disclaimer || cbData?.sold?.[0]?.disclaimer
  );

  const syncedLabel = cbData?.syncedAt
    ? `Updated ${new Date(cbData.syncedAt).toLocaleString()}`
    : null;

  return (
    <>
      <SEO
        pageName="Listings"
        title="Dan Weihmiller Listings | Coldwell Banker · Colorado Springs"
        description="Current MLS listings for Dan Weihmiller, Broker with Coldwell Banker Realty. Synced from his official Colorado Springs agent profile."
        image="/images/og-image.jpg"
      />
      <PageRoot>
        <PageHeader
          eyebrow="Coldwell Banker · MLS"
          title="My Listings"
          lead="Properties Dan represents are pulled automatically from his Coldwell Banker profile—always current, with full details and photos on Coldwell Banker."
          primaryAction={{ to: '/contact', label: 'Request a Showing' }}
          secondaryAction={{ to: '/search', label: 'Search All MLS' }}
        />
        <PageMain>
          <ListingsContainer>
            {isLoading && (
              <StateMessage>Loading listings…</StateMessage>
            )}

            {!isLoading && loadError && (
              <StateMessage data-variant="error">
                {loadError}{' '}
                <ProfileLink href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  View on Coldwell Banker
                </ProfileLink>
              </StateMessage>
            )}

            {!isLoading && !loadError && (
              <>
                <ResultsBar>
                  <ResultsHeading>
                    <ResultsCount>{formatResultsLabel(filter, listings.length)}</ResultsCount>
                    <SyncNote>
                      Synced from{' '}
                      <ProfileLink href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                        Dan&apos;s Coldwell Banker profile
                      </ProfileLink>
                      {syncedLabel ? ` · ${syncedLabel}` : ''}
                    </SyncNote>
                  </ResultsHeading>
                  <FilterBar>
                    <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>
                      Active
                    </FilterButton>
                    <FilterButton active={filter === 'sold'} onClick={() => setFilter('sold')}>
                      Sold
                    </FilterButton>
                    <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                      All
                    </FilterButton>
                  </FilterBar>
                </ResultsBar>

                {listings.length === 0 ? (
                  <StateMessage>
                    Nothing in this category at the moment.{' '}
                    <ProfileLink href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                      Check Coldwell Banker
                    </ProfileLink>{' '}
                    or <InlineLink to="/contact">contact Dan</InlineLink> for off-market opportunities.
                  </StateMessage>
                ) : (
                  <ListingsGrid>
                    {listings.map((listing) => (
                      <BrokerageListingCard key={listing.id} listing={listing} />
                    ))}
                  </ListingsGrid>
                )}

                {mlsDisclaimer && <MlsDisclaimer>{mlsDisclaimer}</MlsDisclaimer>}
              </>
            )}
          </ListingsContainer>
          {!isLoading && <EngagementCTA />}
        </PageMain>
      </PageRoot>
    </>
  );
};

export default Listings;
