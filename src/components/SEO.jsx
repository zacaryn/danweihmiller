import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {
  AGENT_EMAIL,
  AGENT_NAME,
  AGENT_PHONE,
  BROKERAGE_NAME,
  CB_AGENT_PROFILE_URL,
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  SEO_SITE_NAME,
  SITE_URL,
  postalAddressSchema,
} from '../config/agent';

/** @deprecated Prefer `components/shared/SEO.jsx` */
const SEO = ({
  title,
  description,
  type = 'website',
  article = false,
  publishDate = null,
  pathname,
}) => {
  const seo = {
    title: title || SEO_DEFAULT_TITLE,
    description: description || SEO_DEFAULT_DESCRIPTION,
    url: `${SITE_URL}${pathname || ''}`,
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: AGENT_NAME,
    url: SITE_URL,
    description: SEO_DEFAULT_DESCRIPTION,
    telephone: AGENT_PHONE,
    email: AGENT_EMAIL,
    address: postalAddressSchema,
    worksFor: {
      '@type': 'Organization',
      name: BROKERAGE_NAME,
    },
    sameAs: [CB_AGENT_PROFILE_URL],
  };

  const articleSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        datePublished: publishDate,
        dateModified: new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: AGENT_NAME,
          url: `${SITE_URL}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: BROKERAGE_NAME,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': seo.url,
        },
      }
    : null;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={SEO_SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={`${SITE_URL}/images/og-image.jpg`} />
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      {article && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  article: PropTypes.bool,
  publishDate: PropTypes.string,
  pathname: PropTypes.string,
};

export default SEO;
