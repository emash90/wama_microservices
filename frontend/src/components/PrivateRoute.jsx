import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { validateToken }  from '../services/authService'; // Import the validateToken function

const PrivateRoute = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(null);
  const authToken = localStorage.getItem('authToken'); // Retrieve token from localStorage

  useEffect(() => {
    const checkToken = async () => {
      if (authToken) {
        // Call the validateToken function to check if the token is valid
        const isValid = await validateToken(authToken);
        setIsValidToken(isValid); // Set the result
      } else {
        setIsValidToken(false); // If no token, mark as invalid
      }
    };

    checkToken();
  }, []); // Trigger check when authToken changes

  // While token is being validated, show loading state
  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  // If token is invalid or missing, redirect to login page
  if (!authToken || !isValidToken) {
    return <Navigate to="/login" replace />;
  }

  // If token is valid, render the protected component
  return children;
};

export default PrivateRoute;
