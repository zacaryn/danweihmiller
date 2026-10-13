export async function fetchCbAgentListings() {
  const response = await fetch('/api/cb-listings');
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Failed to load MLS listings');
  }
  return response.json();
}

export async function fetchCbListingDetail(idOrSlug) {
  const response = await fetch(`/api/cb-listings?id=${encodeURIComponent(idOrSlug)}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Failed to load listing');
  }
  return response.json();
}
