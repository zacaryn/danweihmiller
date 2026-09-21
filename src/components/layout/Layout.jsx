import styled from '@emotion/styled';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import FloatingCallButton from './FloatingCallButton';

const NAV_HEIGHT_DESKTOP = 72;
const NAV_HEIGHT_MOBILE = 68;

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  ${props =>
    props.$searchEmbed &&
    `
    height: 100dvh;
    min-height: 100dvh;
    max-height: 100dvh;
    overflow: hidden;
  `}
`;

const Main = styled.main`
  flex: 1;
  min-height: 0;
  padding: 0;
  background: ${props => props.theme.colors.background};

  ${props =>
    props.$searchEmbed &&
    `
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin-top: var(--site-nav-height, 72px);
    height: calc(100dvh - var(--site-nav-height, 72px));
    max-height: calc(100dvh - var(--site-nav-height, 72px));
  `}
`;

const Layout = () => {
  const { pathname } = useLocation();
  const isSearchRoute = pathname === '/search';

  useEffect(() => {
    const setNavHeight = () => {
      const h = window.matchMedia('(max-width: 768px)').matches
        ? NAV_HEIGHT_MOBILE
        : NAV_HEIGHT_DESKTOP;
      document.documentElement.style.setProperty('--site-nav-height', `${h}px`);
    };

    setNavHeight();
    window.addEventListener('resize', setNavHeight);
    return () => window.removeEventListener('resize', setNavHeight);
  }, []);

  return (
    <LayoutWrapper $searchEmbed={isSearchRoute}>
      <ScrollToTop />
      <Navbar />
      <Main $searchEmbed={isSearchRoute}>
        <Outlet />
      </Main>
      {!isSearchRoute && <Footer />}
      <FloatingCallButton />
    </LayoutWrapper>
  );
};

export default Layout;
