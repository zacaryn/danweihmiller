import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const SEO = ({ 
  title, 
  description, 
  type = 'website',
  article = false,
  publishDate = null,
  pathname
}) => {
  const siteUrl = 'https://danweihmiller.com';
  const defaultTitle = 'Dan Weihmiller | Colorado Springs Real Estate Expert';
  const defaultDescription = 'Expert real estate services in Colorado Springs and the Front Range. Over 35 years of trusted experience helping buyers and sellers in Colorado Springs, Monument, and surrounding areas.';

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ''}`
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Dan Weihmiller",
    "url": siteUrl,
    "description": defaultDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Colorado Springs",
      "addressRegion": "CO",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": "Colorado Springs"
    }
  };

  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "datePublished": publishDate,
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "Dan Weihmiller",
      "url": `${siteUrl}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dan Weihmiller Real Estate",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": seo.url
    }
  } : null;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={`${siteUrl}/images/og-image.jpg`} />

      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={`${siteUrl}/images/og-image.jpg`} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Dan Weihmiller" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={`${siteUrl}/images/og-image.jpg`} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      {article && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
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
  pathname: PropTypes.string
};

export default SEO; 