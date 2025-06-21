import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading component while checking authentication
  if (loading) {
    return (
      <div className="w-full h-screen bg-dark-bg flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if user is authenticated
  return children;
};

export default ProtectedRoute;
