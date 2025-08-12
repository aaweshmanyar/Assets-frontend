import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddAsset from "./pages/AddAsset";
import AssetList from "./pages/AssetList";
import AssetDetail from "./pages/AssetDetail";
import EditAsset from "./pages/EditAsset";
import AssetQRCode from "./pages/AssetQRCode";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserInfoCard from "./Pages/UserInfoCard";
import PrivateRoute from "./components/PrivateRoute"; // Adjust path if needed

export default function App() {
  return (
    <>
      {/* Your routing */}
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/assets"
            element={
              <PrivateRoute>
                <AssetList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-assets"
            element={
              <PrivateRoute>
                <AddAsset />
              </PrivateRoute>
            }
          />
          <Route
            path="/assets/:id"
            element={
              <PrivateRoute>
                <AssetDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/assets/:id/edit"
            element={
              <PrivateRoute>
                <EditAsset />
              </PrivateRoute>
            }
          />
          <Route
            path="/assets-qr"
            element={
              <PrivateRoute>
                <AssetQRCode />
              </PrivateRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <UserInfoCard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
