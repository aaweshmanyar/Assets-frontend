import React from 'react';
import Layout from '../components/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back!</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 border-indigo-500">
          <h3 className="text-lg font-semibold mb-2">Total Assets</h3>
          <p className="text-3xl font-bold text-indigo-600">120</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 border-purple-500">
          <h3 className="text-lg font-semibold mb-2">QR Codes Generated</h3>
          <p className="text-3xl font-bold text-purple-600">87</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 border-pink-500">
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          <p className="text-3xl font-bold text-pink-600">55</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition border-t-4 border-green-500">
          <h3 className="text-lg font-semibold mb-2">Active Assets</h3>
          <p className="text-3xl font-bold text-green-600">94</p>
        </div>
      </div>
    </Layout>
  );
}
