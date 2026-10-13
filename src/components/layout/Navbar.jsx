import styled from '@emotion/styled';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiPhone, FiMessageSquare } from 'react-icons/fi';
import cbLogo from '../../assets/images/CBLogo.png';
import { button } from '../../styles/buttons';
import { AGENT_PHONE, AGENT_PHONE_HREF } from '../../config/agent';
import { trackPixel } from '../../lib/meta-pixel';

const BREAK = 1024; // below this, links move into the slide-out menu

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--site-nav-height, 72px);
  display: flex;
  align-items: center;
  padding: 0 clamp(1rem, 3vw, 2rem);
  background: ${p => p.theme.colors.primary};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${p => (p.$scrolled ? '0 6px 24px rgba(5, 12, 30, 0.28)' : 'none')};
  transition: box-shadow 0.25s ease;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: inherit;
  min-width: 0;
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  line-height: 1.1;
  min-width: 0;
`;

const AgentName = styled.span`
  font-family: ${p => p.theme.fonts.heading};
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const BrandMeta = styled.span`
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
  flex-shrink: 0;

  @media (max-width: 480px) {
    height: 30px;
  }
`;

const DesktopLinks = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.1rem, 2vw, 1.9rem);

  @media (max-width: ${BREAK - 1}px) {
    display: none;
  }
`;

const NavItem = styled(RouterNavLink)`
  position: relative;
  padding: 0.4rem 0;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.1rem;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover,
  &.active {
    color: #fff;
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;

  svg {
    width: 0.9rem;
    height: 0.9rem;
  }

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 1180px) {
    display: none;
  }
`;

const CtaButton = styled(Link)`
  ${button('light', 'sm')}

  @media (max-width: ${BREAK - 1}px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-right: -0.5rem;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #fff;
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (max-width: ${BREAK - 1}px) {
    display: grid;
  }
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1002;
  width: min(86vw, 340px);
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem calc(1.25rem + env(safe-area-inset-bottom, 0px));
  background: ${p => p.theme.colors.primary};
  box-shadow: -12px 0 40px rgba(0, 0, 0, 0.35);
  transform: translateX(${p => (p.$open ? '0' : '100%')});
  visibility: ${p => (p.$open ? 'visible' : 'hidden')};
  transition: transform 0.28s ease, visibility 0.28s;
`;

const DrawerHead = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`;

const DrawerLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const DrawerItem = styled(RouterNavLink)`
  display: block;
  padding: 0.95rem 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
  font-family: ${p => p.theme.fonts.heading};
  font-size: 1.45rem;
  font-weight: 600;
  text-decoration: none;

  &.active {
    color: #fff;
  }

  &.active::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 0 0.6rem 0.25rem 0;
    border-radius: 50%;
    background: #fff;
    vertical-align: middle;
  }
`;

const DrawerActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 1.5rem;

  a:first-of-type {
    grid-column: 1 / -1;
  }
`;

const DrawerCta = styled(Link)`
  ${button('light', 'lg')}
  width: 100%;
`;

const DrawerCall = styled.a`
  ${button('outlineLight', 'lg')}
  width: 100%;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1001;
  background: rgba(5, 10, 25, 0.55);
  opacity: ${p => (p.$open ? 1 : 0)};
  visibility: ${p => (p.$open ? 'visible' : 'hidden')};
  transition: opacity 0.28s ease, visibility 0.28s;
`;

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/listings', label: 'My Listings' },
  { to: '/search', label: 'Search Homes' },
  { to: '/resources', label: 'Resources' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const call = (method) => () => trackPixel('Contact', { method, content_name: 'Navigation' });

  return (
    <>
      <Nav $scrolled={scrolled} aria-label="Main">
        <NavContainer>
          <Brand to="/" aria-label="Dan Weihmiller, home">
            <Logo src={cbLogo} alt="" aria-hidden />
            <BrandText>
              <AgentName>Dan Weihmiller</AgentName>
              <BrandMeta>Colorado Springs Realtor</BrandMeta>
            </BrandText>
          </Brand>

          <DesktopLinks>
            {LINKS.slice(0, 5).map((l) => (
              <NavItem key={l.to} to={l.to} end={l.end}>
                {l.label}
              </NavItem>
            ))}
          </DesktopLinks>

          <Actions>
            <PhoneLink href={AGENT_PHONE_HREF} onClick={call('call')}>
              <FiPhone aria-hidden /> {AGENT_PHONE}
            </PhoneLink>
            <CtaButton to="/contact">Contact Dan</CtaButton>
            <MenuButton type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
              <FiMenu />
            </MenuButton>
          </Actions>
        </NavContainer>
      </Nav>

      <Overlay $open={open} onClick={() => setOpen(false)} aria-hidden />
      <Drawer $open={open} role="dialog" aria-modal="true" aria-label="Menu">
        <DrawerHead>
          <MenuButton type="button" onClick={() => setOpen(false)} aria-label="Close menu" style={{ display: 'grid' }}>
            <FiX />
          </MenuButton>
        </DrawerHead>
        <DrawerLinks>
          {LINKS.map((l) => (
            <DrawerItem key={l.to} to={l.to} end={l.end}>
              {l.label}
            </DrawerItem>
          ))}
        </DrawerLinks>
        <DrawerActions>
          <DrawerCta to="/contact">Contact Dan</DrawerCta>
          <DrawerCall href={AGENT_PHONE_HREF} onClick={call('call')}>
            <FiPhone aria-hidden /> Call
          </DrawerCall>
          <DrawerCall href="sms:7193018257" onClick={call('text')}>
            <FiMessageSquare aria-hidden /> Text
          </DrawerCall>
        </DrawerActions>
      </Drawer>
    </>
  );
};

export default Navbar;
