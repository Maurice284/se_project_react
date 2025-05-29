import { Navigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  // If user is not logged in, redirect to the home page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If user is logged in, render the protected component (children)
  return children;
}

export default ProtectedRoute;
