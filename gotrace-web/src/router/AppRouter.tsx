import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Traffic from "../pages/Traffic";
import Settings from "../pages/Settings";
import Layout from "../components/Layout";

export default function AppRouter() {
  const isAuthenticated = true; 

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* App */}
        <Route
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
