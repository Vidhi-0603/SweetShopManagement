import { useState } from "react";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const [authMode, setAuthMode] = useState("login");
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return authMode === "login" ? (
      <LoginPage onSwitchToRegister={() => setAuthMode("register")} />
    ) : (
      <RegisterPage onSwitchToLogin={() => setAuthMode("login")} />
    );
  }

 
  return <DashboardPage />;
};
export default App;
