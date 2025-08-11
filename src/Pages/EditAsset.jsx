import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function EditAsset() {
  const { id } = useParams();

  // Prefilled asset data (simulated, should come from DB/API)
  const [formData, setFormData] = useState({
    assetName: "Dell Laptop",
    assetType: "Hardware",
    serialNumber: "DL-12345",
    purchaseDate: "2023-04-10",
    purchaseCost: "1200",
    vendor: "Dell Inc",
    department: "IT",
    assignedTo: "John Doe",
    status: "Active",
    warrantyExpiry: "2025-04-10",
    description: "High performance laptop.",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] }); // file input handling
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send updated formData to backend API here
    console.log("Updated Asset Data:", formData);
    alert("Asset updated successfully!");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">
          ✏️ Edit Asset #{id}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Asset Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Asset Name
            </label>
            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              placeholder="Enter asset name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Asset Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Asset Type
            </label>
            <select
              name="assetType"
              value={formData.assetType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            >
              <option>Hardware</option>
              <option>Software</option>
              <option>Furniture</option>
              <option>Vehicle</option>
              <option>Other</option>
            </select>
          </div>

          {/* Serial Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Serial Number / Asset ID
            </label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              placeholder="Enter serial number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Purchase Date & Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Purchase Date
              </label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Purchase Cost
              </label>
              <input
                type="number"
                name="purchaseCost"
                value={formData.purchaseCost}
                onChange={handleChange}
                placeholder="Enter cost"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          </div>

          {/* Vendor & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Vendor / Supplier
              </label>
              <input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                placeholder="Enter vendor name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option>IT</option>
                <option>HR</option>
                <option>Finance</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Assigned To (Employee)
            </label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              placeholder="Enter employee name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Status & Warranty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Asset Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>In Repair</option>
                <option>Retired</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Warranty Expiry Date
              </label>
              <input
                type="date"
                name="warrantyExpiry"
                value={formData.warrantyExpiry}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description / Notes
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter any notes..."
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            ></textarea>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Asset Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            {formData.image && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {formData.image.name || "Existing image"}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              Update Asset
            </button>
          </div>
        </form>

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
