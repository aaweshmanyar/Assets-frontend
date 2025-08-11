import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-indigo-600">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">John Doe</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          className="w-10 h-10 rounded-full border-2 border-indigo-500"
        />
      </div>
    </header>
  );
}
