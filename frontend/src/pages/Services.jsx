import React from "react";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaProjectDiagram,
  FaAward,
} from "react-icons/fa";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: (
        <FaProjectDiagram className="text-white text-base sm:text-lg md:text-xl lg:text-2xl" />
      ),
      title: "Content Writing",
      desription:
        "Crafting engaging blog posts, website content, and marketing copy that captivates your audience and drives conversions.",
    },
    {
      id: 2,
      icon: (
        <FaLaptopCode className="text-white text-base sm:text-lg md:text-xl lg:text-2xl" />
      ),
      title: "SEO Optimization",
      desription:
        "Optimizing content with the right keywords, structure, and strategy to boost your search engine visibility.",
    },
    {
      id: 3,
      icon: (
        <FaAward className="text-white text-base sm:text-lg md:text-xl lg:text-2xl" />
      ),
      title: "Social Media Content",
      desription:
        "Creating compelling social media posts that build community, strengthen your brand, and increase engagement.",
    },
  ];

  return (
    <div
      id="services"
      className="bg-[rgb(32,32,35)] w-full flex flex-col items-center p-8 gap-y-12"
    >
      {/* Section Header */}
      <div className="text-center max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-3">What I Do Best</h2>
        <p className="text-gray-300 text-base leading-relaxed">
          I specialize in creating content that not only{" "}
          <span className="text-pink-800 font-semibold">
            engages your audience{" "}
          </span>
          but also drives measurable results for your business.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#28282B] rounded-xl p-5 flex flex-col items-center text-center max-w-[250px] shadow-lg shadow-black/60"
          >
            {/* Icon */}
            <div
              className="flex items-center justify-center h-14 w-14
              bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 rounded-lg 
              mb-4 shadow-lg shadow-black/60"
            >
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {service.desription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
