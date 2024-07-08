import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";


 import '../../style/App.css';
// import '../../style/simple.css';
// import '../../style/extendet.css';

import '../../style/navbar.css';
import '../../style/score.css';
import '../../style/login.css';
import '../../style/Buttons.css'


       

const Layout = ({ children, pTitle, styleName="default" }) => {


  const loginStyleName = localStorage.getItem('styleName');
       
  return (
    <div id="application" className={loginStyleName?loginStyleName:styleName}>
      <Navbar />
      <h2 id="pTitle" className="pageTitle">{pTitle}</h2>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
