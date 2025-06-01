import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import ProfileForm from "./pages/ProfileForm";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <ToastProvider>
            <Routes>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/onboarding"
                element=<ProtectedRoute>
                  <ProfileForm />
                </ProtectedRoute>
              />
              <Route
                path="/dashboard"
                element=<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              />
            </Routes>
          </ToastProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
