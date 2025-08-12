import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

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


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, [])

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center w-full max-w-sm mx-auto">
        <p className="text-gray-500">No user info found. Please login.</p>
      </div>
    );
  }


  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between relative">
      <h1 className="text-xl font-semibold text-indigo-600">Dashboard</h1>
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        <span
          className="text-gray-700 font-medium cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user.username}
        </span>
        <img
          src="https://robohash.org/JohnDoe?set=set4"
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
