import { useContext, } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, userData, loadingAuth } = useContext(AppContext);

  if (loadingAuth) return null;

  if (!isLoggedIn || !userData?.verified) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
