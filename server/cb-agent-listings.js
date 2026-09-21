const CB_AGENT_PROFILE_URL =
  'https://www.coldwellbanker.com/co/colorado-springs/agents/dan-weihmiller/aid-P0020000000003JKKiLq49bv2GBg7AmOI4mLdNCn';

const CACHE_TTL_MS = 10 * 60 * 1000;
let cache = { fetchedAt: 0, payload: null };

function mapListing(raw) {
  const photo = raw.photos?.[0]?.mediaUrl || null;
  const detailPath = raw.propertyDetailsRoutePath || '';
  return {
    id: raw.listingMasterId || raw.mlsId,
    mlsId: raw.mlsId,
    price: raw.price,
    priceNumber: raw.markerPrice,
    status: (raw.displayStatus || raw.standardStatus || 'ACTIVE').toLowerCase(),
    beds: raw.beds,
    baths: raw.baths,
    squareFeet: raw.squareFeet,
    propertyType: raw.propertyTypeValue,
    address: raw.propertyAddress,
    photo,
    photoCount: raw.photos?.length || 0,
    daysOnMarket: raw.daysOnMarket,
    officeName: raw.officeName,
    mlsLogo: raw.mlsLogo,
    detailUrl: detailPath ? `https://www.coldwellbanker.com${detailPath}` : CB_AGENT_PROFILE_URL,
    disclaimer: raw.disclaimerAttribution?.disclaimer || null,
  };
}

export async function fetchCbAgentListings() {
  if (cache.payload && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.payload;
  }

  const response = await fetch(CB_AGENT_PROFILE_URL, {
    headers: {
      'User-Agent': 'DanWeihmillerSite/1.0 (listings sync; +https://danweihmiller.com)',
      Accept: 'text/html',
    },
  });

  if (!response.ok) {
    throw new Error(`Coldwell Banker profile returned ${response.status}`);
  }

  const html = await response.text();
  const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) {
    throw new Error('Could not parse listing data from Coldwell Banker profile');
  }

  const nextData = JSON.parse(match[1]);
  const pageProps = nextData.props?.pageProps || {};
  const active = (pageProps.activeListings || []).map(mapListing);
  const sold = (pageProps.soldListings || []).map(mapListing);

  const payload = {
    source: CB_AGENT_PROFILE_URL,
    syncedAt: new Date().toISOString(),
    activeCount: pageProps.activeListingsCount ?? active.length,
    soldCount: pageProps.soldListingsCount ?? sold.length,
    active,
    sold,
    disclaimer: pageProps.disclaimer || null,
  };

  cache = { fetchedAt: Date.now(), payload };
  return payload;
}
