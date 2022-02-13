import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCheckAuth } from "../../hooks/auth";

function RequireAuth({ children }) {
  const location = useLocation();
  const isAuth = useCheckAuth();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
