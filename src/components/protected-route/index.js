import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, link, children }) => {
  return isLoggedIn ? children : <Navigate to={`${link}`} replace />;
};

export default ProtectedRoute;
