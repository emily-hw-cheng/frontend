import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, userRole, allowedRole, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (userRole !== allowedRole) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;