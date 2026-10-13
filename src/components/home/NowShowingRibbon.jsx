import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FiArrowRight } from 'react-icons/fi';
import { useCbListings, hasVideo, listingPath, splitAddress } from '../../hooks/useCbListings';

const Ribbon = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  /* cap to the screen: long one-line text must truncate, not widen the hero grid */
  max-width: min(100%, calc(100vw - 2.5rem));
  min-width: 0;
  margin-bottom: 1.25rem;
  padding: 0.45rem 0.9rem 0.45rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }

  b {
    font-weight: 700;
  }

  span[data-text] {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex: 0 0 auto;
    width: 0.95rem;
    height: 0.95rem;
  }
`;

const Dot = styled.span`
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(74, 222, 128, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/** "Now showing: 6724 Harvey Lane · $439,900 → Take the video tour", rotating through active listings. */
const NowShowingRibbon = () => {
  const { active } = useCbListings();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (active.length < 2) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % active.length), 5000);
    return () => clearInterval(t);
  }, [active.length]);

  if (!active.length) return null;
  const listing = active[i % active.length];
  const { street } = splitAddress(listing.address);
  const cta = hasVideo(listing) ? 'Take the video tour' : 'See the home';

  return (
    <Ribbon to={listingPath(listing)} aria-live="polite">
      <Dot aria-hidden />
      <span data-text>
        Now showing: <b>{street}</b> · {listing.price} · {cta}
      </span>
      <FiArrowRight aria-hidden />
    </Ribbon>
  );
};

export default NowShowingRibbon;
