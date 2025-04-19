import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

/**
 * SEO component for managing metadata, page titles, and Open Graph information
 * 
 * @param {Object} props
 * @param {string} props.pageName - The name of the current page (will be appended to site name)
 * @param {string} [props.title] - Optional complete title override (if not using pageName)
 * @param {string} [props.description] - Page description for SEO
 * @param {string} [props.image] - Image URL for social sharing
 * @param {boolean} [props.useProfileImage] - Whether to use Dan's profile image instead of default background
 * @param {React.ReactNode} [props.children] - Additional meta tags
 */
const SEO = ({ 
  pageName,
  title,
  description,
  image = '/images/og-image.jpg',
  useProfileImage = false,
  children
}) => {
  const defaultDescription = "Dan Weihmiller, Realtor® with eXp Realty - Expert real estate services in Colorado Springs. Over 35 years of trusted experience serving the Front Range.";
  const siteTitle = "Dan Weihmiller, Realtor® with eXp Realty | Colorado Springs";
  const profileImage = '/images/dan-weihmiller.jpg';
  
  // Determine which title to use
  const displayTitle = title || (pageName ? `${pageName} | ${siteTitle}` : siteTitle);
  
  // Determine which image to use
  const displayImage = useProfileImage ? profileImage : image;

  // Update document.title immediately (improves UX when navigating between pages)
  useEffect(() => {
    document.title = displayTitle;
  }, [displayTitle]);

  // Schema.org JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://www.danweihmiller.com/#realestateagent",
    "name": "Dan Weihmiller",
    "url": "https://www.danweihmiller.com/",
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
    "@id": "https://www.danweihmiller.com/#website",
    "name": "Dan Weihmiller",
    "url": "https://www.danweihmiller.com/",
    "publisher": {
      "@id": "https://www.danweihmiller.com/#realestateagent"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{displayTitle}</title>
      <meta name="title" content={displayTitle} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="application-name" content="Dan Weihmiller" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={displayImage} />
      <meta property="og:site_name" content="Dan Weihmiller" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={displayImage} />
      
      {/* Geographic Tags for Real Estate */}
      <meta name="geo.region" content="US-CO" />
      <meta name="geo.placename" content="Colorado Springs" />
      
      {/* Image Alt Text for Accessibility */}
      <meta name="twitter:image:alt" content="Dan Weihmiller, Realtor® with eXp Realty, Colorado Springs" />
      <meta property="og:image:alt" content="Dan Weihmiller, Realtor® with eXp Realty, Colorado Springs" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* Pass through any additional meta tags */}
      {children}
    </Helmet>
  );
};

export default SEO; 