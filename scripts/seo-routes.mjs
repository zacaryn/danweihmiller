/** Crawler-facing meta for static HTML shells (mirrors src/pages SEO props). */

export const SITE_URL = 'https://danweihmiller.com';
export const SEO_SITE_NAME = 'Dan Weihmiller · Coldwell Banker';
export const SEO_DEFAULT_TITLE =
  'Dan Weihmiller | Colorado Springs Realtor · Coldwell Banker';
export const SEO_DEFAULT_DESCRIPTION =
  'Dan Weihmiller, Broker with Coldwell Banker Realty in Colorado Springs since 1985. Military relocation, VA loans, and Front Range real estate. Office: 1755 Telstar Dr. Ste. 250, Colorado Springs, CO 80920.';

export function buildOgImageUrl({ title, description, eyebrow }) {
  const params = new URLSearchParams();
  params.set('title', (title || 'Dan Weihmiller').slice(0, 100));
  if (description) params.set('description', description.slice(0, 180));
  if (eyebrow) params.set('eyebrow', eyebrow.slice(0, 60));
  return `${SITE_URL}/api/og?${params.toString()}`;
}

function route(path, meta) {
  const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const ogTitle = meta.ogTitle || meta.title.split('|')[0].trim();
  const ogDescription = meta.ogDescription || meta.description;
  const ogEyebrow = meta.ogEyebrow || meta.eyebrow || 'Dan Weihmiller · Colorado Springs';
  const ogImage = buildOgImageUrl({
    title: ogTitle,
    description: ogDescription,
    eyebrow: ogEyebrow,
  });
  return {
    path,
    ...meta,
    canonical,
    ogTitle,
    ogDescription,
    ogEyebrow,
    ogImage,
    twitterDescription: meta.twitterDescription || ogDescription,
  };
}

/** @type {ReturnType<typeof route>[]} */
export const SEO_ROUTES = [
  route('/', {
    title: SEO_DEFAULT_TITLE,
    description: SEO_DEFAULT_DESCRIPTION,
    ogTitle: 'Colorado Springs Realtor',
    ogDescription:
      'Broker with Coldwell Banker since 1985 — military relocation, VA loans, and Front Range real estate.',
    ogEyebrow: 'Coldwell Banker · Since 1985',
  }),
  route('/about', {
    title: 'About Dan Weihmiller | Colorado Springs Realtor',
    description:
      'Meet Dan Weihmiller, your trusted Colorado Springs Realtor with Coldwell Banker since 1985. Specializing in military relocation, VA loans, and Front Range real estate.',
    ogTitle: 'About Dan',
    eyebrow: 'About',
  }),
  route('/contact', {
    title: 'Contact Dan Weihmiller | Coldwell Banker · Colorado Springs',
    description:
      'Contact Dan Weihmiller, Broker with Coldwell Banker Realty. Office: 1755 Telstar Dr. Ste. 250, Colorado Springs, CO 80920. Call (719) 301-8257 for buying, selling, or military relocation.',
    ogTitle: 'Get in Touch',
    eyebrow: 'Contact',
  }),
  route('/listings', {
    title: 'Dan Weihmiller Listings | Coldwell Banker · Colorado Springs',
    description:
      'Current MLS listings for Dan Weihmiller, Broker with Coldwell Banker Realty. Synced from his official Colorado Springs agent profile.',
    ogTitle: 'My Listings',
    eyebrow: 'MLS Listings',
  }),
  route('/search', {
    title: 'MLS Property Search | Dan Weihmiller · Coldwell Banker',
    description:
      "Search Pikes Peak region MLS homes with Dan Weihmiller, Coldwell Banker Realty. Or view Dan's listings synced from his Coldwell Banker profile.",
    ogTitle: 'Search Homes',
    eyebrow: 'Property Search',
  }),
  route('/resources', {
    title: 'Colorado Springs Real Estate Guide | Expert Resources & Tips',
    description:
      'Comprehensive Colorado Springs real estate guides from your trusted local Realtor. Expert resources on VA loans, military relocation, first-time buying, and Colorado Springs neighborhoods.',
    ogTitle: 'Resources & Guides',
    ogEyebrow: 'Colorado Springs Real Estate',
    eyebrow: 'Resources',
  }),
  route('/resources/military-relocation', {
    title:
      'Military Relocation Colorado Springs: Your Complete PCS Guide | Dan Weihmiller · Coldwell Banker',
    description:
      'Expert Colorado Springs Realtor specializing in military relocation and PCS moves. Fort Carson, Peterson AFB, and Schriever AFB housing specialist. Free military relocation consultation.',
    ogTitle: 'Military Relocation Colorado Springs: Your Complete PCS Guide',
    eyebrow: 'Real Estate Guide',
  }),
  route('/resources/va-loans', {
    title:
      'VA Loans Colorado Springs: Complete Military Home Buying Guide | Dan Weihmiller · Coldwell Banker',
    description:
      'Expert Colorado Springs Realtor specializing in VA loans for military families. Zero down payment home buying for Fort Carson, Peterson AFB, and Schriever AFB personnel. Free VA loan consultation.',
    ogTitle: 'VA Loans Colorado Springs: Complete Military Home Buying Guide',
    eyebrow: 'Real Estate Guide',
  }),
  route('/resources/listing-agent', {
    title:
      'Why Work with a Listing Agent in Colorado Springs? | Dan Weihmiller · Coldwell Banker',
    description:
      "Learn how a professional listing agent can maximize your home's value and streamline the selling process in Colorado Springs' competitive market.",
    ogTitle: 'Why Work with a Listing Agent in Colorado Springs?',
    eyebrow: 'Real Estate Guide',
  }),
  route('/resources/custom-home-building', {
    title: 'Building a Custom Home in Colorado Springs | Dan Weihmiller · Coldwell Banker',
    description:
      'Expert guide to the custom home building process in Colorado Springs - from land selection to material choices and construction methods.',
    ogTitle: 'Building a Custom Home in Colorado Springs',
    eyebrow: 'Real Estate Guide',
  }),
  route('/resources/new-construction', {
    title: 'New Construction Homes in Colorado Springs | Dan Weihmiller · Coldwell Banker',
    description:
      'Your comprehensive guide to buying new construction homes in Colorado Springs - from choosing a builder to customizing your dream home.',
    ogTitle: 'New Construction Homes in Colorado Springs',
    eyebrow: 'Real Estate Guide',
  }),
  route('/resources/first-time-home-buyers', {
    title:
      'First Time Home Buyer Colorado Springs: Complete Guide 2025 | Dan Weihmiller · Coldwell Banker',
    description:
      'Expert Colorado Springs Realtor guide for first-time home buyers. Learn about FHA loans, down payment assistance, and the best Colorado Springs neighborhoods for first-time buyers. Free consultation.',
    ogTitle: 'First Time Home Buyer Colorado Springs: Complete Guide 2025',
    eyebrow: 'Real Estate Guide',
  }),
  route('/resources/land', {
    title:
      'Buying Land in Colorado Springs: Your Complete Guide | Dan Weihmiller · Coldwell Banker',
    description:
      'Everything you need to know about purchasing land in Colorado Springs - from evaluating properties to understanding zoning and development requirements.',
    ogTitle: 'Buying Land in Colorado Springs: Your Complete Guide',
    eyebrow: 'Real Estate Guide',
  }),
  route('/resources/single-family-home', {
    title: 'Single Family Home Buying Guide: Colorado Springs | Dan Weihmiller · Coldwell Banker',
    description:
      'Your comprehensive guide to buying a single-family home in Colorado Springs - from house hunting to closing on your perfect property.',
    ogTitle: 'Single Family Home Buying Guide: Colorado Springs',
    eyebrow: 'Real Estate Guide',
  }),
  route('/legal/privacy', {
    title: 'Privacy Policy | Dan Weihmiller',
    description:
      'Privacy policy for danweihmiller.com — how Dan Weihmiller collects, uses, and protects your information as a Coldwell Banker affiliated Colorado Springs Realtor.',
    ogTitle: 'Privacy Policy',
    eyebrow: 'Legal & Policies',
  }),
  route('/legal/terms', {
    title: 'Terms of Use | Dan Weihmiller',
    description:
      'Terms of use for danweihmiller.com, the real estate website of Dan Weihmiller, Colorado Springs Realtor with Coldwell Banker.',
    ogTitle: 'Terms of Use',
    eyebrow: 'Legal & Policies',
  }),
  route('/legal/fair-housing', {
    title: 'Fair Housing | Dan Weihmiller',
    description:
      'Fair Housing and Equal Opportunity statement for Dan Weihmiller, Colorado Springs Realtor with Coldwell Banker.',
    ogTitle: 'Fair Housing & Equal Opportunity',
    eyebrow: 'Legal & Policies',
  }),
  route('/legal/accessibility', {
    title: 'Accessibility | Dan Weihmiller',
    description: 'Accessibility statement for danweihmiller.com.',
    ogTitle: 'Accessibility Statement',
    eyebrow: 'Legal & Policies',
  }),
  route('/legal/mls-disclaimer', {
    title: 'MLS & IDX Disclaimer | Dan Weihmiller',
    description: 'MLS and IDX disclaimer for property listings displayed on danweihmiller.com.',
    ogTitle: 'MLS & IDX Disclaimer',
    eyebrow: 'Legal & Policies',
  }),
  route('/legal/brokerage-disclosure', {
    title: 'Brokerage Disclosure | Dan Weihmiller',
    description:
      'Brokerage affiliation and consumer disclosure for Dan Weihmiller, Coldwell Banker affiliated agent in Colorado Springs.',
    ogTitle: 'Brokerage Disclosure',
    eyebrow: 'Legal & Policies',
  }),
];
