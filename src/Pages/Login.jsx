import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [form, setForm] = useState({ usernameOrEmail: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://assetsbackend-0ou8.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store JWT token and user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("lastActivity", Date.now());

      // ✅ Show success toast notification
      toast.success(
        "✅ Login Successfully !",
        {
          position: "top-right",
          autoClose: 5000, // Show for 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Navigate to dashboard after a short delay so user sees it
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Network error, please try again.");
    }
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="usernameOrEmail"
              placeholder="Email or Username"
              value={form.usernameOrEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
