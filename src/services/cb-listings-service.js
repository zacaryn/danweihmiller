export async function fetchCbAgentListings() {
  const response = await fetch('/api/cb-listings');
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Failed to load MLS listings');
  }
  return response.json();
}
