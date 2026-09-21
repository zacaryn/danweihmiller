import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AGENT_EMAIL,
  AGENT_LICENSE,
  AGENT_NAME,
  AGENT_PHONE,
  BROKERAGE_NAME,
  CB_AGENT_PROFILE_URL,
  CB_SITE_ORIGIN,
  OFFICE_CITY,
  OFFICE_GEO,
  OFFICE_PHONE,
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  SEO_SITE_NAME,
  SITE_URL,
  brokerageOrganizationSchema,
  postalAddressSchema,
} from '../../config/agent';

const SEO = ({
  pageName,
  title,
  description,
  image = '/images/og-image.jpg',
  useProfileImage = false,
  isArticle = false,
  canonicalUrl,
}) => {
  const location = useLocation();
  const profileImage = '/images/DWHeadshot.png';

  const displayTitle =
    title ||
    (isArticle
      ? `${pageName} | ${AGENT_NAME} · Coldwell Banker`
      : pageName && pageName !== 'Home'
        ? `${pageName} | ${AGENT_NAME} · Coldwell Banker`
        : SEO_DEFAULT_TITLE);
  const displayDescription = description || SEO_DEFAULT_DESCRIPTION;
  const displayImage = useProfileImage ? profileImage : image;

  const normalizedPath = location.pathname.replace(/\/+$/, '') || '';
  const fullCanonicalUrl = canonicalUrl || `${SITE_URL}${normalizedPath}`;

  useEffect(() => {
    document.title = displayTitle;
  }, [displayTitle, location.pathname]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#realestateagent`,
    name: AGENT_NAME,
    jobTitle: 'Broker',
    url: SITE_URL,
    image: `${SITE_URL}${profileImage}`,
    description: SEO_DEFAULT_DESCRIPTION,
    telephone: AGENT_PHONE,
    email: AGENT_EMAIL,
    identifier: {
      '@type': 'PropertyValue',
      name: 'Colorado Real Estate License',
      value: AGENT_LICENSE,
    },
    address: postalAddressSchema,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: OFFICE_GEO.latitude,
      longitude: OFFICE_GEO.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Colorado Springs' },
      { '@type': 'City', name: 'Monument' },
      { '@type': 'AdministrativeArea', name: 'El Paso County' },
    ],
    priceRange: '$$',
    worksFor: brokerageOrganizationSchema,
    memberOf: {
      '@type': 'Organization',
      name: BROKERAGE_NAME,
      url: CB_SITE_ORIGIN,
    },
    sameAs: [
      CB_AGENT_PROFILE_URL,
      'https://www.facebook.com/danweihmillerrealtor',
      'https://www.linkedin.com/in/danweihmiller/',
      'https://www.instagram.com/danweihmiller/',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SEO_SITE_NAME,
    alternateName: `${AGENT_NAME} Real Estate`,
    url: SITE_URL,
    description: SEO_DEFAULT_DESCRIPTION,
    publisher: {
      '@id': `${SITE_URL}/#realestateagent`,
    },
  };

  const officeSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateOffice',
    name: BROKERAGE_NAME,
    address: postalAddressSchema,
    telephone: OFFICE_PHONE,
    url: CB_AGENT_PROFILE_URL,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Coldwell Banker Real Estate LLC',
      url: CB_SITE_ORIGIN,
    },
  };

  return (
    <Helmet>
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="application-name" content={SEO_SITE_NAME} />
      <meta name="author" content={`${AGENT_NAME}, ${BROKERAGE_NAME}`} />

      <link rel="canonical" href={fullCanonicalUrl} />
      <link rel="me" href={CB_AGENT_PROFILE_URL} />

      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:image" content={`${SITE_URL}${displayImage}`} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={isArticle ? 'article' : 'website'} />
      <meta property="og:site_name" content={SEO_SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      <meta name="twitter:image" content={`${SITE_URL}${displayImage}`} />

      <meta name="geo.region" content="US-CO" />
      <meta name="geo.placename" content={OFFICE_CITY} />
      <meta
        name="geo.position"
        content={`${OFFICE_GEO.latitude};${OFFICE_GEO.longitude}`}
      />
      <meta name="ICBM" content={`${OFFICE_GEO.latitude}, ${OFFICE_GEO.longitude}`} />

      <meta name="twitter:image:alt" content={`${AGENT_NAME} | ${BROKERAGE_NAME} · Colorado Springs`} />
      <meta property="og:image:alt" content={`${AGENT_NAME} | ${BROKERAGE_NAME} · Colorado Springs`} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(officeSchema)}</script>
    </Helmet>
  );
};

SEO.propTypes = {
  pageName: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  useProfileImage: PropTypes.bool,
  isArticle: PropTypes.bool,
  canonicalUrl: PropTypes.string,
};

export default SEO;
