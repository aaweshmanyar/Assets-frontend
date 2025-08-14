import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./P/Dashboard";
import AddAsset from "./Pages/AddAsset";
import AssetList from "./Pages/AssetList";
import AssetDetail from "./Pages/AssetDetail";
import EditAsset from "./Pages/EditAsset";
import AssetQRCode from "./Pages/AssetQRCode";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
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
