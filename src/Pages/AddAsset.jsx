import React, { useState } from "react";
import Layout from "../components/Layout";

export default function AddAsset() {
  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "",
    serialNumber: "",
    purchaseDate: "",
    purchaseCost: "",
    vendor: "",
    department: "",
    assignedTo: "",
    mobileNumber: "",      // <-- Added mobile number field
    status: "",
    warrantyExpiry: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Send notification via your backend
  const sendPushNotification = async () => {
    try {
      // If you ever want to add SMS support, pass mobileNumber in this payload and handle it on backend
      const res = await fetch('http://localhost:5000/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Asset Created ✅',
          message: `Dear User, thanks for creating the asset "${formData.assetName}" on our platform!`,
          mobileNumber: formData.mobileNumber     // Optional: send to backend for SMS
        }),
      });
      const data = await res.json();
      console.log("Notification sent:", data);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // Submit form and create asset + send notification
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for backend (Remove image/file in this demo)
    const payload = { ...formData };
    delete payload.image; // Not handling file upload in this demo

    try {
      const assetRes = await fetch('http://localhost:5000/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (assetRes.ok) {
        alert("Asset added successfully!");

        await sendPushNotification();

        setFormData({
          assetName: "",
          assetType: "",
          serialNumber: "",
          purchaseDate: "",
          purchaseCost: "",
          vendor: "",
          department: "",
          assignedTo: "",
          mobileNumber: "",
          status: "",
          warrantyExpiry: "",
          description: "",
          image: null,
        });
      } else {
        alert("Failed to add asset!");
      }
    } catch (error) {
      alert("Network error!");
    }
  };


  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 border-b pb-3">
          ➕ Add New Asset
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
              <option value="">Select asset type</option>
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
                <option value="">Select department</option>
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
                <option value="">Select status</option>
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
          </div>


          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">User Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              Save Asset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
