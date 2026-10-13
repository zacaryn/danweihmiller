import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { button } from '../styles/buttons';
import PropTypes from 'prop-types';
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiImage,
  FiMaximize2,
  FiMessageSquare,
  FiPhone,
  FiPlay,
  FiX,
} from 'react-icons/fi';
import SEO from '../components/shared/SEO';
import { PageRoot } from '../components/layout/PageShell';
import { fetchCbListingDetail } from '../services/cb-listings-service';
import { submitContactMessage } from '../services/contact-api';
import { mediaForListing } from '../config/listing-media';
import { AGENT_NAME, AGENT_PHONE, AGENT_PHONE_HREF, BROKERAGE_NAME, CB_AGENT_PROFILE_URL, SITE_URL } from '../config/agent';
import { trackPixel, trackPixelCustom } from '../lib/meta-pixel';

const SMS_HREF = 'sms:7193018257';
const NAVY = '#0E1F45';
const LINE = 'rgba(14, 31, 69, 0.12)';

/* ------------------------------------------------------------------ layout */

const Wrap = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: calc(var(--site-nav-height, 72px) + 1.25rem) 1.5rem 3rem;

  @media (max-width: 1023px) {
    padding: calc(var(--site-nav-height, 68px) + 0.75rem) 1rem 6.5rem; /* room for the sticky action bar */
  }
`;

const Crumb = styled.p`
  margin: 0 0 0.85rem;
  font-size: 0.8rem;
  color: ${p => p.theme.colors.darkGray};

  a {
    color: ${p => p.theme.colors.secondary};
    font-weight: 600;
    text-decoration: none;
  }
`;

/* Desktop: gallery + details on the left, inquiry card sticky on the right (visible above the fold).
   Mobile: gallery, then the card (price + form), then details. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  grid-template-areas:
    'gallery side'
    'details side';
  column-gap: 2rem;
  align-items: start;

  @media (max-width: 1023px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'gallery'
      'side'
      'details';
  }
`;

const GalleryArea = styled.div`
  grid-area: gallery;
  min-width: 0;
`;

const DetailsArea = styled.div`
  grid-area: details;
  min-width: 0;
`;

const SideArea = styled.div`
  grid-area: side;
  min-width: 0;
  align-self: stretch;

  @media (max-width: 1023px) {
    margin-top: 1rem;
  }
`;

/* ------------------------------------------------------------------ media viewer */

const Stage = styled.div`
  position: relative;
  aspect-ratio: 3 / 2;
  border-radius: 10px;
  overflow: hidden;
  background: #0b1225;
  user-select: none;

  @media (max-width: 640px) {
    margin: 0 -1rem;
    border-radius: 0;
  }
`;

const StageImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: zoom-in;
`;

const VideoBackdrop = styled.img`
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
  object-fit: cover;
  filter: blur(28px) brightness(0.55);
`;

const StageVideo = styled.video`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  aspect-ratio: 9 / 16;
  max-width: 100%;
  background: #000;
`;

const RoundButton = styled.button`
  position: absolute;
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: ${NAVY};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &:hover {
    background: #fff;
    transform: scale(1.06);
  }

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;

const PrevButton = styled(RoundButton)`
  left: 0.85rem;
  top: 50%;
  margin-top: -1.25rem;
`;

const NextButton = styled(RoundButton)`
  right: 0.85rem;
  top: 50%;
  margin-top: -1.25rem;
`;

const ExpandButton = styled(RoundButton)`
  right: 0.85rem;
  top: 0.85rem;
  width: 2.25rem;
  height: 2.25rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const Counter = styled.span`
  position: absolute;
  right: 0.85rem;
  bottom: 0.85rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(10, 16, 32, 0.7);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

const ModeTabs = styled.div`
  position: absolute;
  left: 0.85rem;
  top: 0.85rem;
  display: flex;
  padding: 3px;
  gap: 2px;
  border-radius: 999px;
  background: rgba(10, 16, 32, 0.62);
  backdrop-filter: blur(6px);
`;

const ModeTab = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border: 0;
  border-radius: 999px;
  background: ${p => (p.$active ? '#fff' : 'transparent')};
  color: ${p => (p.$active ? NAVY : '#fff')};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;

  svg {
    width: 0.85rem;
    height: 0.85rem;
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 0.45rem;
  margin-top: 0.55rem;
  overflow-x: auto;
  padding-bottom: 0.3rem;
  scroll-behavior: smooth;
  scrollbar-width: thin;
`;

const Thumb = styled.button`
  position: relative;
  flex: 0 0 auto;
  width: 84px;
  height: 56px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  overflow: hidden;
  background: ${p => p.theme.colors.lightGray};
  cursor: pointer;
  opacity: ${p => (p.$active ? 1 : 0.62)};
  outline: 2px solid ${p => (p.$active ? NAVY : 'transparent')};
  outline-offset: -2px;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const VideoThumbBadge = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(10, 16, 32, 0.45);
  color: #fff;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

/* ------------------------------------------------------------------ side card */

const Card = styled.aside`
  position: sticky;
  top: calc(var(--site-nav-height, 72px) + 1rem);
  background: #fff;
  border: 1px solid ${LINE};
  border-radius: 10px;
  padding: 1.25rem 1.25rem 1rem;
  box-shadow: 0 6px 24px rgba(14, 31, 69, 0.07);

  @media (max-width: 1023px) {
    position: static;
  }
`;

const StatusPill = styled.span`
  display: inline-block;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  color: #fff;
  background: ${p => (p.$active ? '#2e7d32' : p.theme.colors.darkGray)};
`;

const Price = styled.p`
  font-family: ${p => p.theme.fonts.heading};
  font-size: 2.25rem;
  font-weight: 600;
  color: ${NAVY};
  margin: 0.45rem 0 0.1rem;
  line-height: 1.05;
`;

const Address = styled.h1`
  font-family: ${p => p.theme.fonts.body};
  font-size: 0.98rem;
  font-weight: 600;
  color: ${p => p.theme.colors.text};
  margin: 0;
  line-height: 1.4;
`;

const QuickFacts = styled.p`
  margin: 0.4rem 0 0;
  font-size: 0.9rem;
  color: ${p => p.theme.colors.darkGray};

  strong {
    color: ${p => p.theme.colors.text};
    font-weight: 700;
  }
`;

const FormTitle = styled.h2`
  margin: 1rem 0 0.6rem;
  padding-top: 1rem;
  border-top: 1px solid ${LINE};
  font-family: ${p => p.theme.fonts.body};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${NAVY};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const Field = styled.input`
  grid-column: ${p => (p.$full ? '1 / -1' : 'auto')};
  width: 100%;
  min-width: 0;
  height: 2.6rem;
  padding: 0 0.75rem;
  border: 1px solid rgba(14, 31, 69, 0.2);
  border-radius: 6px;
  font: inherit;
  font-size: 0.92rem;
  color: ${p => p.theme.colors.text};
  background: #fff;

  &:focus {
    outline: none;
    border-color: ${NAVY};
    box-shadow: 0 0 0 3px rgba(14, 31, 69, 0.12);
  }
`;

const TextArea = styled.textarea`
  grid-column: 1 / -1;
  width: 100%;
  min-height: 4.6rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid rgba(14, 31, 69, 0.2);
  border-radius: 6px;
  font: inherit;
  font-size: 0.92rem;
  line-height: 1.45;
  color: ${p => p.theme.colors.text};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${NAVY};
    box-shadow: 0 0 0 3px rgba(14, 31, 69, 0.12);
  }
`;

const Submit = styled.button`
  ${button('primary')}
  grid-column: 1 / -1;
  width: 100%;
`;

const FormNote = styled.p`
  grid-column: 1 / -1;
  margin: 0.15rem 0 0;
  font-size: 0.72rem;
  line-height: 1.4;
  color: ${p => p.theme.colors.darkGray};

  &[data-error] {
    color: #b42318;
    font-size: 0.8rem;
  }
`;

const Success = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  padding: 0.85rem;
  border-radius: 8px;
  background: #ecf6ee;
  color: #1e5a2a;
  font-size: 0.9rem;
  line-height: 1.45;

  svg {
    flex: 0 0 auto;
    width: 1.2rem;
    height: 1.2rem;
    margin-top: 0.1rem;
  }
`;

const ContactRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 0.6rem;

  /* the sticky action bar covers call / text on small screens */
  @media (max-width: 1023px) {
    display: none;
  }
`;

const GhostLink = styled.a`
  ${button('outline', 'sm')}
  width: 100%;
`;

const Agent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 0.9rem;
  padding-top: 0.85rem;
  border-top: 1px solid ${LINE};

  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 20%;
  }

  p {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.35;
    color: ${p => p.theme.colors.darkGray};
  }

  strong {
    color: ${p => p.theme.colors.text};
  }
`;

const OutLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${p => p.theme.colors.secondary};
  text-decoration: none;

  svg {
    width: 0.8rem;
    height: 0.8rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

/* ------------------------------------------------------------------ details */

const FactsBar = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 0.5rem;
  margin: 1.5rem 0 0;
  padding: 1rem 0;
  border-top: 1px solid ${LINE};
  border-bottom: 1px solid ${LINE};

  div {
    text-align: left;
  }

  dt {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.darkGray};
  }

  dd {
    margin: 0.15rem 0 0;
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1.45rem;
    font-weight: 600;
    color: ${NAVY};
    line-height: 1.15;
  }
`;

const Section = styled.section`
  margin-top: 1.75rem;

  h2 {
    font-family: ${p => p.theme.fonts.heading};
    font-size: 1.5rem;
    font-weight: 600;
    color: ${NAVY};
    margin: 0 0 0.6rem;
  }
`;

const Description = styled.div`
  position: relative;
  font-size: 1rem;
  line-height: 1.75;
  color: ${p => p.theme.colors.text};
  white-space: pre-line;
  max-height: ${p => (p.$open ? 'none' : '11.5rem')};
  overflow: hidden;

  &::after {
    content: '';
    display: ${p => (p.$open ? 'none' : 'block')};
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3.5rem;
    background: linear-gradient(rgba(252, 252, 253, 0), ${p => p.theme.colors.background});
  }
`;

const TextButton = styled.button`
  margin-top: 0.4rem;
  padding: 0;
  border: 0;
  background: none;
  color: ${p => p.theme.colors.secondary};
  font: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
`;

const FactList = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  column-gap: 1.5rem;
  margin: 0;

  div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(14, 31, 69, 0.08);
  }

  dt {
    font-size: 0.88rem;
    color: ${p => p.theme.colors.darkGray};
  }

  dd {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: ${p => p.theme.colors.text};
    text-align: right;
  }
`;

const Disclaimer = styled.p`
  margin: 2rem 0 0;
  font-size: 0.7rem;
  line-height: 1.55;
  color: ${p => p.theme.colors.darkGray};
  opacity: 0.85;
`;

const StateMessage = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: ${p => p.theme.colors.darkGray};

  a {
    color: ${p => p.theme.colors.secondary};
    font-weight: 600;
  }
`;

/* ------------------------------------------------------------------ mobile action bar + lightbox */

const ActionBar = styled.div`
  display: none;

  @media (max-width: 1023px) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 950;
    display: grid;
    grid-template-columns: auto auto 1fr;
    gap: 0.5rem;
    padding: 0.6rem 0.75rem calc(0.6rem + env(safe-area-inset-bottom, 0px));
    background: rgba(255, 255, 255, 0.97);
    border-top: 1px solid ${LINE};
    box-shadow: 0 -4px 18px rgba(14, 31, 69, 0.08);
  }
`;

const BarLink = styled.a`
  ${p => button(p['data-primary'] !== undefined ? 'primary' : 'outline')}
  padding: 0 0.85rem;
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(8, 12, 24, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1rem;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    user-select: none;
  }
`;

const LightboxCounter = styled.span`
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  font-weight: 600;
`;

/* ------------------------------------------------------------------ helpers */

const stripHtml = (html) => (html ? html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '');

function formatLot(listing) {
  const acres = Number(listing.lotSizeAcres);
  const sqft = Number(listing.lotSizeSquareFeet);
  if (acres && sqft) return `${acres.toFixed(2)} acres (${sqft.toLocaleString()} sq ft)`;
  if (acres) return `${acres.toFixed(2)} acres`;
  if (sqft) return `${sqft.toLocaleString()} sq ft`;
  return null;
}

/** Left/right swipe on touch screens. */
function useSwipe(onPrev, onNext) {
  const start = useRef(null);
  return {
    onTouchStart: (e) => {
      start.current = e.touches[0].clientX;
    },
    onTouchEnd: (e) => {
      if (start.current === null) return;
      const dx = e.changedTouches[0].clientX - start.current;
      start.current = null;
      if (Math.abs(dx) < 40) return;
      if (dx > 0) onPrev();
      else onNext();
    },
  };
}

/* ------------------------------------------------------------------ inquiry form */

function InquiryForm({ listing, isActive, pixelParams }) {
  const street = listing.address?.split(',')[0] || listing.address;
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: isActive
      ? `I'd like to schedule a showing of ${street}.`
      : `I have a question about ${street}.`,
  });
  const [status, setStatus] = useState({ sending: false, done: false, error: null });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setStatus({ sending: false, done: false, error: 'Please add your name and email.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setStatus({ sending: false, done: false, error: 'Please enter a valid email address.' });
      return;
    }
    setStatus({ sending: true, done: false, error: null });
    try {
      await submitContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        context: `${isActive ? 'Showing request' : 'Listing question'}: ${listing.address} (MLS# ${listing.mlsId})`,
        message: form.message.trim() || `Interested in ${listing.address}.`,
      });
      trackPixel('Lead', { ...pixelParams, content_category: isActive ? 'showing_request' : 'listing_question' });
      setStatus({ sending: false, done: true, error: null });
    } catch (err) {
      setStatus({
        sending: false,
        done: false,
        error: err.message || 'Something went wrong. Please call or text Dan instead.',
      });
    }
  };

  if (status.done) {
    return (
      <Success role="status">
        <FiCheck aria-hidden />
        <span>
          Thanks, {form.name.trim().split(' ')[0]}! Dan will reach out shortly
          {isActive ? ' to set up your showing' : ''}. Need him sooner? Call or text {AGENT_PHONE}.
        </span>
      </Success>
    );
  }

  return (
    <Form onSubmit={submit} noValidate>
      <Field aria-label="Name" placeholder="Name" autoComplete="name" value={form.name} onChange={set('name')} required />
      <Field
        aria-label="Phone"
        placeholder="Phone"
        type="tel"
        autoComplete="tel"
        value={form.phone}
        onChange={set('phone')}
      />
      <Field
        $full
        aria-label="Email"
        placeholder="Email"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={set('email')}
        required
      />
      <TextArea aria-label="Message" rows={3} value={form.message} onChange={set('message')} />
      <Submit type="submit" disabled={status.sending}>
        {status.sending ? 'Sending…' : isActive ? 'Request a Showing' : 'Send Message'}
      </Submit>
      {status.error ? (
        <FormNote data-error>{status.error}</FormNote>
      ) : (
        <FormNote>Dan replies personally, usually the same day. No spam, ever.</FormNote>
      )}
    </Form>
  );
}

InquiryForm.propTypes = {
  listing: PropTypes.shape({
    address: PropTypes.string,
    mlsId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  isActive: PropTypes.bool,
  pixelParams: PropTypes.object,
};

/* ------------------------------------------------------------------ page */

/** Listing page, built from the Coldwell Banker sync. Works for every listing on Dan's profile automatically. */
const ListingDetail = () => {
  const { id } = useParams();
  const { hash } = useLocation();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | missing | error
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState('photos'); // photos | video
  const [lightbox, setLightbox] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const videoRef = useRef(null);
  const thumbsRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setState('loading');
    setIndex(0);
    setMode('photos');
    fetchCbListingDetail(id)
      .then((d) => {
        if (cancelled) return;
        if (!d) {
          setState('missing');
          return;
        }
        setData(d);
        setState('ready');
      })
      .catch((err) => {
        console.error('Listing load failed:', err);
        if (!cancelled) setState('error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const listing = data?.listing;

  // links like "/listings/6724-harvey-ln#inquiry" (card shortcuts) open with the showing form in view
  useEffect(() => {
    if (state !== 'ready' || hash !== '#inquiry') return;
    const t = setTimeout(() => {
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
    return () => clearTimeout(t);
  }, [state, hash]);

  const photos = listing?.photos?.length ? listing.photos : listing?.photo ? [listing.photo] : [];
  const count = photos.length;
  const media = listing ? mediaForListing(listing.mlsId) : null;

  const go = useCallback(
    (delta) => {
      if (!count) return;
      setMode('photos');
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );
  const swipe = useSwipe(() => go(-1), () => go(1));

  // keep the active thumbnail in view
  useEffect(() => {
    const strip = thumbsRef.current;
    const el = strip?.querySelector(`[data-index="${index}"]`);
    if (strip && el && mode === 'photos') {
      strip.scrollLeft = el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2;
    }
  }, [index, mode]);

  // preload the neighbours so arrows feel instant
  useEffect(() => {
    if (!count) return;
    [index + 1, index - 1].forEach((i) => {
      const img = new Image();
      img.src = photos[(i + count) % count];
    });
  }, [index, count, photos]);

  useEffect(() => {
    if (!listing) return;
    trackPixel('ViewContent', {
      content_name: listing.address,
      content_ids: [String(listing.mlsId)],
      content_type: 'home_listing',
      value: listing.priceNumber || undefined,
      currency: 'USD',
    });
  }, [listing]);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, go]);

  const showVideo = () => {
    setMode('video');
    // started by a tap, so playback with sound is allowed
    setTimeout(() => videoRef.current?.play().catch(() => {}), 0);
  };

  if (state !== 'ready') {
    return (
      <PageRoot>
        <SEO pageName="Listing" title={`Listing | ${AGENT_NAME}, ${BROKERAGE_NAME}`} noIndex />
        <Wrap>
          <StateMessage>
            {state === 'loading' && 'Loading listing…'}
            {state === 'missing' && (
              <>
                This listing is no longer available. <Link to="/listings">See Dan&apos;s current listings</Link> or{' '}
                <Link to="/contact">contact Dan</Link>.
              </>
            )}
            {state === 'error' && (
              <>
                This listing couldn&apos;t be loaded right now.{' '}
                <a href={CB_AGENT_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  View it on Coldwell Banker
                </a>{' '}
                or call Dan at <a href={AGENT_PHONE_HREF}>{AGENT_PHONE}</a>.
              </>
            )}
          </StateMessage>
        </Wrap>
      </PageRoot>
    );
  }

  const isActive = listing.status === 'active';
  const street = listing.address?.split(',')[0] || listing.address;
  const cityLine = listing.address?.split(',').slice(1).join(',').trim();
  const pixelParams = { content_name: listing.address, content_ids: [String(listing.mlsId)] };
  const lot = formatLot(listing);
  const keyFacts = [
    ['Beds', listing.beds],
    ['Baths', listing.baths],
    ['Sq Ft', listing.squareFeet],
    ['Year Built', listing.yearBuilt],
    ['Lot', listing.lotSizeAcres ? `${Number(listing.lotSizeAcres).toFixed(2)} ac` : null],
  ].filter(([, v]) => v !== null && v !== undefined && v !== '');
  const homeFacts = [
    ['Property type', listing.propertyType],
    ['Year built', listing.yearBuilt],
    ['Lot size', lot],
    ['Heating', listing.heating],
    ['Cooling', listing.cooling],
    ['Status', isActive ? 'For sale' : listing.status],
    ['MLS#', listing.mlsId],
  ].filter(([, v]) => v !== null && v !== undefined && v !== '');
  const longDescription = (listing.description || '').length > 600;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateListing',
            name: listing.address,
            url: `${SITE_URL}/listings/${listing.slug || listing.mlsId}`,
            image: photos.slice(0, 6),
            description: listing.description ? listing.description.slice(0, 500) : undefined,
            offers: listing.priceNumber
              ? {
                  '@type': 'Offer',
                  price: listing.priceNumber,
                  priceCurrency: 'USD',
                  availability: isActive ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
                }
              : undefined,
            about: {
              '@type': 'SingleFamilyResidence',
              address: {
                '@type': 'PostalAddress',
                streetAddress: street,
                addressLocality: (cityLine || '').split(',')[0]?.trim() || undefined,
                addressRegion: ((cityLine || '').split(',')[1] || '').trim().split(' ')[0] || undefined,
                postalCode: ((cityLine || '').match(/\b\d{5}\b/) || [])[0],
                addressCountry: 'US',
              },
              numberOfRooms: listing.beds || undefined,
              numberOfBathroomsTotal: listing.baths || undefined,
              floorSize: listing.squareFeet
                ? { '@type': 'QuantitativeValue', value: String(listing.squareFeet).replace(/,/g, ''), unitCode: 'FTK' }
                : undefined,
              yearBuilt: listing.yearBuilt || undefined,
              geo:
                listing.lat && listing.lng ? { '@type': 'GeoCoordinates', latitude: listing.lat, longitude: listing.lng } : undefined,
            },
            provider: { '@type': 'RealEstateAgent', name: AGENT_NAME, telephone: AGENT_PHONE, url: SITE_URL },
          }),
        }}
      />
      <SEO
        pageName={street}
        title={`${street} · ${listing.price} | ${AGENT_NAME}, ${BROKERAGE_NAME}`}
        description={`${listing.address}: ${listing.beds} bed, ${listing.baths} bath, ${listing.squareFeet} sq ft ${(
          listing.propertyType || 'home'
        ).toLowerCase()} listed at ${listing.price}. Schedule a private showing with ${AGENT_NAME}.`}
        image={photos[0]}
        useDynamicOg={false}
      />
      <PageRoot>
        <Wrap>
          <Crumb>
            <Link to="/listings">My Listings</Link> / {street}
          </Crumb>

          <Grid>
            <GalleryArea>
              <Stage {...(mode === 'photos' ? swipe : {})}>
                {mode === 'photos' && count > 0 && (
                  <>
                    <StageImg
                      src={photos[index]}
                      alt={`${street}, photo ${index + 1} of ${count}`}
                      onClick={() => setLightbox(true)}
                      draggable={false}
                    />
                    {count > 1 && (
                      <>
                        <PrevButton type="button" aria-label="Previous photo" onClick={() => go(-1)}>
                          <FiChevronLeft />
                        </PrevButton>
                        <NextButton type="button" aria-label="Next photo" onClick={() => go(1)}>
                          <FiChevronRight />
                        </NextButton>
                      </>
                    )}
                    <ExpandButton type="button" aria-label="View full screen" onClick={() => setLightbox(true)}>
                      <FiMaximize2 />
                    </ExpandButton>
                    <Counter>
                      {index + 1} / {count}
                    </Counter>
                  </>
                )}

                {mode === 'video' && media?.video && (
                  <>
                    {media.poster && <VideoBackdrop src={media.poster} alt="" aria-hidden />}
                    <StageVideo
                      ref={videoRef}
                      src={media.video}
                      poster={media.poster}
                      controls
                      playsInline
                      preload="metadata"
                      onPlay={() => trackPixelCustom('PlayListingVideo', pixelParams)}
                    />
                  </>
                )}

                {media?.video && (
                  <ModeTabs role="tablist" aria-label="Media">
                    <ModeTab
                      type="button"
                      role="tab"
                      aria-selected={mode === 'photos'}
                      $active={mode === 'photos'}
                      onClick={() => setMode('photos')}
                    >
                      <FiImage aria-hidden /> Photos
                    </ModeTab>
                    <ModeTab type="button" role="tab" aria-selected={mode === 'video'} $active={mode === 'video'} onClick={showVideo}>
                      <FiPlay aria-hidden /> Video tour
                    </ModeTab>
                  </ModeTabs>
                )}
              </Stage>

              {(count > 1 || media?.video) && (
                <Thumbs ref={thumbsRef}>
                  {media?.video && (
                    <Thumb type="button" $active={mode === 'video'} onClick={showVideo} aria-label="Play video tour">
                      <img src={media.poster || photos[0]} alt="" />
                      <VideoThumbBadge>
                        <FiPlay aria-hidden />
                      </VideoThumbBadge>
                    </Thumb>
                  )}
                  {photos.map((src, i) => (
                    <Thumb
                      key={src}
                      type="button"
                      data-index={i}
                      $active={mode === 'photos' && i === index}
                      onClick={() => {
                        setMode('photos');
                        setIndex(i);
                      }}
                      aria-label={`Show photo ${i + 1}`}
                    >
                      <img src={src} alt="" loading="lazy" />
                    </Thumb>
                  ))}
                </Thumbs>
              )}
            </GalleryArea>

            <SideArea>
              <Card id="inquiry">
                <StatusPill $active={isActive}>{isActive ? 'For Sale' : listing.status}</StatusPill>
                <Price>{listing.price}</Price>
                <Address>
                  {street}
                  {cityLine ? <span style={{ fontWeight: 400 }}>, {cityLine}</span> : null}
                </Address>
                <QuickFacts>
                  <strong>{listing.beds}</strong> bd · <strong>{listing.baths}</strong> ba ·{' '}
                  <strong>{listing.squareFeet}</strong> sq ft
                </QuickFacts>

                <FormTitle>{isActive ? 'Request a private showing' : 'Ask Dan about this home'}</FormTitle>
                <InquiryForm listing={listing} isActive={isActive} pixelParams={pixelParams} />

                <ContactRow>
                  <GhostLink href={AGENT_PHONE_HREF} onClick={() => trackPixel('Contact', { ...pixelParams, method: 'call' })}>
                    <FiPhone aria-hidden /> Call
                  </GhostLink>
                  <GhostLink href={SMS_HREF} onClick={() => trackPixel('Contact', { ...pixelParams, method: 'text' })}>
                    <FiMessageSquare aria-hidden /> Text
                  </GhostLink>
                </ContactRow>

                <Agent>
                  <img src="/images/DWHeadshot.png" alt="" />
                  <p>
                    <strong>{AGENT_NAME}</strong> · {AGENT_PHONE}
                    <br />
                    Broker, {BROKERAGE_NAME}
                  </p>
                </Agent>
                <OutLink
                  href={listing.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackPixelCustom('ViewCBListing', pixelParams)}
                >
                  Full listing on Coldwell Banker <FiExternalLink aria-hidden />
                </OutLink>
              </Card>
            </SideArea>

            <DetailsArea>
              <FactsBar>
                {keyFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </FactsBar>

              {listing.description && (
                <Section>
                  <h2>About this home</h2>
                  <Description $open={descOpen || !longDescription}>{listing.description}</Description>
                  {longDescription && (
                    <TextButton type="button" onClick={() => setDescOpen((o) => !o)}>
                      {descOpen ? 'Show less' : 'Read more'}
                    </TextButton>
                  )}
                </Section>
              )}

              {homeFacts.length > 0 && (
                <Section>
                  <h2>Home facts</h2>
                  <FactList>
                    {homeFacts.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </FactList>
                </Section>
              )}

              {listing.disclaimer && <Disclaimer>{stripHtml(listing.disclaimer)}</Disclaimer>}
            </DetailsArea>
          </Grid>
        </Wrap>
      </PageRoot>

      <ActionBar aria-label="Contact Dan">
        <BarLink href={AGENT_PHONE_HREF} onClick={() => trackPixel('Contact', { ...pixelParams, method: 'call' })}>
          <FiPhone aria-hidden /> Call
        </BarLink>
        <BarLink href={SMS_HREF} onClick={() => trackPixel('Contact', { ...pixelParams, method: 'text' })}>
          <FiMessageSquare aria-hidden /> Text
        </BarLink>
        <BarLink
          data-primary
          href="#inquiry"
          onClick={(e) => {
            e.preventDefault();
            trackPixel('Schedule', pixelParams);
            document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          {isActive ? 'Request a Showing' : 'Ask Dan'}
        </BarLink>
      </ActionBar>

      {lightbox && count > 0 && (
        <Lightbox onClick={() => setLightbox(false)} role="dialog" aria-label="Photo gallery" {...swipe}>
          <img src={photos[index]} alt={`${street}, photo ${index + 1} of ${count}`} onClick={(e) => e.stopPropagation()} />
          <RoundButton type="button" style={{ top: '1rem', right: '1rem' }} aria-label="Close">
            <FiX />
          </RoundButton>
          {count > 1 && (
            <>
              <PrevButton
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              >
                <FiChevronLeft />
              </PrevButton>
              <NextButton
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              >
                <FiChevronRight />
              </NextButton>
            </>
          )}
          <LightboxCounter>
            {index + 1} / {count}
          </LightboxCounter>
        </Lightbox>
      )}
    </>
  );
};

export default ListingDetail;
