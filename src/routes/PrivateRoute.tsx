import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('auth') === 'true';
};

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
