import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiList,
  FiPlusCircle,
  FiGrid,
  FiUser,
  FiLogOut,
  FiPackage
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", icon: <FiGrid size={18} />, link: "/" },
    { title: "Add Assets", icon: <FiPlusCircle size={18} />, link: "/add-assets" },
    { title: "List of Assets", icon: <FiPackage size={18} />, link: "/assets" },
    { title: "QR Code Generated", icon: <FiList size={18} />, link: "/assets-qr" },
    { title: "User Information", icon: <FiUser size={18} />, link: "/user" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("lastActivity");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden p-4 bg-white shadow">
        <button onClick={() => setOpen(!open)} className="text-indigo-600">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside
        className={`bg-gradient-to-b from-indigo-600 to-purple-700 text-white fixed lg:static  
        h-screen w-64 flex flex-col justify-between
        transform ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
        transition-transform duration-300 z-50`}
      >
        {/* Logo / Title */}
        <div>
          <div className="p-6 font-bold text-xl tracking-wide border-b border-indigo-400">
            🏷 Asset Manager
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-500 transition"
                onClick={() => setOpen(false)}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-indigo-400">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-3 w-full rounded-lg hover:bg-red-500 transition"
          >
            <FiLogOut size={18} />
            <span className="cursor-pointer">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
