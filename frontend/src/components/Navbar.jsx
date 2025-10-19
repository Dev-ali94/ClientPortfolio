import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("hero"); // Home active by default
  const navbarRef = useRef(null);
  const desktopLinksRef = useRef([]);

  const links = [
    { id: "hero", name: "Home" },
    { id: "services", name: "Services" },
    { id: "about", name: "About" },
    { id: "project", name: "Projects" },
    { id: "contact", name: "Contact" },
  ];

  const handleClick = (id) => {
    setActiveLink(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Animate entire navbar
    gsap.from(navbarRef.current, {
      opacity: 0,
      y: -40,
      duration: 0.8,
      ease: "power3.out",
    });

    // Animate individual links
    if (desktopLinksRef.current.length > 0) {
      gsap.from(desktopLinksRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
        delay: 0.2,
      });
    }
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 
                 z-50 bg-black/60 backdrop-blur-md 
                 rounded-full shadow-lg shadow-black/60
                 px-8 py-4 max-w-[700px] w-[90%]
                 justify-center items-center"
    >
      <ul className="flex items-center justify-center gap-10 uppercase tracking-wide font-semibold">
        {links.map((link, index) => (
          <li
            key={link.id}
            ref={(el) => (desktopLinksRef.current[index] = el)}
            className="relative group list-none cursor-pointer"
          >
            <button
              onClick={() => handleClick(link.id)}
              className={`text-lg transition-colors duration-300 
                ${
                  activeLink === link.id
                    ? "text-pink-800 scale-105"
                    : "text-white hover:text-pink-800"
                }`}
            >
              {link.name}
            </button>

            {/* Underline animation */}
            <span
              className={`absolute left-0 -bottom-1 h-[3px] rounded-full transition-all duration-300
                ${
                  activeLink === link.id
                    ? "w-full bg-pink-800"
                    : "w-0 group-hover:w-full bg-pink-800"
                }`}
            ></span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

