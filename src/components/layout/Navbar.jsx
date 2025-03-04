import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: ${props => props.theme.transitions.default};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  transition: ${props => props.theme.transitions.default};
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    transform: scale(1.02);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
    background-color: ${props => props.theme.colors.lightGray};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.accent};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Dan Weihmiller Realty</Logo>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          ☰
        </MenuButton>
        <NavLinks isOpen={isOpen}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/listings" onClick={() => setIsOpen(false)}>Listings</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 