import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import { listingPath, splitAddress } from '../../hooks/useCbListings';

const MapBox = styled.div`
  height: min(68vh, 620px);
  min-height: 380px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(14, 31, 69, 0.12);
  z-index: 0;

  /* price pins */
  .dw-pin {
    background: none;
    border: 0;
  }

  .dw-pin span {
    display: inline-block;
    transform: translate(-50%, -100%);
    padding: 0.3rem 0.55rem;
    border-radius: 999px;
    background: #0e1f45;
    color: #fff;
    font: 700 12px/1 'Source Sans 3', system-ui, sans-serif;
    white-space: nowrap;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    border: 2px solid #fff;
  }

  .dw-pin[data-sold] span {
    background: #5b6475;
  }

  .dw-pop {
    width: 220px;
    font-family: 'Source Sans 3', system-ui, sans-serif;
    cursor: pointer;
  }

  .dw-pop img {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 6px;
    display: block;
  }

  .dw-pop strong {
    display: block;
    margin-top: 6px;
    font-size: 16px;
    color: #0e1f45;
  }

  .dw-pop p {
    margin: 2px 0 0 !important;
    font-size: 12px;
    color: #3e4b63;
  }

  .leaflet-popup-content {
    margin: 10px;
  }
`;

const shortPrice = (n, fallback) => {
  if (!n) return fallback;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(n >= 1e7 ? 0 : 2).replace(/\.?0+$/, '')}M`;
  return `$${Math.round(n / 1000)}K`;
};

/** Leaflet map with a price pin per listing. Clicking a popup opens the listing page. */
const ListingsMap = ({ listings }) => {
  const el = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let map;
    let cancelled = false;
    const located = listings.filter((l) => Number.isFinite(Number(l.lat)) && Number.isFinite(Number(l.lng)));

    import('leaflet').then(({ default: L }) => {
      if (cancelled || !el.current) return;
      map = L.map(el.current, { scrollWheelZoom: false, zoomControl: true });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const bounds = [];
      located.forEach((l) => {
        const lat = Number(l.lat);
        const lng = Number(l.lng);
        bounds.push([lat, lng]);
        const sold = l.status === 'sold';
        const icon = L.divIcon({
          className: 'dw-pin',
          html: `<span>${shortPrice(l.priceNumber, l.price)}</span>`,
          iconSize: [0, 0],
        });
        const marker = L.marker([lat, lng], { icon, title: l.address }).addTo(map);
        if (sold) marker.getElement()?.setAttribute('data-sold', '');
        const { street, city } = splitAddress(l.address);
        const pop = document.createElement('div');
        pop.className = 'dw-pop';
        pop.innerHTML = `${l.photo ? `<img src="${l.photo}" alt="">` : ''}<strong>${l.price}</strong>
          <p>${l.beds} bd · ${l.baths} ba · ${l.squareFeet} sq ft</p><p>${street}${city ? `, ${city}` : ''}</p>`;
        pop.addEventListener('click', () => navigate(listingPath(l)));
        marker.bindPopup(pop, { offset: [0, -28], closeButton: false });
      });

      if (bounds.length === 1) map.setView(bounds[0], 14);
      else if (bounds.length > 1) map.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
      else map.setView([38.8339, -104.8214], 11); // Colorado Springs
    });

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [listings, navigate]);

  return <MapBox ref={el} role="region" aria-label="Map of listings" />;
};

ListingsMap.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListingsMap;
