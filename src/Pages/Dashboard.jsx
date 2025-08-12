import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
   const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token"); // If using JWT auth

        const res = await fetch("http://localhost:5000/api/dashboard/stats", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token if route is protected
          },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setStats(data.data);
        } else {
          console.error("Failed to load stats:", data.error || data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  
  
    useEffect(() => {
      // Get user info from localStorage after login
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  
    if (!user) {
      return (
        <div className="bg-white p-6 rounded-xl shadow-md text-center w-full max-w-sm mx-auto">
          <p className="text-gray-500">No user info found. Please login.</p>
        </div>
      );
    }

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back {user.username}!</h2>

      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 border-indigo-500">
            <h3 className="text-lg font-semibold mb-2">Total Assets</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {stats.totalAssets}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 border-purple-500">
            <h3 className="text-lg font-semibold mb-2">QR Codes Generated</h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats.qrCodesGenerated}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 border-pink-500">
            <h3 className="text-lg font-semibold mb-2">Users</h3>
            <p className="text-3xl font-bold text-pink-600">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 border-green-500">
            <h3 className="text-lg font-semibold mb-2">Active Assets</h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.activeAssets}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Could not load statistics.</p>
      )}
    </Layout>
  );
}
