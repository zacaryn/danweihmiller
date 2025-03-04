import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout; 