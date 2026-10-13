import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FiArrowRight } from 'react-icons/fi';
import PropertyCard from '../listings/PropertyCard';
import ListingSpotlight from '../listings/ListingSpotlight';
import { useCbListings, pickSpotlight } from '../../hooks/useCbListings';

const NAVY = '#0E1F45';

const Section = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 4.5rem) clamp(1.25rem, 4vw, 3rem) 0;
`;

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Eyebrow = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.secondary};
`;

const Title = styled.h2`
  margin: 0;
  font-family: ${p => p.theme.fonts.heading};
  font-size: clamp(1.9rem, 3.5vw, 2.5rem);
  font-weight: 600;
  color: ${NAVY};
`;

const AllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${NAVY};
  text-decoration: none;

  svg {
    width: 1rem;
    height: 1rem;
    transition: transform 0.15s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols || 3}, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

/**
 * Homepage listings showcase, fed live from the Coldwell Banker sync:
 * one active listing -> spotlight; 2-3 -> side-by-side cards; none -> recently sold; nothing at all -> hidden.
 */
const FeaturedListings = () => {
  const { active, sold, loading } = useCbListings();
  if (loading) return null;

  const forSale = active.length > 0;
  const list = forSale ? active : sold;
  if (!list.length) return null;

  const total = forSale ? active.length : sold.length;

  return (
    <Section id="featured-listings" aria-labelledby="featured-listings-title">
      <Head>
        <div>
          <Eyebrow>{forSale ? 'For sale now' : 'Recently sold'}</Eyebrow>
          <Title id="featured-listings-title">{forSale ? "Dan's Listings" : 'Recently Sold by Dan'}</Title>
        </div>
        <AllLink to="/listings">
          {forSale ? `See all ${total === 1 ? 'listings' : `${total} listings`}` : 'See all listings'}
          <FiArrowRight aria-hidden />
        </AllLink>
      </Head>

      {forSale && active.length === 1 ? (
        <ListingSpotlight listing={pickSpotlight(active)} eyebrow="Featured listing" />
      ) : (
        <Grid $cols={Math.min(list.length, 3)}>
          {list.slice(0, 3).map((l) => (
            <PropertyCard key={l.id} listing={l} />
          ))}
        </Grid>
      )}
    </Section>
  );
};

export default FeaturedListings;
