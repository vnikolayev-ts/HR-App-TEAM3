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
  left: 20px;
  bottom: 20px;
  width: 4rem;
  height: 4rem;
  z-index: 1000;
`;

const SunIcon2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="48px" height="48px">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path d="M11.99 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1 17h2v-2h-2v2zm1-15c4.96 0 9 4.04 9 9s-4.04 9-9 9-9-4.04-9-9 4.04-9 9-9zm-5 2h2v-2h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2zm12-8h2v-2h-2v2zm0 4h2v-2h-2v2zm0 4h2v-2h-2v2z"/>
</svg>
);

const MoonIcon2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="48px" height="48px">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-15c-3.87 0-7 3.13-7 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z"/>
</svg>
);

const ThemeToggler = ({ theme, toggleTheme }) => {
  return (
    <ToggleContainer onClick={toggleTheme}>
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </ToggleContainer>
  );
};

export default ThemeToggler;
