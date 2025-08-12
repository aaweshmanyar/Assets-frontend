import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { FiSearch } from "react-icons/fi";

export default function AssetList() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAssets = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://assetsbackend-0ou8.onrender.com/api/assets/search?search=${query}&limit=50&offset=0`
      );
      const data = await res.json();

      if (data.success) {
        setAssets(data.data);
      } else {
        setAssets([]);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchAssets(e.target.value);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 border-b pb-3">
          📦 Asset List
        </h2>

        {/* Search Bar */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading assets...</div>
        ) : assets.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No assets found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
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
                    <td className="px-4 py-3">{asset.assigned_to_name || "-"}</td>
                    <td className="px-4 py-3 flex gap-3 justify-center">
                      <Link
                        to={`/assets/${asset.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
                      >
                        View
                      </Link>

                      <Link
                        to={`/assets/${asset.id}/edit`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
