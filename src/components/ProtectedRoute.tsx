import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('auth')!); // or your auth check

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ✅ If this route wraps nested routes (via Outlet), use children if passed
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
