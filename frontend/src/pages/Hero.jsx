import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const subTextCursorRef = useRef(null);
  const buttonsDesktopRef = useRef(null);
  const buttonsMobileRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Typing effect for heading
    const headingText = "Hi, I am Duaa";
    gsap.to({}, {
      duration: headingText.length * 0.12,
      onUpdate: function () {
        const chars = Math.floor(this.progress() * headingText.length);
        headingRef.current.innerText = headingText.substring(0, chars);
      },
    });

    // GSAP pop-in animations
    const popTl = gsap.timeline({ delay: 0.3 });
    popTl
      .from([buttonsDesktopRef.current, buttonsMobileRef.current], {
        opacity: 0,
        y: 20,
        scale: 0.85,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
      .from(imageRef.current, {
        opacity: 0,
        scale: 0,
        rotate: -10,
        duration: 1,
        ease: "elastic.out(1,0.5)",
      }, "-=0.6");

    // Typing loop for subtext
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
    <section
      id="hero"
      className="w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 bg-[#18181B]"
    >
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 lg:gap-20 2xl:gap-32 mt-10">
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 max-w-2xl">
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 mb-4 leading-tight"
          ></h1>

          <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl 2xl:text-3xl mb-6 flex items-center gap-1">
            <span ref={subTextRef}></span>
            <span ref={subTextCursorRef} className="text-pink-500">|</span>
          </p>

          {/* Desktop Buttons */}
          <div
            ref={buttonsDesktopRef}
            className="hidden lg:flex flex-row flex-wrap gap-3 w-auto justify-start mt-2"
          >
            <Link
              to="/project-detail"
              className="px-6 py-2 rounded-full text-base xl:text-lg bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 text-white hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/60"
            >
              My Work
            </Link>
            <button
              className="px-6 py-2 rounded-full text-base xl:text-lg border-2 border-pink-900 text-white hover:bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 transition-all duration-300 shadow-lg shadow-black/60"
            >
              Download CV
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end gap-6">
          <div
            ref={imageRef}
            className="w-56 sm:w-64 md:w-72 lg:w-[360px] xl:w-[420px] 2xl:w-[480px] aspect-square rounded-full bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 p-1.5 shadow-lg shadow-black/60 overflow-hidden"
          >
            <img
              src={assets.bg_image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Mobile Buttons */}
          <div
            ref={buttonsMobileRef}
            className="flex lg:hidden flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center mt-4"
          >
            <Link
              to="/project-detail"
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 text-white hover:scale-105 transition-transform duration-300 text-center shadow-lg shadow-black/60"
            >
              My Work
            </Link>
            <button
              className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base border-2 border-pink-900 text-white hover:bg-gradient-to-tr from-purple-800 via-pink-800 to-red-500 transition-all duration-300 text-center shadow-lg shadow-black/60"
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
