import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/helpers.js';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
