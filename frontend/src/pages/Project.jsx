// Project.jsx
import { useState, useEffect, useRef, useContext } from "react";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Project = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const { projectsData } = useContext(AppContext); // ✅ from context (always array)

  // Detect touch devices
  useEffect(() => {
    const checkTouch = () =>
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Handle tap on touch devices
  const handleTap = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Horizontal scroll controls
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -260 : 260,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      id="project"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
       py-12 md:py-16 flex flex-col items-center gap-y-10 bg-[rgb(32,32,35)]"
    >
      {/* Heading */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          My Latest Work
        </h2>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
          A collection of projects where I share insights, tutorials, and ideas
          about{" "}
          <span className="text-pink-700 font-semibold">development</span>{" "}
          that power modern digital experiences.
        </p>
      </div>

      {/* Project Carousel */}
      <div className="relative w-full max-w-6xl">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-5 scroll-smooth no-scrollbar py-4"
        >
          {projectsData.length === 0 ? (
            <p className="text-gray-400 px-4">Loading projects...</p>
          ) : (
            projectsData.map((project, index) => (
              <div
                key={project._id || index}
                className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px]
                bg-[#28282B] rounded-xl p-3 sm:p-4 flex flex-col 
                shadow-lg shadow-black/60transition-all duration-300 
                relative group hover:-translate-y-1"
                onClick={() => isTouch && handleTap(index)}
              >
                {/* Project Image */}
                <div className="w-full h-32 sm:h-36 md:h-40 rounded-lg overflow-hidden mb-3">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform 
                    duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Project Title & Description */}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xs
                 break-words line-clamp-1">
                  {project.description}
                </p>

                {/* Overlay for View Button */}
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

        {/* Carousel Controls at Bottom-Right */}
        <div className="absolute -bottom-6 right-4 flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="bg-gradient-to-tr from-purple-700 via-pink-700 to-red-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <FaChevronLeft className="text-lg" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-gradient-to-tr from-purple-700 via-pink-700 to-red-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
          >
            <FaChevronRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
