import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import expLogo from '../../assets/images/exp_realty_logo.png';

const Nav = styled.nav`
  background: ${props => props.theme.colors.primary};
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AgentName = styled(Link)`
  font-family: 'Playfair Display', serif;
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Separator = styled.span`
  color: ${props => props.theme.colors.white};
  opacity: 0.8;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BrokerageLogo = styled.img`
  height: 20px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.9;

  @media (max-width: 768px) {
    height: 16px;
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
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
    transition: width 0.2s ease;
  }

  &:hover {
    color: ${props => props.theme.colors.accent};
    &::after {
      width: 100%;
    }
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
          <BrandingGroup>
            <AgentName to="/" onClick={handleLinkClick}>Dan Weihmiller</AgentName>
            <Separator>|</Separator>
            <BrokerageLogo src={expLogo} alt="eXp Realty" />
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
            <NavLink to="/listings" onClick={handleLinkClick}>Listings</NavLink>
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