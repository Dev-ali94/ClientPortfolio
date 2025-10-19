import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaFacebookMessenger,
  FaHome,
  FaServicestack,
  FaUser,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";
import gsap from "gsap";

const MobileSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero"); // ✅ Default active is Home
  const sidebarRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const mobileTopbarRef = useRef(null);
  const mobileSocialRef = useRef(null);

  const links = [
    { id: "hero", name: "Home", icon: <FaHome /> },
    { id: "services", name: "Services", icon: <FaServicestack /> },
    { id: "about", name: "About", icon: <FaUser /> },
    { id: "project", name: "Projects", icon: <FaProjectDiagram /> },
    { id: "contact", name: "Contact", icon: <FaEnvelope /> },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(sidebarRef.current, { x: "100%" }, { x: "0%", duration: 0.6, ease: "power3.out" });
      gsap.fromTo(mobileTopbarRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" });

      mobileLinksRef.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.5)", delay: 0.1 * i }
        );
      });

      gsap.fromTo(
        mobileSocialRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)", delay: 0.4 }
      );
    } else {
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.5, ease: "power2.inOut" });
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (id) => {
    setActiveLink(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* 📱 Floating Hamburger Button */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-14 h-14 flex items-center justify-center rounded-full 
                     bg-pink-800 
                     text-white text-3xl 
                     hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/60"
        >
          <FaBars />
        </button>
      </div>

      {/* 📱 Sidebar Menu */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-screen w-[75vw] max-w-[420px] bg-black/60 backdrop-blur-xl transform translate-x-full z-50 shadow-xl shadow-black/60"
      >
        <div className="flex flex-col h-full">
          {/* Topbar */}
          <div
            ref={mobileTopbarRef}
            className="flex items-center justify-between px-6 py-6 border-b border-white/20"
          >
            <h2 className="text-white font-bold text-2xl tracking-wide">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl transition hover:rotate-90 hover:text-pink-800 duration-300"
            >
              <FaTimes />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 px-6 py-8">
            <ul className="flex flex-col gap-5">
              {links.map((link, index) => (
                <li key={link.id} ref={(el) => (mobileLinksRef.current[index] = el)}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center gap-4 w-full text-left text-lg font-semibold p-4 rounded-xl transition-all duration-300
                      ${
                        activeLink === link.id
                          ? "bg-pink-800 text-white"
                          : "bg-white/5 text-white hover:bg-pink-800/70"
                      }`}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons */}
          <div ref={mobileSocialRef} className="px-6 py-6 border-t border-white/20">
            <div className="flex items-center justify-center gap-6 text-2xl">
              <a href="#" className="text-white transition hover:text-pink-800 hover:scale-110">
                <FaLinkedin />
              </a>
              <a href="#" className="text-white transition hover:text-pink-800 hover:scale-110">
                <FaFacebook />
              </a>
              <a href="#" className="text-white transition hover:text-pink-800 hover:scale-110">
                <FaInstagram />
              </a>
              <a href="#" className="text-white transition hover:text-pink-800 hover:scale-110">
                <FaFacebookMessenger />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
