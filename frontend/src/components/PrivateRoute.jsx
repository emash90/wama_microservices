import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');

  // If no token, redirect to login page
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component
  return children;
};

export default PrivateRoute;
