import React from "react";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaProjectDiagram,
  FaAward,
} from "react-icons/fa";
import { assets } from "../assets/assets";

const About = () => {
  const aboutData = [
    {
      id: 1,
      icon: (
        <FaUserGraduate className="text-white text-base sm:text-lg md:text-xl lg:text-2xl" />
      ),
      title: "5+ Years Experience",
      description:
        "Delivering high-quality content, design, and digital solutions worldwide.",
    },
    {
      id: 2,
      icon: (
        <FaLaptopCode className="text-white text-base sm:text-lg md:text-xl lg:text-2xl" />
      ),
      title: "Skilled in Multiple Tools",
      description:
        "Expert in React, Tailwind CSS, Node.js, MongoDB, and modern strategies.",
    },
    {
      id: 3,
      icon: (
        <FaProjectDiagram className="text-white text-base sm:text-lg md:text-xl lg:text-2xl" />
      ),
      title: "30+ Successful Projects",
      description:
        "Proven track record of impactful projects across industries.",
    },
    {
      id: 4,
      icon: (
        <FaAward className="text-white text-base sm:text-lg md:text-xl lg:text-2xl" />
      ),
      title: "Certified Professional",
      description:
        "Recognized credentials in content writing, design, and digital solutions.",
    },
  ];

  return (
    <section
      id="about"
      className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center 
      lg:items-start gap-10 lg:gap-14">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-8">
          {/* Heading */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              About Me
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              Hi, I'm{" "}
              <span className="text-pink-600 font-semibold">Duaa</span>, a
              passionate
              <span className="text-pink-600 font-medium"> content writer</span>.
              With years of experience, I blend creativity and technical
              expertise to build engaging digital experiences that not only look
              great but also deliver results.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {aboutData.map((item) => (
              <div
                key={item.id}
                className="bg-[rgb(32,32,35)] backdrop-blur-md rounded-xl 
                           shadow-lg shadow-black/60
                           p-4 sm:p-5 md:p-6 flex flex-col"
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center mb-3 
                             h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16
                             rounded-lg bg-gradient-to-tr from-purple-700 via-pink-600 to-red-500 
                              shadow-lg shadow-black/60"
                >
                  {item.icon}
                </div>

                {/* Text */}
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-snug">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:mt-55">
          <div className="relative w-3/4 sm:w-2/3 md:w-1/2 lg:w-3/4 xl:w-2/3 shadow-lg shadow-black/60 rounded-2xl">
            <img
              src={assets.bg_image}
              alt="About Duaa"
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
            {/* Decorative Overlay */}
            <div className="absolute -z-10 top-3 right-3 w-full h-full rounded-2xl bg-gradient-to-tr from-purple-800/20 to-pink-600/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
