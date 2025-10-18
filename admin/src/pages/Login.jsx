import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    setIsLoggedIn,
    isLoggedIn,
    userData,
    getAuthState,
    fetchComments,
    fetchProjects,
    fetchContacts,
  } = useContext(AppContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`,
        { name, email, password }
      );
      if (data.success) {
        toast.success(data.message)
        await getAuthState();
        if (!userData?.verified) {
          toast.error("Your account is not verified!");
          setIsLoggedIn(false);
          return navigate("/login");
        }
        await fetchComments();
        await fetchProjects();
        await fetchContacts();

        navigate("/"); 
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  useEffect(() => {
    if (isLoggedIn && userData?.verified) {
      navigate("/");
    }
  }, [isLoggedIn, userData, navigate]);

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
              required
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
              required
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
              required
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
