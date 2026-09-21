import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaPhone } from 'react-icons/fa';

const PHONE_HREF = 'tel:7193018257';
const PHONE_LABEL = '(719) 301-8257';
const HERO_PHONE_ANCHOR_ID = 'hero-call-cta';

const Fab = styled.a`
  position: fixed;
  z-index: 900;
  bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
  right: max(1.25rem, env(safe-area-inset-right, 0px));
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.1rem;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 28px rgba(14, 31, 69, 0.35);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.2s ease;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: translateY(${props => (props.$visible ? '0' : '10px')});
  pointer-events: ${props => (props.$visible ? 'auto' : 'none')};

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  &:hover {
    background: ${props => props.theme.colors.secondary};
    box-shadow: 0 10px 32px rgba(14, 31, 69, 0.42);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.white};
    outline-offset: 3px;
  }

  /* Resources: fixed partner cards sit mid-right on desktop — keep FAB in the corner */
  @media (min-width: 969px) {
    body[data-route='resources'] & {
      bottom: max(1.5rem, env(safe-area-inset-bottom, 0px));
      right: max(1.5rem, env(safe-area-inset-right, 0px));
    }
  }

  @media (max-width: 480px) {
    padding: 0.85rem;
    span {
      display: none;
    }
  }
`;

const FloatingCallButton = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.dataset.route = pathname.startsWith('/resources')
      ? 'resources'
      : pathname.replace(/^\//, '') || 'home';
    return () => {
      delete document.body.dataset.route;
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith('/admin') || pathname === '/search') {
      setVisible(false);
      return undefined;
    }

    if (pathname !== '/') {
      setVisible(true);
      return undefined;
    }

    const anchor = document.getElementById(HERO_PHONE_ANCHOR_ID);
    if (!anchor || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '-72px 0px 0px 0px',
      }
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith('/admin') || pathname === '/search') {
    return null;
  }

  return (
    <Fab
      href={PHONE_HREF}
      $visible={visible}
      aria-label={`Call Dan Weihmiller at ${PHONE_LABEL}`}
    >
      <FaPhone aria-hidden />
      <span>Call Dan</span>
    </Fab>
  );
};

export { HERO_PHONE_ANCHOR_ID };
export default FloatingCallButton;
