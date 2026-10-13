import styled from '@emotion/styled';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FiPhone, FiMessageSquare, FiMail, FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi';
import ContactForm from '../components/contact/ContactForm';
import SEO from '../components/shared/SEO';
import { PageRoot, PageHeader, PageMain } from '../components/layout/PageShell';
import { button } from '../styles/buttons';
import { trackPixel } from '../lib/meta-pixel';
import {
  AGENT_EMAIL,
  AGENT_EMAIL_HREF,
  AGENT_PHONE,
  AGENT_PHONE_HREF,
  BROKERAGE_NAME,
  OFFICE_ADDRESS,
  OFFICE_PHONE,
  OFFICE_PHONE_HREF,
  CB_AGENT_PROFILE_URL,
} from '../config/agent';

const NAVY = '#0E1F45';
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_ADDRESS)}`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(300px, 1fr);
  gap: clamp(1.25rem, 3vw, 2rem);
  align-items: start;
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Card = styled.section`
  background: #fff;
  border: 1px solid rgba(14, 31, 69, 0.1);
  border-radius: ${p => p.theme.borderRadius.large};
  padding: clamp(1.25rem, 3vw, 2rem);
  box-shadow: ${p => p.theme.shadows.medium};

  @media (max-width: 480px) {
    padding: 1.15rem;
  }
`;

const CardTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: ${p => p.theme.fonts.heading};
  font-size: clamp(1.6rem, 3vw, 1.9rem);
  font-weight: 600;
  color: ${NAVY};
`;

const Side = styled.aside`
  position: sticky;
  top: calc(var(--site-nav-height, 72px) + 1.25rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 900px) {
    position: static;
  }
`;

const Agent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.1rem;

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 18%;
    border: 2px solid #fff;
    box-shadow: 0 0 0 1px rgba(14, 31, 69, 0.15);
  }

  strong {
    display: block;
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1.4rem;
    font-weight: 600;
    color: ${NAVY};
    line-height: 1.15;
  }

  span {
    font-size: 0.85rem;
    color: ${p => p.theme.colors.darkGray};
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;

  a:first-of-type {
    grid-column: 1 / -1;
  }
`;

const CallBtn = styled.a`
  ${button('primary', 'lg')}
  width: 100%;
`;

const OutlineBtn = styled.a`
  ${button('outline')}
  width: 100%;
`;

const InfoList = styled.ul`
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 1.1rem 0 0;
  border-top: 1px solid rgba(14, 31, 69, 0.1);
  display: grid;
  gap: 0.9rem;

  li {
    display: grid;
    grid-template-columns: 1.25rem minmax(0, 1fr);
    gap: 0.7rem;
    font-size: 0.92rem;
    line-height: 1.5;
    color: ${p => p.theme.colors.text};
  }

  svg {
    width: 1.05rem;
    height: 1.05rem;
    margin-top: 0.15rem;
    color: ${p => p.theme.colors.secondary};
  }

  b {
    display: block;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.darkGray};
  }

  a {
    color: ${p => p.theme.colors.secondary};
    font-weight: 600;
    text-decoration: none;
    overflow-wrap: anywhere;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  p {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${NAVY};
  }

  div {
    display: flex;
    gap: 0.45rem;
  }

  a {
    display: grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background: ${NAVY};
    color: #fff;
    transition: background 0.15s ease, transform 0.15s ease;
  }

  a:hover {
    background: #1b3366;
    transform: translateY(-2px);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const SmallCard = styled(Card)`
  padding: 1rem 1.25rem;
  box-shadow: ${p => p.theme.shadows.small};
`;

const Contact = () => {
  const track = (method) => () => trackPixel('Contact', { method, content_name: 'Contact page' });

  return (
    <>
      <SEO
        pageName="Contact"
        title="Contact Dan Weihmiller | Coldwell Banker · Colorado Springs"
        description="Contact Dan Weihmiller, Broker with Coldwell Banker Realty. Office: 1755 Telstar Dr. Ste. 250, Colorado Springs, CO 80920. Call (719) 301-8257 for buying, selling, or military relocation."
        ogTitle="Get in Touch"
      />
      <PageRoot>
        <PageHeader
          eyebrow="Contact · Colorado Springs"
          title="Let's talk about your move"
          lead="Buying, selling or relocating? Dan replies personally, usually within one business day."
        />
        <PageMain>
          <Layout>
            <Card aria-labelledby="contact-form-title">
              <CardTitle id="contact-form-title">Send Dan a message</CardTitle>
              <ContactForm />
            </Card>

            <Side>
              <Card>
                <Agent>
                  <img src="/images/DWHeadshot.png" alt="Dan Weihmiller" />
                  <div>
                    <strong>Dan Weihmiller</strong>
                    <span>Broker, {BROKERAGE_NAME}</span>
                  </div>
                </Agent>
                <QuickActions>
                  <CallBtn href={AGENT_PHONE_HREF} onClick={track('call')}>
                    <FiPhone aria-hidden /> Call {AGENT_PHONE}
                  </CallBtn>
                  <OutlineBtn href="sms:7193018257" onClick={track('text')}>
                    <FiMessageSquare aria-hidden /> Text
                  </OutlineBtn>
                  <OutlineBtn href={AGENT_EMAIL_HREF} onClick={track('email')}>
                    <FiMail aria-hidden /> Email
                  </OutlineBtn>
                </QuickActions>

                <InfoList>
                  <li>
                    <FiMapPin aria-hidden />
                    <span>
                      <b>Office</b>
                      {BROKERAGE_NAME}
                      <br />
                      {OFFICE_ADDRESS}
                      <br />
                      <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                        Get directions
                      </a>{' '}
                      · <a href={OFFICE_PHONE_HREF}>{OFFICE_PHONE}</a>
                    </span>
                  </li>
                  <li>
                    <FiClock aria-hidden />
                    <span>
                      <b>Hours</b>
                      Monday to Saturday, 9 AM to 6 PM. Urgent? Call or text anytime.
                    </span>
                  </li>
                  <li>
                    <FiMail aria-hidden />
                    <span>
                      <b>Email</b>
                      <a href={AGENT_EMAIL_HREF}>{AGENT_EMAIL}</a>
                    </span>
                  </li>
                  <li>
                    <FiExternalLink aria-hidden />
                    <span>
                      <a href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                        Dan&apos;s Coldwell Banker profile
                      </a>
                    </span>
                  </li>
                </InfoList>
              </Card>

              <SmallCard>
                <Socials>
                  <p>Follow Dan</p>
                  <div>
                    <a href="https://www.facebook.com/danweihmillerrealtor" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                      <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com/danweihmiller/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </a>
                    <a href="https://www.tiktok.com/@danielweihmiller" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                      <FaTiktok />
                    </a>
                    <a href="https://www.linkedin.com/in/danweihmiller/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn />
                    </a>
                  </div>
                </Socials>
              </SmallCard>
            </Side>
          </Layout>
        </PageMain>
      </PageRoot>
    </>
  );
};

export default Contact;
