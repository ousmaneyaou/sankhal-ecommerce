import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiServices";

//utilisés pour restreindre l'accès à certaines routes en fonction de l'authentification et du rôle de l'utilisateur.

//vérifiant si l'utilisateur est authentifié.
export const ProtectedRoute = ({ element: Component }) => {
  const location = useLocation();

  return ApiService.isAuthenticated() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

//vérifiant si l'utilisateur est un administrateur.
export const AdminRoute = ({ element: Component }) => {
  const location = useLocation();

  return ApiService.isAdmin() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
