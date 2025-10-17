import React, { useRef, useEffect } from "react";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaProjectDiagram,
  FaAward,
} from "react-icons/fa";
import { assets } from "../assets/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const boxRefs = useRef([]);
  const imageRef = useRef(null);

  const aboutData = [
    {
      id: 1,
      icon: <FaUserGraduate className="text-white text-xl lg:text-2xl" />,
      title: "5+ Years Experience",
      description:
        "Delivering high-quality content, design, and digital solutions worldwide.",
    },
    {
      id: 2,
      icon: <FaLaptopCode className="text-white text-xl lg:text-2xl" />,
      title: "Skilled in Multiple Tools",
      description:
        "Expert in React, Tailwind CSS, Node.js, MongoDB, and modern strategies.",
    },
    {
      id: 3,
      icon: <FaProjectDiagram className="text-white text-xl lg:text-2xl" />,
      title: "30+ Successful Projects",
      description:
        "Proven track record of impactful projects across industries.",
    },
    {
      id: 4,
      icon: <FaAward className="text-white text-xl lg:text-2xl" />,
      title: "Certified Professional",
      description:
        "Recognized credentials in content writing, design, and digital solutions.",
    },
  ];

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
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate each box with pop + stagger
    boxRefs.current.forEach((box, i) => {
      gsap.fromTo(
        box,
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
            trigger: box,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate Right Image
    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0.8,
      rotate: -5,
      duration: 1.2,
      ease: "elastic.out(1, 0.6)",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="about"
      className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-20 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center 
        lg:items-start gap-10 lg:gap-14"
      >
        {/* Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-8">
          {/* Heading */}
          <div className="text-center lg:text-left">
            <h2
              ref={headingRef}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              About Me
            </h2>
            <p
              ref={paragraphRef}
              className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed"
            >
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
            {aboutData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (boxRefs.current[index] = el)}
                className="bg-[rgb(32,32,35)] backdrop-blur-md rounded-xl 
                shadow-lg shadow-black/60 p-4 sm:p-5 md:p-6 flex flex-col 
                will-change-transform transform-gpu"
              >
                <div
                  className="flex items-center justify-center mb-3 
                  h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16
                  rounded-lg bg-gradient-to-tr from-purple-700 via-pink-600 to-red-500 
                  shadow-lg shadow-black/60"
                >
                  {item.icon}
                </div>
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
        <div className="w-full lg:w-1/2 flex justify-center lg:mt-50 will-change-transform">
          <div
            ref={imageRef}
            className="relative w-3/4 sm:w-2/3 md:w-1/2 lg:w-3/4 xl:w-2/3 shadow-lg shadow-black/60 rounded-2xl overflow-hidden"
          >
            <img
              src={assets.bg_image}
              alt="About Duaa"
              className="rounded-2xl shadow-lg w-full h-auto object-cover transform-gpu"
            />
            <div className="absolute -z-10 top-3 right-3 w-full h-full rounded-2xl bg-gradient-to-tr from-purple-800/20 to-pink-600/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

