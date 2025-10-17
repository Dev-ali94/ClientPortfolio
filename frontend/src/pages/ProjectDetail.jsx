import React, { useState, useEffect, useContext, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import CommentSection from "../components/CommentSection";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { slug } = useParams();
  const { projectsData } = useContext(AppContext);
  const project = projectsData.find((p) => p.slug === slug);

  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const containerRef = useRef(null);

  // Hero
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroButtonsRef = useRef([]);

  // Sections
  const overviewRef = useRef(null);
  const processRef = useRef(null);
  const resultRefs = useRef([]);

  // Sidebar desktop
  const writerRef = useRef(null);
  const navRef = useRef(null);
  const relatedRef = useRef(null);

  // Sidebar mobile
  const mobileSidebarRef = useRef(null);
  const mobileBtnRef = useRef(null);

  // Scroll active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["overview", "process", "results", "comments"];
      let current = "overview";
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations on scroll
  useEffect(() => {
    if (!project) return;

    // Hero animations
    gsap.from(heroTitleRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: heroTitleRef.current,
        start: "top 90%",
      },
    });

    gsap.from(heroDescRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: heroDescRef.current,
        start: "top 90%",
      },
    });

    gsap.from(heroButtonsRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: heroButtonsRef.current[0],
        start: "top 90%",
      },
    });

    // Content sections
    gsap.utils.toArray([overviewRef.current, processRef.current]).forEach((el) => {
      if (el) {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        });
      }
    });

    resultRefs.current.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 60,
        scale: 0.85,
        duration: 1,
        delay: i * 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
      });
    });

    // Desktop sidebar fade-in
    [writerRef.current, navRef.current, relatedRef.current].forEach((el) => {
      if (el) {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        });
      }
    });

    ScrollTrigger.refresh();
  }, [project]);

  // Mobile sidebar animation
  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(mobileSidebarRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(mobileSidebarRef.current, {
        x: "-100%",
        duration: 0.6,
        ease: "power3.in",
      });
    }
  }, [isSidebarOpen]);

  // Mobile button entrance animation
  useEffect(() => {
    gsap.from(mobileBtnRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
  }, []);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[rgb(32,32,35)] flex items-center justify-center text-gray-400">
        Loading project...
      </div>
    );
  }

  return (
    <>
      {/* 🍔 Floating Mobile Sidebar Toggle */}
      <button
        ref={mobileBtnRef}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`lg:hidden fixed bottom-6 -right-1 -translate-x-1/2 z-50 h-15 w-15 rounded-full 
          bg-pink-600 text-white shadow-2xl backdrop-blur-md flex flex-col justify-center items-center transition-all duration-500 hover:scale-110 ${
          isSidebarOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        <div className="w-6 h-1 bg-white mb-1 rounded-full"></div>
        <div className="w-6 h-1 bg-white mb-1 rounded-full"></div>
        <div className="w-6 h-1 bg-white rounded-full"></div>
      </button>

      {/* 🌈 Mobile Sidebar Panel */}
      <div
        ref={mobileSidebarRef}
        className="fixed top-0 left-0 h-full w-72 bg-[rgba(40,40,45,0.8)] 
        backdrop-blur-xl text-gray-200 z-50 transform -translate-x-full flex flex-col shadow-2xl border-r border-white/10"
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:text-pink-600 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          {/* Writer */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <FaUser className="text-pink-600" /> Written by Duaa
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Content Writer & SEO Specialist passionate about creating strategies that drive traffic and results.
            </p>
            <div className="flex gap-4 mt-4 text-xl">
              {[FaGithub, FaLinkedin, FaTwitter, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="hover:text-pink-600 transform hover:scale-125 transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Page Nav */}
          <nav className="bg-white/10 rounded-2xl p-4 shadow-lg">
            <h4 className="text-lg uppercase text-white font-bold mb-3">
              On this page
            </h4>
            <ul className="space-y-3 text-sm">
              {["overview", "process", "results", "comments"].map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`transition ${
                      activeSection === id
                        ? "text-pink-500 font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Related Work */}
          {project.relatedArticles?.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
              <h4 className="text-lg font-bold text-white mb-4">
                Related work
              </h4>
              <div className="space-y-3">
                {project.relatedArticles.map((related) => (
                  <a
                    key={related._id}
                    href={related.link}
                    className="block text-gray-400 hover:text-pink-500 transition transform hover:translate-x-1"
                  >
                    {related.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🟣 Hero Section */}
      <div
        ref={containerRef}
        className="w-full bg-[rgb(32,32,35)] text-gray-200"
      >
        <div
          className="hero relative bg-center bg-no-repeat min-h-[60vh] px-6 text-center flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 max-w-3xl mx-auto py-10">
            <h1
              ref={heroTitleRef}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              {project.hero?.title}
            </h1>
            <p
              ref={heroDescRef}
              className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base"
            >
              {project.hero?.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {project.hero?.buttons?.map((button, i) => (
                <a
                  key={button._id}
                  ref={(el) => (heroButtonsRef.current[i] = el)}
                  href={button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 px-5 py-2 rounded-lg font-medium hover:bg-pink-700 transition text-sm sm:text-base transform hover:scale-105"
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 📄 Main Layout */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 px-4 sm:px-6 py-12 sm:py-16">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block lg:w-1/4 space-y-8 sticky top-24 self-start">
            <div
              ref={writerRef}
              className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <FaUser className="text-pink-600" /> Written by Duaa
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Content Writer & SEO Specialist passionate about creating strategies that drive traffic and results.
              </p>
              <div className="flex gap-4 mt-4 text-xl">
                {[FaGithub, FaLinkedin, FaTwitter, FaInstagram].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="hover:text-pink-600 transform hover:scale-125 transition"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>

            <nav
              ref={navRef}
              className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg"
            >
              <h4 className="text-lg uppercase text-white font-bold mb-3">
                On this page
              </h4>
              <ul className="space-y-3 text-sm">
                {["overview", "process", "results", "comments"].map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`transition ${
                        activeSection === id
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

            {project.relatedArticles?.length > 0 && (
              <div
                ref={relatedRef}
                className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg"
              >
                <h4 className="text-lg font-bold text-white mb-4">
                  Related work
                </h4>
                <div className="space-y-3">
                  {project.relatedArticles.map((related) => (
                    <a
                      key={related._id}
                      href={related.link}
                      className="block text-gray-400 hover:text-pink-600 transition transform hover:translate-x-1"
                    >
                      {related.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 space-y-16">
            <section id="overview" ref={overviewRef}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Project Overview
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {project.overview?.content}
              </p>
            </section>

            {project.process && (
              <section id="process" ref={processRef}>
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

            {project.results?.length > 0 && (
              <section id="results">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Results
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {project.results.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => (resultRefs.current[index] = el)}
                      className="project-card bg-[rgb(40,40,45)] p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105"
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

            <section id="comments" className="pb-10">
              <CommentSection />
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProjectDetail;
