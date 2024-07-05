import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

// import '../../style/App.css';
// import '../../style/simple.css';
// import '../../style/extendet.css';
// import '../../style/login.css';
// import '../../style/navbar.css';

const Layout = ({ children }) => {
  return (
    <div id="application" class="extended">
      <Navbar />
      <h2 id="pTitle" className="pageTitle">
        ..TITLE...
      </h2>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
