import * as React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importing components
import TaskManagerComponent from './frontend/Tasks/TaskManagerComponent';
import AuthorizationComponent from './frontend/Authorization/AuthorizationComponent';

const AUTH_PATH = "/auth";
const TASK_PATH = "/tasks";

/**
 * A simple function to check if a user is authenticated
 * by checking if a JWT token exists in localStorage
 */
const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem('token'));
};

const ProtectedRoute: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={AUTH_PATH} replace />;
};

const App: React.FC = () => {

  const [auth, setAuth] = React.useState(isAuthenticated());

  /**
   * Effect to listen for changes in localStorage token
   * which ensures that the page automatically re-renders
   * based on authentication status
   */
  React.useEffect(() => {
    const handleStorageChange = () => {
      setAuth(isAuthenticated());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        {/*
          If the user is already authenticated then navigating to the AUTH_PATH 
          will redirect them to the TASK_PATH, otherwise, we render the
          AuthorizationComponent
      
        */}
        <Route
          path={AUTH_PATH}
          element={isAuthenticated() ? <Navigate to={TASK_PATH} replace /> : <AuthorizationComponent />}
        />
        <Route path={TASK_PATH} element={<ProtectedRoute><TaskManagerComponent /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={isAuthenticated() ? TASK_PATH : AUTH_PATH} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
