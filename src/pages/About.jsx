import SEO from '../components/shared/SEO';
import {
  PageRoot,
  PageHeader,
  PageMain,
  PagePanel,
  Prose,
  EngagementCTA,
  PageCTAButton,
} from '../components/layout/PageShell';
import styled from '@emotion/styled';

const InlineActions = styled.div`
  margin-top: 1.5rem;
`;

const About = () => {
  return (
    <>
      <SEO
        pageName="About Dan Weihmiller"
        title="About Dan Weihmiller | Colorado Springs Realtor"
        description="Meet Dan Weihmiller, your trusted Colorado Springs Realtor with Coldwell Banker since 1985. Specializing in military relocation, VA loans, and Front Range real estate."
        ogTitle="About Dan"
      />

      <PageRoot>
        <PageHeader
          eyebrow="About · Coldwell Banker since 1985"
          title="Dan Weihmiller"
          lead="Colorado Springs Realtor and Military Relocation Professional helping buyers and sellers across the Front Range for more than 40 years."
          primaryAction={{ to: '/contact', label: 'Get in Touch' }}
          secondaryAction={{ to: '/search', label: 'Search Homes' }}
        />
        <PageMain>
          <PagePanel $narrow>
            <Prose>
              <p>
                Dan Weihmiller is your trusted Colorado Springs Realtor with over 40 years of experience
                serving military families and residents throughout the Front Range. Affiliated with Coldwell
                Banker since 1985, Dan has established himself as Colorado Springs&apos; leading Military
                Relocation Professional (MRP), specializing in VA loans, military PCS moves, and expert
                guidance for Fort Carson, Peterson AFB, and Schriever AFB personnel.
              </p>
              <p>
                As a certified Military Relocation Professional, Dan understands the unique challenges of
                military moves and the importance of finding the right home quickly and efficiently. His
                expertise with VA loans and military benefits has helped hundreds of service members achieve
                homeownership throughout Colorado Springs, Monument, and surrounding communities.
              </p>
              <p>
                Dan&apos;s knowledge of Colorado Springs neighborhoods — from the Powers corridor to Fountain
                and beyond — helps match families with the right location based on base proximity, schools,
                and budget. Whether you are buying, selling, or relocating, Dan provides clear guidance
                backed by decades of local market experience.
              </p>
            </Prose>
            <InlineActions>
              <PageCTAButton to="/contact">Schedule a Conversation</PageCTAButton>
            </InlineActions>
          </PagePanel>
          <EngagementCTA />
        </PageMain>
      </PageRoot>
    </>
  );
};

export default About;
