import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import QRCode from "qrcode";

export default function AssetQRCode() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState(null);

  // Fetch assets data
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/assets");
        const data = await res.json();

        if (data.success) {
          setAssets(data.data);
        } else if (Array.isArray(data)) {
          setAssets(data[0] || []);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Generate QR code, download it, and update backend
  const handleGenerateQR = async (asset) => {
    if (Number(asset.Qrcode) === 1) return;

    setGeneratingId(asset.id);

    try {
      const qrData = JSON.stringify({
        id: asset.id,
        name: asset.asset_name,
        type: asset.asset_type,
        status: asset.status,
        assignedTo: asset.assigned_to_name,
        purchaseDate: asset.purchase_date,
        vendor: asset.vendor,
        department: asset.department,
        description: asset.description,
      });

      const pngUrl = await QRCode.toDataURL(qrData, { width: 256, margin: 2 });

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `asset_${asset.id}_qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      // Update backend Qrcode flag
      const updateRes = await fetch(`http://localhost:5000/api/assets/${asset.id}/generate-qrcode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!updateRes.ok) throw new Error("Failed to update QR code flag");

      // Log QR code generation
      const logRes = await fetch("http://localhost:5000/api/qrcodes/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId: asset.id, assetName: asset.asset_name }),
      });

      if (!logRes.ok) throw new Error("Failed to log QR code generation");

      // Update local state to reflect QR generated
      setAssets((prevAssets) =>
        prevAssets.map((a) =>
          a.id === asset.id ? { ...a, Qrcode: 1 } : a
        )
      );

      alert(`QR code generated and downloaded for asset: ${asset.asset_name}`);
    } catch (error) {
      console.error("Error generating/downloading QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    } finally {
      setGeneratingId(null);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8 text-gray-500">Loading assets...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 border-b pb-3">
          📦 Asset List with QR Codes
        </h2>

        {assets.length === 0 ? (
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
                  <th className="px-4 py-3">QR Code</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{asset.id}</td>
                    <td className="px-4 py-3 font-medium">
                      {asset.asset_name}
                    </td>
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
                    <td className="px-4 py-3 text-center">
                      {Number(asset.Qrcode) === 1 ? (
                        <span className="text-green-600 font-semibold">
                          Generated
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Not Generated
                        </span>
                      )}
                    </td>
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
                      <button
                        onClick={() => handleGenerateQR(asset)}
                        disabled={Number(asset.Qrcode) === 1 || generatingId === asset.id}
                        className={`cursor-pointer px-3 py-1 rounded-lg text-sm text-white transition ${
                          Number(asset.Qrcode) === 1 || generatingId === asset.id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {generatingId === asset.id ? "Generating..." : "Generate QR"}
                      </button>
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
