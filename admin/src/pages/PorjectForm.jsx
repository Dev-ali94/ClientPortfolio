// ProjectForm.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  FaPaperPlane,
  FaClipboardList,
  FaCheckCircle,
  FaBookOpen,
  FaHeading,
  FaImage,
  FaPlus,
  FaAlignLeft,
} from "react-icons/fa";

const ProjectForm = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [hero, setHero] = useState({title: "", description: "", buttons: [{ text: "", link: "" }],});
  const [overview, setOverview] = useState({ content: "" });
  const [process, setProcess] = useState([{ title: "" }]);
  const [results, setResults] = useState([{ title: "", desc: "" }]);
  const [relatedArticles, setRelatedArticles] = useState([{ title: "", link: "" },]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/project/create-project`, {
        title,
        image,
        description,
        hero,
        overview,
        process,
        results,
        relatedArticles,
      });
      setTitle("");
      setImage("");
      setDescription("");
      setHero({title: "", description: "", buttons: [{ text: "", link: "" }],});
      setOverview({ content: "" });
      setProcess([{ title: "" }]);
      setResults([{ title: "", desc: "" }]);
      setRelatedArticles([{ title: "", link: "" }]);

      console.log("Project created successfully");
    } catch (error) {
      console.error("Error creating project:", error);
      alert(error.response?.data?.message || "Error creating project");
    }
  };
  // Upload image
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto space-y-10 bg-[#1a1a1d] text-white p-8 rounded-2xl shadow-2xl shadow-black/50 border border-[#2e2e32]"
    >
      {/*  Basic Info */}
      <section className="bg-[#232326] border border-[#2e2e32] rounded-2xl p-6 space-y-3 shadow-lg shadow-black/30">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <FaHeading className="text-pink-500" /> Project Card
        </h2>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
        />

        {/* Image Upload */}
        <div className="flex items-center justify-center w-full">
          <div className="w-full text-center">
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-600 rounded-2xl bg-[#1a1a1d] hover:border-pink-600 transition"
            >
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-gray-400 text-sm">Uploading...</p>
                </div>
              ) : image ? (
                <img
                  src={image}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-3 3m3-3l3 3"
                    />
                  </svg>
                  <p className="text-gray-400 text-sm">
                    Click to upload image
                  </p>
                </>
              )}
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
      </section>

      {/* Hero Section */}
      <section className="bg-[#232326] border border-[#2e2e32] rounded-2xl p-6 shadow-lg shadow-black/30">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <FaImage className="text-pink-500" /> Hero Section
        </h2>

        <input
          type="text"
          placeholder="Hero Title"
          value={hero.title}
          onChange={(e) => setHero({ ...hero, title: e.target.value })}
          className="w-full px-4 py-3 mb-2 rounded-lg bg-[#1a1a1d] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
        />

        <textarea
          placeholder="Hero Description"
          rows="3"
          value={hero.description}
          onChange={(e) => setHero({ ...hero, description: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
        />

        <h3 className="text-sm font-medium mt-3 text-gray-300">Hero Buttons</h3>
        {hero.buttons.map((btn, i) => (
          <div
            key={i}
            className="flex gap-3 items-center border border-[#2e2e32] rounded-lg p-3 mt-2 bg-[#1a1a1d]"
          >
            <input
              type="text"
              placeholder="Button Text"
              value={btn.text}
              onChange={(e) => {
                const updated = [...hero.buttons];
                updated[i].text = e.target.value;
                setHero({ ...hero, buttons: updated });
              }}
              className="flex-1 px-3 py-2 rounded bg-[#232326] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            <input
              type="text"
              placeholder="Button Link"
              value={btn.link}
              onChange={(e) => {
                const updated = [...hero.buttons];
                updated[i].link = e.target.value;
                setHero({ ...hero, buttons: updated });
              }}
              className="flex-1 px-3 py-2 rounded bg-[#232326] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setHero({
              ...hero,
              buttons: [...hero.buttons, { text: "", link: "" }],
            })
          }
          className="mt-3 text-xs px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition"
        >
          <FaPlus className="inline mr-1" /> Add Button
        </button>
      </section>

      {/*  Overview */}
      <section className="bg-[#232326] border border-[#2e2e32] rounded-2xl p-6 shadow-lg shadow-black/30">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <FaAlignLeft className="text-pink-500" /> Overview
        </h2>
        <textarea
          placeholder="Project Overview..."
          rows="4"
          value={overview.content}
          onChange={(e) => setOverview({ content: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
        />
      </section>

      {/* Process */}
      <section className="bg-[#232326] border border-[#2e2e32] rounded-2xl p-6 shadow-lg shadow-black/30">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <FaClipboardList className="text-pink-500" /> Process
        </h2>
        {process.map((step, i) => (
          <div key={i} className="border border-[#2e2e32] rounded-lg p-3 mb-3 bg-[#1a1a1d]">
            <input
              type="text"
              placeholder={`Step ${i + 1}`}
              value={step.title}
              onChange={(e) => {
                const updated = [...process];
                updated[i].title = e.target.value;
                setProcess(updated);
              }}
              className="w-full px-3 py-2 rounded bg-[#232326] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setProcess([...process, { title: "" }])}
          className="text-xs px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition"
        >
          <FaPlus className="inline mr-1" /> Add Step
        </button>
      </section>

      {/* Results */}
      <section className="bg-[#232326] border border-[#2e2e32] rounded-2xl p-6 shadow-lg shadow-black/30">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <FaCheckCircle className="text-pink-500" /> Results
        </h2>
        {results.map((res, i) => (
          <div key={i} className="border border-[#2e2e32] rounded-lg p-3 mb-3 bg-[#1a1a1d]">
            <input
              type="text"
              placeholder="Result Title"
              value={res.title}
              onChange={(e) => {
                const updated = [...results];
                updated[i].title = e.target.value;
                setResults(updated);
              }}
              className="w-full px-3 py-2 mb-2 rounded bg-[#232326] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            <input
              type="text"
              placeholder="Result Description"
              value={res.desc}
              onChange={(e) => {
                const updated = [...results];
                updated[i].desc = e.target.value;
                setResults(updated);
              }}
              className="w-full px-3 py-2 rounded bg-[#232326] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setResults([...results, { title: "", desc: "" }])}
          className="text-xs px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition"
        >
          <FaPlus className="inline mr-1" /> Add Result
        </button>
      </section>

      {/*  Related Articles */}
      <section className="bg-[#232326] border border-[#2e2e32] rounded-2xl p-6 shadow-lg shadow-black/30">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <FaBookOpen className="text-pink-500" /> Related Articles
        </h2>
        {relatedArticles.map((art, i) => (
          <div key={i} className="border border-[#2e2e32] rounded-lg p-3 mb-3 bg-[#1a1a1d]">
            <input
              type="text"
              placeholder="Article Title"
              value={art.title}
              onChange={(e) => {
                const updated = [...relatedArticles];
                updated[i].title = e.target.value;
                setRelatedArticles(updated);
              }}
              className="w-full px-3 py-2 mb-2 rounded bg-[#232326] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
            <input
              type="text"
              placeholder="Article Link"
              value={art.link}
              onChange={(e) => {
                const updated = [...relatedArticles];
                updated[i].link = e.target.value;
                setRelatedArticles(updated);
              }}
              className="w-full px-3 py-2 rounded bg-[#232326] border border-[#2e2e32] text-sm focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setRelatedArticles([...relatedArticles, { title: "", link: "" }])
          }
          className="text-xs px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 transition"
        >
          <FaPlus className="inline mr-1" /> Add Article
        </button>
      </section>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold tracking-wide shadow-lg shadow-pink-700/40 transition"
      >
        <FaPaperPlane className="inline mr-2" /> Submit Project
      </button>
    </form>
  );
};

export default ProjectForm;
