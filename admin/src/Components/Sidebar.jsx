import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaComments,
  FaEnvelope,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaHome,
  FaProjectDiagram,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

const Sidebar = ({ onSelect }) => {
  const { setIsLoggedIn, setCommentsData, setProjectsData, setContactsData } = useContext(AppContext);
  const [openBlog, setOpenBlog] = useState(false);
  const [active, setActive] = useState("home");
  const navigate = useNavigate();
  const handleSelect = (page) => {
    setActive(page);
    onSelect(page);
  };
  // logout function
 const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsLoggedIn(false);
        setCommentsData([]);
        setProjectsData([]);
        setContactsData([]);
        toast.success("Logout successful!");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong during logout");
    }
  };


  return (
    <div className="w-72 h-screen bg-[#1a1a1d] text-white flex flex-col
     justify-between shadow-xl border-r border-[#2e2e33]">
      {/*Header*/}
      <div>
        <div className="px-6 py-6 border-b border-[#2e2e33]">
          <h1 className="text-2xl font-extrabold tracking-wide">
            Admin <span className="text-pink-500">Panel</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Manage your content</p>
        </div>
        {/* Navigation */}
        <div className="flex flex-col px-4 py-6 space-y-6">
          {/* Home */}
          <button
            onClick={() => handleSelect("home")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all
              ${active === "home"
                ? "bg-[#232326] text-pink-500"
                : "hover:bg-[#232326] hover:text-pink-500"
              }`}
          >
            <FaHome />
            <span className="font-medium">Home</span>
          </button>
          {/* Blog Dropdown */}
          <div>
            <button
              onClick={() => setOpenBlog(!openBlog)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-xl transition-all
                ${openBlog
                  ? "bg-[#232326] text-pink-500"
                  : "hover:bg-[#232326] hover:text-pink-500"
                }`}
            >
              <span className="flex items-center space-x-3">
                <FaProjectDiagram className="text-lg" />
                <span className="font-medium">Project</span>
              </span>
              <FiChevronRight
                className={`transition-transform ${openBlog ? "rotate-90 text-pink-500" : "text-gray-400"
                  }`}
              />
            </button>

            {/* Blog Submenu */}
            {openBlog && (
              <div className="ml-8 mt-3 flex flex-col space-y-2">
                <button
                  onClick={() => handleSelect("all-project")}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-all
                    ${active === "all-project"
                      ? "bg-[#232326] text-pink-500"
                      : "hover:bg-[#232326] hover:text-pink-500"
                    }`}
                >
                  <FaList />
                  <span>All</span>
                </button>
                <button
                  onClick={() => handleSelect("create-project")}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-all
                    ${active === "create-project"
                      ? "bg-[#232326] text-pink-500"
                      : "hover:bg-[#232326] hover:text-pink-500"
                    }`}
                >
                  <FaPlus />
                  <span>Create</span>
                </button>
              </div>
            )}
          </div>
          {/* Comments */}
          <button
            onClick={() => handleSelect("comments")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all
              ${active === "comments"
                ? "bg-[#232326] text-pink-500"
                : "hover:bg-[#232326] hover:text-pink-500"
              }`}
          >
            <FaComments />
            <span className="font-medium">Comments</span>
          </button>
          {/* Contact */}
          <button
            onClick={() => handleSelect("contact")}
            className={`flex items-center space-x-3 px-3 py-2 rounded-xl transition-all
              ${active === "contact"
                ? "bg-[#232326] text-pink-500"
                : "hover:bg-[#232326] hover:text-pink-500"
              }`}
          >
            <FaEnvelope />
            <span className="font-medium">Contact</span>
          </button>
        </div>
      </div>
      {/*Logout button*/}
      <div className="p-4 border-t border-[#2e2e33]">
        <button
          onClick={handleLogout} // ✅ directly call logout
          className="flex items-center space-x-3 w-full px-3 py-2 rounded-xl 
                     hover:bg-[#232326] hover:text-pink-500 transition-all font-medium"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
