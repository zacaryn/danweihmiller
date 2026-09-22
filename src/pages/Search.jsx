import { useEffect } from 'react';
import styled from '@emotion/styled';
import SEO from '../components/shared/SEO';
import { Link } from 'react-router-dom';

const SearchPage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.colors.white};
  overflow: hidden;
`;

const SearchToolbar = styled.header`
  flex-shrink: 0;
  padding: 0.55rem clamp(1rem, 3vw, 2rem);
  border-bottom: ${props => props.theme.borders.subtle};
  background: ${props => props.theme.colors.white};
  z-index: 2;
`;

const ToolbarRow = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.35rem 1.25rem;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.75rem;
`;

const Eyebrow = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(14, 31, 69, 0.55);
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${props => props.theme.fonts.heading};
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  line-height: 1.2;
`;

const ToolbarActions = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: rgba(14, 31, 69, 0.72);
  line-height: 1.4;

  a {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const SearchFrameWrap = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
  isolation: isolate;
  background: #e8e9ed;
`;

const SearchIframe = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  background: ${props => props.theme.colors.white};
`;

const Search = () => {
  useEffect(() => {
    document.documentElement.classList.add('search-embed');
    return () => {
      document.documentElement.classList.remove('search-embed');
    };
  }, []);

  return (
    <>
      <SEO
        pageName="Search"
        title="MLS Property Search | Dan Weihmiller · Coldwell Banker"
        description="Search Pikes Peak region MLS homes with Dan Weihmiller, Coldwell Banker Realty. Or view Dan's listings synced from his Coldwell Banker profile."
        ogTitle="Search Homes"
        image="/images/og-image.jpg"
      />

      <SearchPage>
        <SearchToolbar>
          <ToolbarRow>
            <TitleGroup>
              <Eyebrow>MLS search</Eyebrow>
              <Title>Colorado Springs homes</Title>
            </TitleGroup>
            <ToolbarActions>
              Dan&apos;s listings:{' '}
              <Link to="/listings">View synced MLS listings</Link>
            </ToolbarActions>
          </ToolbarRow>
        </SearchToolbar>
        <SearchFrameWrap>
          <SearchIframe
            src="https://ppmls.mlsmatrix.com/Matrix/public/IDX.aspx?idx=1a5c2ca"
            title="Property Search - PPAR MLS"
            allow="geolocation"
          />
        </SearchFrameWrap>
      </SearchPage>
    </>
  );
};

export default Search;
