import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { assets } from "../assets/assets";
import {Link} from 'react-router-dom'
import Navbar from "../components/Navbar";
const Hero = () => {
  const headingRef = useRef(null);
  const headingCursorRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    /** Animate Heading Once */
    const heading = headingRef.current;
    const cursor = headingCursorRef.current;
    const headingText = "Hi, I am Duaa";

    let headingTl = gsap.timeline({
      onComplete: () => {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
      },
    });

    headingTl.to({}, {
      duration: headingText.length * 0.12,
      ease: "none",
      onUpdate: function () {
        const chars = Math.floor(this.progress() * headingText.length);
        heading.innerText = headingText.substring(0, chars);
      }
    });

    /** Animate Role Text Loop */
    const phrases = ["Content Writer", "Creative Thinker", "Story Teller", "Copywriter"];
    const role = textRef.current;
    const roleCursor = cursorRef.current;

    let tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    phrases.forEach((phrase) => {
      tl.to({}, {
        duration: phrase.length * 0.1,
        ease: "none",
        onUpdate: function () {
          const chars = Math.floor(this.progress() * phrase.length);
          role.innerText = phrase.substring(0, chars);
        },
      });

      tl.to({}, { duration: 1 });

      tl.to({}, {
        duration: phrase.length * 0.05,
        ease: "none",
        onUpdate: function () {
          const chars = phrase.length - Math.floor(this.progress() * phrase.length);
          role.innerText = phrase.substring(0, chars);
        },
      });
    });

    gsap.to(roleCursor, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.6,
    });
  }, []);

  return (
<div className="flex flex-col items-center justify-start min-h-screen py-8 w-full px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
  <Navbar />

  <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center justify-between mt-10 w-full gap-8 lg:gap-16">

    {/* Left Side */}
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 max-w-2xl">
      
      {/* Top Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl
         uppercase font-semibold 
         bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500
         text-transparent bg-clip-text mb-3 lg:mb-4">
        <span ref={headingRef}></span>
        <span ref={headingCursorRef} className="ml-1">|</span>
      </h2>

      {/* Typing Role Text */}
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-medium
         text-gray-300 uppercase mb-6 lg:mb-8 min-h-[1.5em]">
        <span ref={textRef}></span>
        <span ref={cursorRef} className="text-pink-500 ml-1">|</span>
      </h2>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto justify-center lg:justify-start">
        <Link to="/project-detail"
          className="text-sm sm:text-base md:text-lg text-gray-300 
            bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500
            px-5 sm:px-6 py-2.5 sm:py-3 
            rounded-full border-pink-900 transition-all duration-300  
            hover:bg-none hover:border-2 w-full sm:w-auto max-w-xs sm:max-w-none  shadow-lg shadow-black/60">
          my work
        </Link>

        <button className="text-sm sm:text-base md:text-lg text-gray-300 
           px-5 sm:px-6 py-2.5 sm:py-3 
           border-2 border-pink-900 rounded-full transition-all duration-300 
           hover:bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500
           hover:border-none w-full sm:w-auto max-w-xs sm:max-w-none shadow-lg shadow-black/60">
          Download cv
        </button>
      </div>
    </div>

<div className="flex justify-center lg:justify-end w-full lg:w-1/2">
  <div className="w-52 sm:w-60 md:w-80 lg:w-90 xl:w-100 aspect-square rounded-full
      bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 p-1.5 sm:p-2
       shadow-lg shadow-black/60">
    <div className="h-full w-full rounded-full overflow-hidden 
    flex items-center justify-center">
      <img 
        src={assets.bg_image} 
        alt="Profile" 
        className="object-cover h-full w-full rounded-full" 
      />
    </div>
  </div>
</div>



  </div>
</div>


  );
};
export default Hero;