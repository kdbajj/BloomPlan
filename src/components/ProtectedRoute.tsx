import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) {
    return <p>Loading...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;