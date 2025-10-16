import { useState, useEffect, useRef, useContext } from "react";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  

  const { projectsData } = useContext(AppContext);

  // Detect touch devices
  useEffect(() => {
    const checkTouch = () =>
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const handleTap = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!projectsData || projectsData.length === 0) return;

    // Animate heading separately
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate paragraph separately
    gsap.from(paragraphRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.85,
      duration: 1,
      ease: "back.out(1.7)",
      delay: 0.2, // slight delay after heading
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate project cards
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.85, rotation: -2 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, [projectsData]);

  return (
    <div
      id="project"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
       py-12 md:py-16 flex flex-col items-center gap-y-10 bg-[rgb(32,32,35)]"
    >
      {/* Heading */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-2xl">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
        >
          My Latest Work
        </h2>
        <p
          ref={paragraphRef}
          className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
        >
          A collection of projects where I share insights, tutorials, and ideas
          about{" "}
          <span className="text-pink-700 font-semibold">development</span>{" "}
          that power modern digital experiences.
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative w-full max-w-6xl">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-5 scroll-smooth no-scrollbar py-4 pb-8 touch-pan-x"
        >
          {projectsData.length === 0 ? (
            <p className="text-gray-400 px-4">Loading projects...</p>
          ) : (
            projectsData.map((project, index) => (
              <div
                key={project._id || index}
                className="project-card w-[270px] h-[240px] bg-[#28282B] rounded-xl p-3 sm:p-4 flex flex-col
                shadow-lg shadow-black/60 transition-all duration-300
                relative group hover:-translate-y-1 flex-shrink-0"
                onClick={() => isTouch && handleTap(index)}
              >
                {/* Project Image */}
                <div className="w-full h-[180px] rounded-lg overflow-hidden mb-3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title & Description */}
                <h3 className="text-base md:text-lg font-semibold text-white mb-1 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base line-clamp-2">
                  {project.description}
                </p>

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl transition-opacity duration-300
                    ${
                      isTouch
                        ? activeIndex === index
                          ? "opacity-100"
                          : "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/project/${project.slug}`);
                    }}
                    className="bg-gradient-to-tr from-purple-700 via-pink-700 to-red-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
                  >
                    <FaEye className="text-lg sm:text-xl" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Arrows on sides (desktop only) */}
        {!isTouch && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute top-1/2 -translate-y-1/2 -left-15
              bg-gradient-to-tr from-purple-700 via-pink-700 to-red-500 
              text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <FaChevronLeft className="text-lg" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute top-1/2 -translate-y-1/2 -right-12
              bg-gradient-to-tr from-purple-700 via-pink-700 to-red-500 
              text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <FaChevronRight className="text-lg" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Project;
