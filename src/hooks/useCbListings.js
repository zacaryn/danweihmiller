import { useEffect, useState } from 'react';
import { fetchCbAgentListings } from '../services/cb-listings-service';
import { mediaForListing } from '../config/listing-media';

/**
 * Dan's listings, synced from his Coldwell Banker profile. One request per page load, shared by every component
 * that asks (homepage hero ribbon, featured section, listings page).
 */
let pending = null;
let cached = null;

function load() {
  if (cached) return Promise.resolve(cached);
  if (!pending) {
    pending = fetchCbAgentListings()
      .then((data) => {
        cached = data;
        return data;
      })
      .catch((err) => {
        pending = null; // allow a retry on the next mount
        throw err;
      });
  }
  return pending;
}

export function useCbListings() {
  const [data, setData] = useState(cached);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!cached);

  useEffect(() => {
    if (cached) return undefined;
    let alive = true;
    load()
      .then((d) => alive && setData(d))
      .catch((err) => {
        console.error('CB listings sync failed:', err);
        if (alive) setError(err);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const active = data?.active || [];
  const sold = data?.sold || [];
  return { data, active, sold, loading, error };
}

/** Street line and "City, ST ZIP" line from the CB address string. */
export function splitAddress(address = '') {
  const [street, ...rest] = address.split(',');
  return { street: street?.trim() || address, city: rest.join(',').trim() };
}

export const listingPath = (listing) => `/listings/${listing.slug || listing.mlsId}`;

export const hasVideo = (listing) => Boolean(mediaForListing(listing.mlsId)?.video);

/** Small tags shown on cards. Only what the data actually supports. */
export function listingBadges(listing) {
  const badges = [];
  if (hasVideo(listing)) badges.push({ key: 'video', label: 'Video tour' });
  const dom = Number(listing.daysOnMarket);
  if (listing.status === 'active' && Number.isFinite(dom) && dom <= 14) badges.push({ key: 'new', label: 'New' });
  return badges;
}

/** Prefer a listing with a video tour for the spotlight, otherwise the newest. */
export function pickSpotlight(active) {
  if (!active.length) return null;
  return active.find(hasVideo) || [...active].sort((a, b) => (a.daysOnMarket ?? 999) - (b.daysOnMarket ?? 999))[0];
}
