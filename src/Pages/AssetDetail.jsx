import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function AssetDetail() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch asset details on mount
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await fetch(`https://assetsbackend-0ou8.onrender.com/api/assets/${id}`);
        const data = await res.json();

        if (res.ok && data.success && data.data) {
          setAsset(data.data);
        } else {
          console.warn("Asset not found or invalid response");
        }
      } catch (error) {
        console.error("Error fetching asset:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8 text-gray-500">Loading asset details...</div>
      </Layout>
    );
  }

  if (!asset) {
    return (
      <Layout>
        <div className="text-center py-8 text-red-500">
          Asset not found.
          <div className="mt-4">
            <Link
              to="/assets"
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back to List
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">
          Asset Details — #{asset.id}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p><strong>Name:</strong> {asset.asset_name}</p>
          <p><strong>Type:</strong> {asset.asset_type}</p>
          <p>
            <strong>Status:</strong>{" "}
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
          </p>
          <p><strong>Assigned To:</strong> {asset.assigned_to_name || "-"}</p>
          <p>
            <strong>Purchase Date:</strong>{" "}
            {asset.purchase_date
              ? asset.purchase_date.split("T")[0]
              : "-"}
          </p>
          <p><strong>Vendor:</strong> {asset.vendor || "-"}</p>
          <p><strong>Department:</strong> {asset.department || "-"}</p>
          <p className="md:col-span-2">
            <strong>Description:</strong> {asset.description || "-"}
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <Link
            to={`/assets/${asset.id}/edit`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit Asset
          </Link>
          <Link
            to="/assets"
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Back to List
          </Link>
        </div>
      </div>
    </Layout>
  );
}
