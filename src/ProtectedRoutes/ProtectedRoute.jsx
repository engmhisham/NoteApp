import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return exp < currentTime;
  } catch (err) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }
};

export default function ProtectedRoute({ children }) {
  let token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) return <Navigate to="/login" />;
  // if (!token) return <Navigate to="/login" />;
  // if (isTokenExpired(token)) return <Navigate to="/login" />;
  return children;
}
