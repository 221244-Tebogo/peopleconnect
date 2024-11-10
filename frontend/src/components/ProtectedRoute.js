//frontend/components/ProtectedRoute

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles, userRole }) => {
  return allowedRoles.includes(userRole) ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
