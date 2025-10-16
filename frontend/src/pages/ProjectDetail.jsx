// ProjectDetail.jsx
import React, { useState, useEffect, useContext } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import CommentSection from "../components/CommentSection";

const ProjectDetail = () => {
  const { slug } = useParams(); // ✅ get slug from URL
  const { projectsData } = useContext(AppContext);

  // find the project by slug
  const project = projectsData.find((p) => p.slug === slug);

  const [activeSection, setActiveSection] = useState("overview");

  // Track scroll position for sidebar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "process", "results", "comments"];
      let current = "overview";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 150) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[rgb(32,32,35)] flex items-center justify-center text-gray-400">
        Loading project...
      </div>
    );
  }

  return (
    <div className="w-full bg-[rgb(32,32,35)] text-gray-200">
      {/* Hero Section */}
 <div className="bg-[rgb(40,40,45)] py-16 px-6 text-center">
  {/* Title */}
  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
    {project.hero?.title}
  </h1>

  {/* Description */}
  <p className="text-gray-400 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
    {project.hero?.description}
  </p>

  {/* Image (optional, center-aligned) */}
  {project.hero?.image && (
    <div className="flex justify-center mb-6">
      <img
        src={project.hero.image}
        alt={project.hero.title}
        className="rounded-xl shadow-lg max-h-72 object-contain"
      />
    </div>
  )}

  {/* Buttons */}
  <div className="flex flex-wrap justify-center gap-4">
    {project.hero?.buttons?.map((button) => (
      <a
        key={button._id}
        href={button.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-600 px-5 py-2 rounded-lg font-medium hover:bg-pink-700 transition text-sm sm:text-base"
      >
        {button.text}
      </a>
    ))}
  </div>
</div>


      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 px-4 sm:px-6 py-12 sm:py-16">
        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:block lg:w-1/4 space-y-8 sticky top-24 self-start">
          <div className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg"> <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4"> 
            <FaUser className="text-pink-600" /> Written by Duaa </h3> 
            <p className="text-gray-400 text-sm leading-relaxed"> Content Writer & SEO Specialist passionate 
              about creating strategies that drive traffic and results. </p> 
              <div className="flex gap-4 mt-4 text-xl"> 
                <a href="#" className="hover:text-pink-600"> <FaGithub /> </a>
                 <a href="#" className="hover:text-pink-600"> <FaLinkedin /> </a> 
                 <a href="#" className="hover:text-pink-600"> <FaTwitter /> </a> 
                 <a href="#" className="hover:text-pink-600"> <FaInstagram /> </a> 
                 </div> 
                 </div>
          {/* Navigation */}
          <nav className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg">
            <h4 className="text-sm uppercase text-gray-400 mb-3">
              On this page
            </h4>
            <ul className="space-y-3 text-sm">
              {["overview", "process", "results", "comments"].map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`transition ${activeSection === id
                        ? "text-pink-600 font-semibold"
                        : "text-gray-400 hover:text-white"
                      }`}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {project.relatedArticles && project.relatedArticles.length > 0 && (
            <div className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-white mb-4"> Related Articles </h4>
              <div className="space-y-3">
                {project.relatedArticles.map((related) =>
                (<a key={related._id} href={related.link} className="block text-gray-400 
       hover:text-pink-600 transition" > {related.title} </a>))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4 space-y-16">
          {/* Overview */}
          <section id="overview">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Project Overview
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              {project.overview?.description}
            </p>
          </section>

          {/* Process */}
          {project.process && (
            <section id="process">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Process
              </h2>
              <ul className="text-gray-400 space-y-2 text-sm sm:text-base">
                {project.process.map((step, index) => (
                  <li key={index}>{step.title || step}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <section id="results">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Results
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {project.results.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[rgb(40,40,45)] p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                  >
                    <h3 className="text-lg font-semibold text-pink-600 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Comments */}
          <section id="comments">
            <CommentSection />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetail;
