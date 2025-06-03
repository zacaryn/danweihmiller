import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO component for managing metadata, page titles, and Open Graph information
 * 
 * @param {Object} props
 * @param {string} props.pageName - The name of the current page (will be appended to site name)
 * @param {string} [props.title] - Optional complete title override (if not using pageName)
 * @param {string} [props.description] - Page description for SEO
 * @param {string} [props.image] - Image URL for social sharing
 * @param {boolean} [props.useProfileImage] - Whether to use Dan's profile image instead of default background
 * @param {boolean} [props.isArticle] - Whether the page is an article
 */
const SEO = ({ 
  pageName,
  title,
  description,
  image = '/images/og-image.jpg',
  useProfileImage = false,
  isArticle = false
}) => {
  const location = useLocation();
  const siteName = "Dan Weihmiller";
  const defaultDescription = "Expert real estate services in Colorado Springs and the Front Range. Over 35 years of trusted experience helping buyers and sellers in Colorado Springs, Monument, and surrounding areas.";
  const profileImage = "/images/headshot.jpg";
  
  const displayTitle = title || (isArticle ? 
    `${pageName} | Dan Weihmiller Real Estate Guide` : 
    `${siteName} | Colorado Springs Real Estate Expert`);
  const displayDescription = description || defaultDescription;
  const displayImage = useProfileImage ? profileImage : image;

  // Update document title immediately on route change
  useEffect(() => {
    document.title = displayTitle;
  }, [displayTitle, location.pathname]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://danweihmiller.com/#realestateagent",
    "name": siteName,
    "alternateName": "Dan Weihmiller Real Estate",
    "url": "https://danweihmiller.com",
    "image": profileImage,
    "description": defaultDescription,
    "telephone": "(719) 301-8257",
    "email": "buildingincolorado22@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Colorado Springs",
      "addressRegion": "CO",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": "Colorado Springs"
    },
    "priceRange": "$$",
    "sameAs": [
      "https://www.facebook.com/danweihmiller",
      "https://www.linkedin.com/in/danweihmiller",
      "https://www.instagram.com/danweihmiller"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://danweihmiller.com/#website",
    "name": siteName,
    "alternateName": "Dan Weihmiller Real Estate",
    "url": "https://danweihmiller.com",
    "description": defaultDescription,
    "publisher": {
      "@id": "https://danweihmiller.com/#realestateagent"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="application-name" content={siteName} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:image" content={displayImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      <meta name="twitter:image" content={displayImage} />

      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="US-CO" />
      <meta name="geo.placename" content="Colorado Springs" />
      <meta name="geo.position" content="38.8339;-104.8214" />
      <meta name="ICBM" content="38.8339, -104.8214" />

      {/* Image Alt Text for Accessibility */}
      <meta name="twitter:image:alt" content="Dan Weihmiller | Colorado Springs Real Estate Expert" />
      <meta property="og:image:alt" content="Dan Weihmiller | Colorado Springs Real Estate Expert" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

SEO.propTypes = {
  pageName: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  useProfileImage: PropTypes.bool,
  isArticle: PropTypes.bool
};

export default SEO; 