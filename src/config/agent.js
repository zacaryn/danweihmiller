/** Public agent / brokerage contact — single source of truth for the marketing site */

export const AGENT_NAME = 'Dan Weihmiller';

export const AGENT_PHONE = '(719) 301-8257';
export const AGENT_PHONE_HREF = 'tel:7193018257';

export const AGENT_EMAIL = 'dan.weihmiller@cbrealty.com';
export const AGENT_EMAIL_HREF = `mailto:${AGENT_EMAIL}`;

export const AGENT_LICENSE = 'FA.001028985';

export const BROKERAGE_NAME = 'Coldwell Banker Realty';

export const OFFICE_STREET = '1755 Telstar Dr. Ste. 250';
export const OFFICE_CITY = 'Colorado Springs';
export const OFFICE_REGION = 'CO';
export const OFFICE_POSTAL_CODE = '80920';
/** Display / reference format (matches Coldwell Banker agent profile) */
export const OFFICE_ADDRESS = `${OFFICE_STREET}, ${OFFICE_CITY}, ${OFFICE_REGION} ${OFFICE_POSTAL_CODE}`;
export const OFFICE_PHONE = '(719) 550-2500';
export const OFFICE_PHONE_HREF = 'tel:7195502500';

export const CB_AGENT_PROFILE_URL =
  'https://www.coldwellbanker.com/co/colorado-springs/agents/dan-weihmiller/aid-P0020000000003JKKiLq49bv2GBg7AmOI4mLdNCn';

export const CB_SITE_ORIGIN = 'https://www.coldwellbanker.com';

export const SITE_URL = 'https://danweihmiller.com';

export const SEO_SITE_NAME = 'Dan Weihmiller · Coldwell Banker';
export const SEO_DEFAULT_TITLE = 'Dan Weihmiller | Colorado Springs Realtor · Coldwell Banker';
export const SEO_DEFAULT_DESCRIPTION =
  'Dan Weihmiller, Broker with Coldwell Banker Realty in Colorado Springs since 1985. Military relocation, VA loans, and Front Range real estate. Office: 1755 Telstar Dr. Ste. 250, Colorado Springs, CO 80920.';

/** Approximate geo for office (Telstar Dr) — schema / meta */
export const OFFICE_GEO = {
  latitude: 38.9478,
  longitude: -104.8172,
};

export const postalAddressSchema = {
  '@type': 'PostalAddress',
  streetAddress: OFFICE_STREET,
  addressLocality: OFFICE_CITY,
  addressRegion: OFFICE_REGION,
  postalCode: OFFICE_POSTAL_CODE,
  addressCountry: 'US',
};

export const brokerageOrganizationSchema = {
  '@type': 'Organization',
  name: BROKERAGE_NAME,
  url: CB_SITE_ORIGIN,
  telephone: OFFICE_PHONE,
  address: postalAddressSchema,
};
