// ThemeToggler.js
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SunIcon } from '../../style/sun.svg';
import { ReactComponent as MoonIcon } from '../../style/moon.svg';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.toggleBorder};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  position: fixed;
  right: 20px;
  top: 100px;
  width: 4rem;
  height: 4rem;
  z-index: 100;
`;

const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </ToggleContainer>
  );
};

export default ThemeToggler;
