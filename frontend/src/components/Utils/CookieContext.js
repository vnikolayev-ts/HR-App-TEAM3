import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const CookieContext = createContext();

export const useCookies = () => {
  return useContext(CookieContext);
};

export const CookieProvider = ({ children }) => {
  const [cookies, setCookies] = useState(Cookies);

  const setCookie = (name, value, options) => {
    Cookies.set(name, value, options);
    setCookies(Cookies); // Update state
  };

  const getCookie = (name) => {
    return Cookies.get(name);
  };

  const removeCookie = (name, options) => {
    Cookies.remove(name, options);
    setCookies(Cookies); // Update state
  };

  const cookieContextValue = {
    setCookie,
    getCookie,
    removeCookie
  };

  return (
    <CookieContext.Provider value={cookieContextValue}>
      {children}
    </CookieContext.Provider>
  );
};
