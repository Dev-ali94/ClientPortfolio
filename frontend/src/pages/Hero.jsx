import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";

const Hero = () => {
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const subTextCursorRef = useRef(null);
  const buttonsDesktopRef = useRef(null);
  const buttonsMobileRef = useRef(null);
  const imageRef = useRef(null);
  const navbarContainerRef = useRef(null);

  useEffect(() => {
    // Heading typing animation (runs once)
    const headingText = "Hi, I am Duaa";
    gsap.to({}, {
      duration: headingText.length * 0.12,
      onUpdate: function () {
        const chars = Math.floor(this.progress() * headingText.length);
        headingRef.current.innerText = headingText.substring(0, chars);
      }
    });

    // Pop-in animation for navbar, buttons, image
    const popTl = gsap.timeline({ delay: 0.3 });
    popTl.from(navbarContainerRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.95,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .from([buttonsDesktopRef.current, buttonsMobileRef.current], {
      opacity: 0,
      y: 20,
      scale: 0.85,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .from(imageRef.current, {
      opacity: 0,
      scale: 0,
      rotate: -10,
      duration: 1,
      ease: "elastic.out(1,0.5)"
    }, "-=0.6");

    // Subtext typing animation loop
    const phrases = ["Content Writer", "Creative Thinker", "Story Teller"];
    let phraseIndex = 0;

    const typePhrase = () => {
      const phrase = phrases[phraseIndex];
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        subTextRef.current.innerText = phrase.substring(0, charIndex);
        charIndex++;
        if (charIndex > phrase.length) {
          clearInterval(typingInterval);
          setTimeout(deletePhrase, 1200);
        }
      }, 100);
    };

    const deletePhrase = () => {
      const phrase = phrases[phraseIndex];
      let charIndex = phrase.length;

      const deletingInterval = setInterval(() => {
        subTextRef.current.innerText = phrase.substring(0, charIndex);
        charIndex--;
        if (charIndex < 0) {
          clearInterval(deletingInterval);
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typePhrase, 200);
        }
      }, 50);
    };

    // Cursor blink
    gsap.to(subTextCursorRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
      duration: 0.6,
    });

    typePhrase();

  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20">
      
      {/* Navbar */}
      <div ref={navbarContainerRef} className="w-full flex justify-center">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full gap-8 lg:gap-16 mt-10">
        {/* Left side: Heading + Subtext */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 max-w-2xl">
          <h1 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 mb-4"></h1>

          <p className="text-gray-300 text-lg sm:text-xl mb-6 flex items-center gap-1">
            <span ref={subTextRef}></span>
            <span ref={subTextCursorRef} className="text-pink-500">|</span>
          </p>

          {/* Buttons for Desktop (lg+) */}
          <div ref={buttonsDesktopRef} className="hidden lg:flex flex-row gap-4 w-auto justify-start mt-4">
            <Link
              to="/project-detail"
              className="px-6 py-3 rounded-full bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 text-white shadow-lg shadow-black/60 hover:scale-105 transition-transform duration-300 w-auto text-center"
            >
              My Work
            </Link>
            <button
              className="px-6 py-3 rounded-full border-2 border-pink-900 text-white shadow-lg shadow-black/60 hover:bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 transition-all duration-300 w-auto text-center"
            >
              Download CV
            </button>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-6">
          <div ref={imageRef} className="w-64 sm:w-72 md:w-80 lg:w-96 aspect-square rounded-full bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 p-1.5 shadow-lg shadow-black/60 overflow-hidden">
            <img
              src={assets.bg_image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Buttons for Mobile (<lg) */}
          <div ref={buttonsMobileRef} className="flex lg:hidden flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-6">
            <Link
              to="/project-detail"
              className="px-6 py-3 rounded-full bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 text-white shadow-lg shadow-black/60 hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-center"
            >
              My Work
            </Link>
            <button
              className="px-6 py-3 rounded-full border-2 border-pink-900 text-white shadow-lg shadow-black/60 hover:bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;