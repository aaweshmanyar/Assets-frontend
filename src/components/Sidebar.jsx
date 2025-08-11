import React, { useState } from "react";
import { FiMenu, FiX, FiList, FiGrid, FiUser, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { title: "List of Assets", icon: <FiList />, link: "/" },
    { title: "Add Assets", icon: <FiInfo />, link: "/add-assets" }, // updated route
    { title: "Assets List", icon: <FiInfo />, link: "/assets" }, // updated route
    { title: "QR Code Generated", icon: <FiGrid />, link: "/assets-qr" },
    { title: "User Information", icon: <FiUser />, link: "/user-info" },
 
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4 bg-white shadow">
        <button onClick={() => setOpen(!open)} className="text-indigo-600">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-indigo-600 to-purple-700 text-white fixed lg:static  
        h-screen w-64 transform 
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 
        transition-transform duration-300 z-50`}
      >
        <div className="p-6 font-bold text-xl tracking-wide border-b border-indigo-400">
          🏷 Asset Manager
        </div>
        <nav className="p-4 space-y-3">
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
      </aside>
    </>
  );
}
