import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("user location", location);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
