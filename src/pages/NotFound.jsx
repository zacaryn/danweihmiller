import SEO from '../components/shared/SEO';
import { FaHome, FaSearch } from 'react-icons/fa';
import {
  PageRoot,
  PageHeader,
  PageMain,
  PagePanel,
  PageCTAButton,
  PageCTAActions,
} from '../components/layout/PageShell';
import styled from '@emotion/styled';

const ErrorCode = styled.p`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 4rem;
  line-height: 1;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem;
  font-weight: 600;
`;

const Message = styled.p`
  font-size: 1.05rem;
  line-height: 1.65;
  color: ${props => props.theme.colors.text};
  margin: 0 0 1.5rem;
`;

const NotFound = () => {
  return (
    <>
      <SEO
        pageName="Page Not Found"
        description="The page you're looking for doesn't exist. Browse Colorado Springs real estate listings or return to the homepage."
      />
      <PageRoot>
        <PageHeader solid eyebrow="404" title="Page not found" />
        <PageMain>
          <PagePanel $narrow>
            <ErrorCode>404</ErrorCode>
            <Message>
              The page you requested may have moved or no longer exists. Use the links below to
              continue browsing Colorado Springs real estate with Dan Weihmiller.
            </Message>
            <PageCTAActions>
              <PageCTAButton to="/">
                <FaHome aria-hidden /> Home
              </PageCTAButton>
              <PageCTAButton to="/search" className="ghost">
                <FaSearch aria-hidden /> Search
              </PageCTAButton>
              <PageCTAButton to="/contact" className="ghost">
                Contact
              </PageCTAButton>
            </PageCTAActions>
          </PagePanel>
        </PageMain>
      </PageRoot>
    </>
  );
};

export default NotFound;
