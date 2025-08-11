import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddAsset from "./pages/AddAsset";
import AssetList from "./pages/AssetList";
import AssetDetail from "./pages/AssetDetail";
import EditAsset from "./pages/EditAsset";
import AssetQRCode from "./pages/AssetQRCode";
import OneSignalInit from './pages/OneSignalInit'; // make sure this file uses lowercase 'pages' folder if that's correct

export default function App() {
  return (
    <>
      {/* This runs OneSignal initialization */}
      <OneSignalInit />

      {/* Your routing */}
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assets" element={<AssetList />} />
          <Route path="/add-assets" element={<AddAsset />} />
          <Route path="/assets/:id" element={<AssetDetail />} />
          <Route path="/assets/:id/edit" element={<EditAsset />} />
          <Route path="/assets-qr" element={<AssetQRCode />} />
        </Routes>
      </Router>
    </>
  );
}
