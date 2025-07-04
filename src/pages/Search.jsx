import { useEffect } from 'react';
import styled from '@emotion/styled';
import SEO from '../components/shared/SEO';

const SearchContainer = styled.div`
  position: fixed;
  top: 68px; // Perfect flush fit for desktop
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: calc(100vh - 68px);
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #ffffff;
  z-index: 1;
  
  @media (max-width: 1024px) {
    top: 70px;
    height: calc(100vh - 70px);
  }
  
  @media (max-width: 768px) {
    top: 75px; // Adjust for mobile navbar height
    height: calc(100vh - 75px);
  }
  
  @media (max-width: 480px) {
    top: 70px; // Even smaller for very small screens
    height: calc(100vh - 70px);
  }
`;

const SearchIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  display: block;
  background: transparent;
  margin: 0;
  padding: 0;
  
  /* Prevent iframe from causing parent scroll */
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  
  /* Ensure full coverage */
  min-width: 100%;
  min-height: 100%;
`;

const Search = () => {
  // Lock scroll position and ensure proper layout
  useEffect(() => {
    // Store original styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyMargin = document.body.style.margin;
    const originalBodyPadding = document.body.style.padding;
    
    // Set body styles for full-screen iframe
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    return () => {
      // Restore original styles when component unmounts
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.margin = originalBodyMargin;
      document.body.style.padding = originalBodyPadding;
    };
  }, []);

  return (
    <>
      <SEO 
        pageName="Search" 
        title="Dan Weihmiller | Property Search - Colorado Springs Real Estate"
        description="Search for homes and properties in Colorado Springs with Dan Weihmiller. Find your perfect home with our comprehensive property search tool."
        image="/images/og-image.jpg"
      />
      
      <SearchContainer>
        <SearchIframe 
          src="https://ppmls.mlsmatrix.com/Matrix/public/IDX.aspx?idx=1a5c2ca"
          title="Property Search - PPAR MLS"
          allowtransparency="true"
          frameBorder="0"
          marginWidth="0"
          marginHeight="0"
        />
      </SearchContainer>
    </>
  );
};

export default Search; 