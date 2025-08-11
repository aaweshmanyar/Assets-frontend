import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function AssetList() {
  const assets = [
    { id: 1, name: "Dell Laptop", type: "Hardware", status: "Active", assignedTo: "John Doe" },
    { id: 2, name: "MS Office License", type: "Software", status: "In Use", assignedTo: "Alice Smith" },
    { id: 3, name: "Projector", type: "Hardware", status: "In Repair", assignedTo: "Maintenance" }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 border-b pb-3">📦 Asset List</h2>

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
                  <td className="px-4 py-3 font-medium">{asset.name}</td>
                  <td className="px-4 py-3">{asset.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${asset.status === "Active" ? "bg-green-100 text-green-700" : asset.status === "In Repair" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{asset.assignedTo}</td>
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
      </div>
    </Layout>
  );
}
