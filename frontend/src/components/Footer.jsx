import React, { useEffect, useRef } from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaFacebookMessenger } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const elements = footerRef.current.querySelectorAll(
      "h2, h3, li, a, svg, div.text-sm"
    );

    gsap.from(elements, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      onComplete: () => {
        elements.forEach(el => el.style.opacity = "1");
      },
    });
  }, []);

  return (
    <footer ref={footerRef} className="w-full bg-[rgb(28,28,31)] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About */}
        <div>
          <h2 className="text-xl font-bold text-white">Duaa</h2>
          <ul className="mt-3 space-y-2 text-gray-400 leading-relaxed">
            <li>Showcasing my work, skills, and projects.</li>
            <li>Let’s build something great together.</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Services I Provide</h3>
          <ul className="space-y-2 text-md">
            <li className="hover:text-pink-800 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Content Writing
            </li>
            <li className="hover:text-pink-800 hover:scale-105 transition-transform duration-300 cursor-pointer">
              SEO Writing
            </li>
            <li className="hover:text-pink-800 hover:scale-105 transition-transform duration-300 cursor-pointer">
              Blog Writing
            </li>
            <li className="hover:text-pink-800 hover:scale-105 transition-transform duration-300 cursor-pointer">
              SEO Content
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Me</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-pink-800 hover:scale-110 transition-transform duration-300">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-800 hover:scale-110 transition-transform duration-300">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-pink-800 hover:scale-110 transition-transform duration-300">
              <FaFacebookMessenger />
            </a>
            <a href="#" className="hover:text-pink-800 hover:scale-110 transition-transform duration-300">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Duaa Portfolio. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
