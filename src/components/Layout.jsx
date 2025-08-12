import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useAutoLogout from "../hooks/useAutoLogout"; // ✅ import the hook

export default function Layout({ children }) {
  // Runs inactivity tracking with 30 sec timeout
  useAutoLogout(180000);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
