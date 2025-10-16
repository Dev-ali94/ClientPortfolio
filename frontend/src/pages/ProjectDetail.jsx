import React, { useState, useEffect, useContext, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaUser } from "react-icons/fa";
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
  const containerRef = useRef(null);

  // Hero
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroButtonsRef = useRef([]);

  // Overview / Process
  const overviewRef = useRef(null);
  const processRef = useRef(null);

  // Sidebar
  const writerRef = useRef(null);
  const socialRefs = useRef([]);
  const navRef = useRef(null);
  const relatedRef = useRef(null);

  // Results
  const resultRefs = useRef([]);

  // Sidebar scroll highlight
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

  // GSAP Animations
  useEffect(() => {
    if (!project) return;

    // Hero Title
    gsap.from(heroTitleRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: heroTitleRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Hero Description
    gsap.from(heroDescRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.9,
      duration: 1,
      delay: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: heroDescRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Hero Buttons
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
        toggleActions: "play none none reverse",
      },
    });

    // Overview
    gsap.from(overviewRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: overviewRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Process
    if (processRef.current) {
      gsap.from(processRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Writer Box
    if (writerRef.current) {
      gsap.from(writerRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: writerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Social Icons
      gsap.from(socialRefs.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        rotation: -5,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: writerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Navigation Box
    if (navRef.current) {
      gsap.from(navRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: navRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Related Work Box
    if (relatedRef.current) {
      gsap.from(relatedRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: relatedRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Result Cards
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
          toggleActions: "play none none reverse",
        },
      });
    });

    ScrollTrigger.refresh();
  }, [project]);

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[rgb(32,32,35)] flex items-center justify-center text-gray-400">
        Loading project...
      </div>
    );
  }

  return (
    <>
    <div ref={containerRef} className="w-full bg-[rgb(32,32,35)] text-gray-200 ">
      {/* Hero Section */}
      <div
        className="hero relative bg-center bg-no-repeat min-h-[60vh]
         px-6 text-center flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${project.image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto py-10">
          <h1 ref={heroTitleRef} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {project.hero?.title}
          </h1>
          <p ref={heroDescRef} className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
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

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 px-4 sm:px-6 py-12 sm:py-16">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-1/4 space-y-8 sticky top-24 self-start">
          {/* Writer */}
          <div ref={writerRef} className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg">
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
                  className="hover:text-pink-600 transform hover:scale-110 transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg">
            <h4 className="text-lg uppercase text-white font-bold mb-3">On this page</h4>
            <ul className="space-y-3 text-sm">
              {["overview", "process", "results", "comments"].map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`transition ${
                      activeSection === id ? "text-pink-600 font-semibold" : "text-gray-400 hover:text-white"
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
            <div ref={relatedRef} className="bg-[rgb(40,40,45)] rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-white mb-4">Related work</h4>
              <div className="space-y-3">
                {project.relatedArticles.map((related) => (
                  <a
                    key={related._id}
                    href={related.link}
                    className="block text-gray-400 hover:text-pink-600 transition transform hover:scale-105"
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
          {/* Overview */}
          <section id="overview" ref={overviewRef}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Project Overview</h2>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{project.overview?.content}</p>
          </section>

          {/* Process */}
          {project.process && (
            <section id="process" ref={processRef}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Process</h2>
              <ul className="text-gray-400 space-y-2 text-sm sm:text-base">
                {project.process.map((step, index) => (
                  <li key={index}>{step.title || step}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Results */}
          {project.results?.length > 0 && (
            <section id="results">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Results</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {project.results.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => (resultRefs.current[index] = el)}
                    className="project-card bg-[rgb(40,40,45)] p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105"
                  >
                    <h3 className="text-lg font-semibold text-pink-600 mb-2">{item.title}</h3>
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
    <Footer />
    </>
  );
};

export default ProjectDetail;
