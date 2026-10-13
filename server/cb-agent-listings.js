const CB_AGENT_PROFILE_URL =
  'https://www.coldwellbanker.com/co/colorado-springs/agents/dan-weihmiller/aid-P0020000000003JKKiLq49bv2GBg7AmOI4mLdNCn';

const CACHE_TTL_MS = 10 * 60 * 1000;
let cache = { fetchedAt: 0, payload: null };

/** "/co/colorado-springs/6724-harvey-ln/lid-..." -> "6724-harvey-ln" (the address part of the CB URL) */
function slugFromRoute(detailPath, fallback) {
  const parts = (detailPath || '').split('/').filter(Boolean);
  const lidIndex = parts.findIndex((p) => p.startsWith('lid-'));
  const slug = lidIndex > 0 ? parts[lidIndex - 1] : null;
  return slug || String(fallback || '').toLowerCase();
}

function mapListing(raw) {
  const photo = raw.photos?.[0]?.mediaUrl || null;
  const detailPath = raw.propertyDetailsRoutePath || '';
  return {
    slug: slugFromRoute(detailPath, raw.mlsId),
    photos: (raw.photos || []).map((p) => p.mediaUrl).filter(Boolean),
    lat: raw.gis?.latitude ?? raw.gis?.lat ?? null,
    lng: raw.gis?.longitude ?? raw.gis?.lng ?? raw.gis?.lon ?? null,
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

const DETAIL_TTL_MS = 10 * 60 * 1000;
const detailCache = new Map();

/** One listing (matched by URL slug, MLS# or listing id) plus the extra facts from its Coldwell Banker page. */
export async function fetchCbListingDetail(idOrSlug) {
  const key = String(idOrSlug || '').toLowerCase();
  const cached = detailCache.get(key);
  if (cached && Date.now() - cached.fetchedAt < DETAIL_TTL_MS) {
    return cached.payload;
  }

  const all = await fetchCbAgentListings();
  const listing = [...all.active, ...all.sold].find(
    (l) => l.slug === key || String(l.mlsId).toLowerCase() === key || String(l.id).toLowerCase() === key
  );
  if (!listing) return null;

  let details = {};
  try {
    const response = await fetch(listing.detailUrl, {
      headers: {
        'User-Agent': 'DanWeihmillerSite/1.0 (listings sync; +https://danweihmiller.com)',
        Accept: 'text/html',
      },
    });
    if (response.ok) {
      const html = await response.text();
      const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
      if (match) {
        const pp = JSON.parse(match[1]).props?.pageProps || {};
        const raw = pp.rawPropertyDetails?.property || {};
        const about = pp.propertyDetails?.about || {};
        const lot = pp.propertyDetails?.lot || {};
        details = {
          description:
            pp.rawPropertyDetails?.propertyDescription?.[0]?.remark ||
            raw.listing?.remarks?.publicRemarks ||
            about.description ||
            null,
          yearBuilt: raw.structure?.yearBuilt || about.homeFacts?.yearBuilt || null,
          lotSizeSquareFeet: raw.characteristics?.lotSizeSquareFeet || null,
          lotSizeAcres: raw.characteristics?.lotSizeAcres || lot.lotSizeAcres || null,
          heating: raw.structure?.heating || null,
          cooling: raw.structure?.cooling || null,
        };
      }
    }
  } catch (err) {
    // The card data alone is enough to render the page; details are a bonus
    console.error('CB listing detail fetch failed:', err.message);
  }

  const payload = { listing: { ...listing, ...details }, syncedAt: all.syncedAt };
  detailCache.set(key, { fetchedAt: Date.now(), payload });
  return payload;
}
