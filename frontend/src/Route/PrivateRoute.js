import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../components/Login/auth';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
