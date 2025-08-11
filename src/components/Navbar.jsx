import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    // Clear auth/session data if stored
    localStorage.removeItem("token"); // Example: JWT token removal
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between relative">
      <h1 className="text-xl font-semibold text-indigo-600">Dashboard</h1>
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        <span
          className="text-gray-700 font-medium cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          John Doe
        </span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User avatar"
          className="w-10 h-10 rounded-full border-2 border-indigo-500 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && (
          <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg w-40 py-2 border">
            <button
              onClick={handleLogout}
              className="cursor-pointer block px-4 py-2 w-full text-left hover:bg-red-100 text-red-600 font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
