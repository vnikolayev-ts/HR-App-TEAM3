// Layout.js
import React, { useState } from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import ThemeToggler from './ThemeToggler';
import '../../style/App.css';
import '../../style/navbar.css';
import '../../style/score.css';
import '../../style/login.css';
import '../../style/Buttons.css';
import '../../style/dark.css'; // Dark Theme CSS importieren

const Layout = ({ children, pTitle, styleName = "default" }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.body.classList.toggle('dark-mode', theme === 'light');
  };

  const loginStyleName = localStorage.getItem('styleName');
  const imgUrl = '../images/logo/neues logo.png';

  return (
    <div id="application" className={`${loginStyleName ? loginStyleName : styleName} ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <Navbar />
      <h2 id="pTitle" className="pageTitle">{pTitle}</h2>
      <main>{children}
        <div className="footer">
          <img src={imgUrl} alt="Logo" className="logof" />
          <Footer />
        </div>
        <div className="logo-container">
        <img src={imgUrl} alt="Logo" className="logo-background" />
        </div>
      </main>
      <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Layout;
