// src/auth/ProtectedRoute.js or src/components/auth/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = localStorage.getItem('isLoggedIn'); // Adjust this to match how you store the token
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  console.log("isauth",isAuth)
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
