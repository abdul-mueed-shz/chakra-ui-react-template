import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const isAuthenticated = localStorage.getItem("token"); // Replace with your actual auth logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthGuard;