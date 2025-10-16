import React, { useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { FaEnvelope, FaCommentDots, FaClock, FaTrash } from "react-icons/fa";


const ContactSection = () => {
  const { contactsData, setContactsData } = useContext(AppContext);
  //  Delete contact
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contact/${id}`);
      if (res.data.success) {
        alert("Contact deleted successfully");
        setContactsData((prev) => prev.filter((contact) => contact._id !== id));
      } else {
        alert(res.data.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Delete error:", error.message);
      alert("Something went wrong while deleting");
    }
  };
  return (
    <div className="w-[75vw] h-full bg-[#1a1a1d] text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-500">Contact Messages</h2>
      {contactsData.length === 0 ? (
        <p className="text-gray-400">No contacts yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {contactsData.map((contact) => (
            <div
              key={contact._id}
              className="rounded-xl bg-[#232326] border border-[#2e2e32] p-5 flex 
              justify-between items-start"
            >
              {/* Contact Card */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full
                 bg-pink-600 text-white font-bold">
                  {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-lg">{contact.name}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                    <FaEnvelope className="text-pink-500" />
                    {contact.email}
                  </p>
                  <p className="text-gray-300 mt-2 flex items-start gap-2">
                    <FaCommentDots className="text-pink-500 mt-1" />
                    {contact.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                    <FaClock className="text-pink-500" />
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(contact._id)}
                className="text-red-500 hover:text-red-700 ml-4"
                title="Delete Contact"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactSection;
