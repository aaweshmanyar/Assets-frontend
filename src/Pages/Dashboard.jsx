import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiPlusCircle, FiCheckCircle, FiXCircle, FiPackage, FiClock, FiUser  } from "react-icons/fi";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [latestAssets, setLatestAssets] = useState([]);
  const [assetsLoading, setAssetsLoading] = useState(true);

  // Toast notification on dashboard open (after login)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      toast.info(
        "You will get logout after 3 min if you are not using the application.",
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: false,
        }
      );
    }
  }, []);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://assetsbackend-0ou8.onrender.com/api/dashboard/stats",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  // Fetch latest 3 assets for dashboard preview
  useEffect(() => {
    const fetchLatestAssets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://assetsbackend-0ou8.onrender.com/api/assets`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok && data.success) {
          setLatestAssets(data.data);
        } else {
          console.error("Failed to load latest assets:", data.error || data);
          setLatestAssets([]);
        }
      } catch (error) {
        console.error("Error fetching latest assets:", error);
        setLatestAssets([]);
      } finally {
        setAssetsLoading(false);
      }
    };

    fetchLatestAssets();
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
      <ToastContainer />

      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        Welcome Back, <span className="text-indigo-600">{user.username}</span>!
      </h2>

      {/* Dashboard Stats */}
      {loading ? (
        <p className="text-gray-500 mb-12">Loading stats...</p>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          <StatCard
            title="Total Assets"
            value={stats.totalAssets}
            icon={<FiPackage className="text-indigo-600 w-8 h-8" />}
            borderColor="border-indigo-500"
            textColor="text-indigo-600"
          />
          <StatCard
            title="QR Codes Generated"
            value={stats.qrCodesGenerated}
            icon={<FiCheckCircle className="text-purple-600 w-8 h-8" />}
            borderColor="border-purple-500"
            textColor="text-purple-600"
          />
          <StatCard
            title="Users"
            value={stats.totalUsers}
            icon={<FiUser className="text-pink-600 w-8 h-8" />}
            borderColor="border-pink-500"
            textColor="text-pink-600"
          />
          <StatCard
            title="Active Assets"
            value={stats.activeAssets}
            icon={<FiClock className="text-green-600 w-8 h-8" />}
            borderColor="border-green-500"
            textColor="text-green-600"
          />
        </div>
      ) : (
        <p className="text-red-500 mb-12">Could not load statistics.</p>
      )}

      {/* Latest Assets Preview */}
      <section className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🆕 Latest Assets
          <FiPlusCircle className="text-indigo-600" />
        </h3>

        {assetsLoading ? (
          <p className="text-gray-600">Loading latest assets...</p>
        ) : latestAssets.length === 0 ? (
          <p className="text-gray-600 italic">No recent assets found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse rounded-md shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <th className="px-4 py-3 rounded-l-md">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">QR Code</th>
                </tr>
              </thead>
              <tbody>
                {latestAssets.map((asset) => (
                  <tr key={asset.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{asset.id}</td>
                    <td className="px-4 py-3 font-medium">{asset.asset_name}</td>
                    <td className="px-4 py-3">{asset.asset_type}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          asset.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : asset.status === "In Repair"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      {Number(asset.Qrcode) === 1 ? (
                        <>
                          <FiCheckCircle className="text-green-600 w-5 h-5" />
                          <span className="text-green-600 font-semibold">Generated</span>
                        </>
                      ) : (
                        <>
                          <FiXCircle className="text-red-600 w-5 h-5" />
                          <span className="text-red-600 font-semibold">Not Generated</span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
}

// Reusable stat card component
function StatCard({ title, value, icon, borderColor, textColor }) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 ${borderColor} flex items-center gap-4`}
    >
      <div>{icon}</div>
      <div>
        <h4 className="text-gray-500 font-medium">{title}</h4>
        <p className={`text-3xl font-bold ${textColor}`}>{value ?? "-"}</p>
      </div>
    </div>
  );
}
