import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/authContext';
import Spinner from '@/components/base/spinner';

interface LoginRouteProps {
  children: React.ReactNode;
}

const LoginRoute: React.FC<LoginRouteProps> = ({ children }) => {
  const { user, userDataIsLoading, requiredAuth } = useAuthContext();
  const location = useLocation();

  if (userDataIsLoading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requiredAuth) {
    return <>{children}</>;
  }
};

export default LoginRoute;
