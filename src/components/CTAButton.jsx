import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.2s ease;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const CTAButton = ({ href, children }) => {
  return (
    <StyledButton href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledButton>
  );
};

export default CTAButton; 