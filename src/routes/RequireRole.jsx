
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireRole({ children, allowed = [] }) {
  const { user, loading, role } = useContext(AuthContext);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.length) return children;
  if (allowed.includes(role)) return children;
  return <Navigate to="/dashboard" replace />;
}