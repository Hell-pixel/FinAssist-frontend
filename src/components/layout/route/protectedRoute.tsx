import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/authContext';
import Spinner from '@/components/base/spinner';
import AppLayout from '../layout';

const ProtectedRoute: React.FC = () => {
  const { user, userDataIsLoading, requiredAuth } = useAuthContext();
  const location = useLocation();

  if (userDataIsLoading) {
    return <Spinner />;
  }

  if (!user && requiredAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AppLayout />;
};

export default ProtectedRoute;
