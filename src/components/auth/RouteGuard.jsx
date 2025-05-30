import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthContext } from "../../context/AuthContext";

const RouteGuard = ({ children }) => {
  const { user, loading } = getAuthContext();
  // Check if the user is authenticated
  if (loading) return;
  if (!user) return <Navigate to="/sign-in" replace />;

  return children;
};

export default RouteGuard;
