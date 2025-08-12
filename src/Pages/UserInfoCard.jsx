import React, { useEffect, useState } from "react";
import { FiUser, FiMail, FiHash } from "react-icons/fi";
import Layout from "../components/Layout";

export default function UserInfoCard() {
  const [user, setUser] = useState(null);

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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-md hover:shadow-lg transition w-full max-w-md mx-auto">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <img
          src={`https://ui-avatars.com/api/?name=${user.username}&background=4F46E5&color=fff&size=100`}
          alt="User Avatar"
          className="w-24 h-24 rounded-full shadow-md border-4 border-white"
        />
        <h3 className="text-xl font-bold text-gray-800 mt-4 flex items-center gap-2">
          <FiUser className="text-indigo-600" /> {user.username}
        </h3>
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <FiMail className="text-indigo-500 text-lg" />
          <span className="font-medium">Email:</span>
          <span className="text-gray-600">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <FiHash className="text-indigo-500 text-lg" />
          <span className="font-medium">User ID:</span>
          <span className="text-gray-600">{user.id}</span>
        </div>
      </div>

      {/* Status or Action Button (Optional) */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => alert(`Hello, ${user.username}!`)}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          View Profile
        </button>
      </div>
    </div>
    </Layout>
  );
}
