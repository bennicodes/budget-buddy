import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = getAuthContext();
  // Check if the user is authenticated
  if (!user) return <Navigate to="/sign-in" replace />;

  return children;
};

export default ProtectedRoute;
