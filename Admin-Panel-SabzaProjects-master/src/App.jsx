"use client"
import LoginPage from "./app/login/page"
import DashboardPage from "./app/page"
import LoadingSpinner from "./components/loading-spinner"
import ErrorDisplay from "./components/error-display"
import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /*useEffect(() => {
    // Simulate checking for an existing session
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      setError("Error reading from localStorage");
    } finally {
      setIsLoading(false);
    }
  }, []);
*/
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return isAuthenticated ? (
    <DashboardPage />
  ) : (
    <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
  );
}

export default App;
