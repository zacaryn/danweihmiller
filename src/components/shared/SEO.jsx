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
 * @param {string} [props.canonicalUrl] - Override canonical URL if needed
 */
const SEO = ({ 
  pageName,
  title,
  description,
  image = '/images/og-image.jpg',
  useProfileImage = false,
  isArticle = false,
  canonicalUrl
}) => {
  const location = useLocation();
  const siteName = "Dan Weihmiller";
  const siteUrl = "https://danweihmiller.com"; // Consistent domain without www
  const defaultDescription = "Trusted Colorado Springs Realtor with over 35 years of experience. Specializing in military relocation, VA loans, and helping buyers and sellers throughout Colorado Springs, Monument, and the Front Range.";
  const profileImage = "/images/headshot.jpg";
  
  const displayTitle = title || (isArticle ? 
    `${pageName} | Dan Weihmiller Real Estate Guide` : 
    `${siteName} | Colorado Springs Realtor`);
  const displayDescription = description || defaultDescription;
  const displayImage = useProfileImage ? profileImage : image;
  
  // Generate canonical URL - normalize by removing trailing slashes and ensuring consistent format
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '';
  const fullCanonicalUrl = canonicalUrl || `${siteUrl}${normalizedPath}`;

  // Update document title immediately on route change
  useEffect(() => {
    document.title = displayTitle;
  }, [displayTitle, location.pathname]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteUrl}/#realestateagent`,
    "name": siteName,
    "alternateName": "Dan Weihmiller Real Estate",
    "url": siteUrl,
    "image": `${siteUrl}${profileImage}`,
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
    "@id": `${siteUrl}/#website`,
    "name": siteName,
    "alternateName": "Dan Weihmiller Real Estate",
    "url": siteUrl,
    "description": defaultDescription,
    "publisher": {
      "@id": `${siteUrl}/#realestateagent`
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="application-name" content={siteName} />
      
      {/* Canonical URL - Critical for SEO */}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:image" content={`${siteUrl}${displayImage}`} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      <meta name="twitter:image" content={`${siteUrl}${displayImage}`} />

      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="US-CO" />
      <meta name="geo.placename" content="Colorado Springs" />
      <meta name="geo.position" content="38.8339;-104.8214" />
      <meta name="ICBM" content="38.8339, -104.8214" />

      {/* Image Alt Text for Accessibility */}
      <meta name="twitter:image:alt" content="Dan Weihmiller | Colorado Springs Realtor" />
      <meta property="og:image:alt" content="Dan Weihmiller | Colorado Springs Realtor" />

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
  isArticle: PropTypes.bool,
  canonicalUrl: PropTypes.string
};

export default SEO; 