import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Traffic from "../pages/Traffic";
import Settings from "../pages/Settings";
import Layout from "../components/Layout";
import PacketCapturePage from "../pages/PacketCapturePage";

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
          <Route path="/" element={<PacketCapturePage />} />
          <Route path="/capture" element={<PacketCapturePage />} />
          <Route path="/port-scan" element={<Traffic />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
