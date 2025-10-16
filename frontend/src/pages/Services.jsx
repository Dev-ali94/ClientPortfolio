import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLaptopCode, FaProjectDiagram, FaAward } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaProjectDiagram className="text-white text-2xl" />,
      title: "Content Writing",
      description:
        "Crafting engaging blog posts, website content, and marketing copy that captivates your audience and drives conversions.",
    },
    {
      id: 2,
      icon: <FaLaptopCode className="text-white text-2xl" />,
      title: "SEO Optimization",
      description:
        "Optimizing content with the right keywords, structure, and strategy to boost your search engine visibility.",
    },
    {
      id: 3,
      icon: <FaAward className="text-white text-2xl" />,
      title: "Social Media Content",
      description:
        "Creating compelling social media posts that build community, strengthen your brand, and increase engagement.",
    },
  ];

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate heading and paragraph
    gsap.from([headingRef.current, paragraphRef.current], {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 1,
      ease: "back.out(1.7)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate cards with pop-in effect
    cardsRef.current.forEach((card, i) => {
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
  }, []);

  return (
    <div
      id="services"
      className="bg-[rgb(32,32,35)] w-full flex flex-col items-center p-8 gap-y-12 overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center max-w-xl">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-white mb-3"
        >
          What I Do Best
        </h2>
        <p
          ref={paragraphRef}
          className="text-gray-300 text-base md:text-lg leading-relaxed"
        >
          I specialize in creating content that not only{" "}
          <span className="text-pink-500 font-semibold">engages your audience</span>{" "}
          but also drives measurable results for your business.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-[#28282B] rounded-xl p-6 flex flex-col items-center text-center max-w-[250px] shadow-xl shadow-black/50 hover:scale-105 hover:-translate-y-2 transition-transform duration-300"
          >
            {/* Icon */}
            <div className="flex items-center justify-center h-16 w-16 bg-gradient-to-tr from-purple-700 via-pink-700 to-red-500 rounded-lg mb-4 shadow-lg shadow-black/40">
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
