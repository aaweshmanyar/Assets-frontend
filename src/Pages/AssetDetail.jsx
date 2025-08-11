import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function AssetDetail() {
  const { id } = useParams();

  // Simulated fetch
  const asset = {
    id,
    name: "Dell Laptop",
    type: "Hardware",
    status: "Active",
    assignedTo: "John Doe",
    purchaseDate: "2023-04-10",
    vendor: "Dell Inc",
    department: "IT",
    description: "High performance laptop for development."
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Asset Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p><strong>Name:</strong> {asset.name}</p>
          <p><strong>Type:</strong> {asset.type}</p>
          <p><strong>Status:</strong> {asset.status}</p>
          <p><strong>Assigned To:</strong> {asset.assignedTo}</p>
          <p><strong>Purchase Date:</strong> {asset.purchaseDate}</p>
          <p><strong>Vendor:</strong> {asset.vendor}</p>
          <p><strong>Department:</strong> {asset.department}</p>
          <p className="md:col-span-2"><strong>Description:</strong> {asset.description}</p>
        </div>
        <div className="mt-6 flex gap-3">
          <Link to={`/assets/${id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">Edit Asset</Link>
          <Link to="/assets" className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition">Back to List</Link>
        </div>
      </div>
    </Layout>
  );
}
