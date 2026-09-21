import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cbLogo from '../../assets/images/CBLogo.png';

const Nav = styled.nav`
  background: ${props => props.theme.colors.primary};
  padding: 0.875rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandingGroup = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  text-decoration: none;
  color: inherit;

  &:hover span:first-of-type {
    color: rgba(255, 255, 255, 0.92);
  }
`;

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  line-height: 1.1;
`;

const AgentName = styled.span`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.white};
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const BrandMeta = styled.span`
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.58);
`;

const BrokerageLogo = styled.img`
  height: 36px;
  width: auto;
  object-fit: contain;
  display: block;
  background: transparent;
  flex-shrink: 0;
  opacity: 0.95;

  @media (max-width: 768px) {
    height: 30px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    bottom: 0;
    width: 250px;
    flex-direction: column;
    background: ${props => props.theme.colors.primary};
    padding: 5rem 2rem 2rem;
    gap: 1.5rem;
    transition: right 0.3s ease-in-out;
    box-shadow: ${props => props.isOpen ? props.theme.shadows.large : 'none'};
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.white};
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    width: 100%;
    text-align: center;
    padding: 0.5rem 0;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
  position: relative;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    display: block;
    transform: ${props => props.isOpen ? 'rotate(90deg)' : 'none'};
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: ${props => props.isOpen ? 1 : 0};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 999;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <BrandingGroup to="/" onClick={handleLinkClick}>
            <BrokerageLogo src={cbLogo} alt="" aria-hidden />
            <BrandText>
              <AgentName>Dan Weihmiller</AgentName>
              <BrandMeta>Colorado Springs Realtor</BrandMeta>
            </BrandText>
          </BrandingGroup>
          
          <MenuButton 
            onClick={() => setIsOpen(!isOpen)} 
            isOpen={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? '×' : '☰'}
          </MenuButton>

          <NavLinks isOpen={isOpen}>
            <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
            <NavLink to="/search" onClick={handleLinkClick}>Search</NavLink>
            <NavLink to="/listings" onClick={handleLinkClick}>My Listings</NavLink>
            <NavLink to="/resources" onClick={handleLinkClick}>Resources</NavLink>
            <NavLink to="/about" onClick={handleLinkClick}>About</NavLink>
            <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
          </NavLinks>
        </NavContainer>
      </Nav>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar; 