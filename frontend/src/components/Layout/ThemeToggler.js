// ThemeToggler.js
import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.toggleBorder};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  overflow: hidden;
  padding: 0.5rem;
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 10rem;
  height: 3rem;
  z-index: 1000;
`;

const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </ToggleContainer>
  );
};

export default ThemeToggler;
