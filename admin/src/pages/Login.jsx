import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/auth`,
          { withCredentials: true }
        );
        setIsLoggedIn(data.success || false);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && isLoggedIn) {
      navigate("/");
    }
  }, [loading, isLoggedIn, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        { name, email, password },
        { withCredentials: true }
      );

      if (data.success) {
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Checking login...</p>;

  return (
    <section className="w-full min-h-screen bg-[#1a1a1d] flex flex-col items-center justify-center text-white px-6 py-12">
      <div className="text-center max-w-2xl space-y-4 mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">Admin Login</h2>
        <p className="text-gray-400 text-base md:text-lg">
          Welcome back! Enter your credentials to access the{" "}
          <span className="text-pink-500 font-medium">admin dashboard</span>.
        </p>
      </div>
      <div className="w-full max-w-md bg-[#1c1c1f] p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-2 text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181b] text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-300">Email</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181b] text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-300">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#18181b] text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-600 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-800/40 font-semibold text-white transition duration-300"
          >
            <FaPaperPlane size={18} /> Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
