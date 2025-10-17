import React, { useState, useRef, useEffect } from 'react';
import { FaLinkedin, FaGithub, FaBars, FaTimes, FaFacebook, FaInstagram, FaFacebookMessenger } from "react-icons/fa";
import gsap from "gsap";

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const desktopLinksRef = useRef([]);
  const mobileLinksRef = useRef([]);
  const mobileTopbarRef = useRef(null);
  const mobileSocialRef = useRef(null);

  const links = [
    { id: "about", name: "About" },
    { id: "project", name: "Project" },
    { id: "services", name: "Services" },
    { id: "contact", name: "Contact" },
  ];

  const handleLinkClick = (id) => {
    setActiveCategory(id);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animate desktop links
  useEffect(() => {
    if (desktopLinksRef.current.length > 0) {
      gsap.from(desktopLinksRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.15,
      });
    }
  }, []);

  // Animate mobile sidebar links when menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      const tl = gsap.timeline();

      // Animate topbar
      tl.from(mobileTopbarRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate links
      tl.from(mobileLinksRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
      }, "-=0.2");

      // Animate social icons
      tl.from(mobileSocialRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.5,
        ease: "back.out(1.5)",
      }, "-=0.3");
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className='hidden md:flex items-center justify-center
        bg-[#18181a] h-16 w-[80vw] lg:w-[66vw] xl:w-[50vw] 2xl:w-[35vw] 
        rounded-full shadow-lg shadow-black/60 mt-5 mb-5 relative z-50'
      >
        <ul className='flex items-center justify-center gap-x-5 uppercase cursor-pointer text-gray-300 font-[font2]'>
          {links.map((link, index) => (
            <li
              key={link.id}
              ref={el => desktopLinksRef.current[index] = el}
              className="flex flex-col relative group cursor-pointer list-none"
            >
              <a href={`#${link.id}`}
                className={`text-medium font-[font2] transition-colors duration-300
                  ${activeCategory === link.id ? "text-pink-800" : "hover:text-pink-600"}`}
              >
                {link.name}
              </a>
              <span className={`absolute left-0 -bottom-1 transition-all duration-300 h-[3px] w-[88%] rounded-full
                ${activeCategory === link.id ? "bg-pink-800" : "group-hover:bg-pink-800"}`}></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className='md:hidden relative z-50'>
        {/* Mobile navbar top */}
        <div className='flex w-[90vw] items-center justify-between px-4
         bg-[#18181a] shadow-lg shadow-black/60 h-14 rounded-full mx-4 my-4'>
          <div className='text-white font-bold text-lg'>Duaa</div>
          <button
            onClick={toggleMobileMenu}
            className='text-white text-2xl transition z-50 relative'>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar menu */}
        <div className={`fixed top-0 right-0 h-screen w-[75vw] max-w-[420px] 
          transform transition-transform duration-300 ease-in-out bg-[#1f1f20] z-50
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex flex-col h-full shadow-2xl shadow-black/70'>
            {/* Topbar */}
            <div ref={mobileTopbarRef} className='flex items-center justify-between px-6 py-6 border-b border-white/20'>
              <h2 className='text-white font-bold text-2xl'>Menu</h2>
              <button onClick={toggleMobileMenu} className='text-white text-2xl transition hover:text-pink-500'>
                <FaTimes />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-6 py-8">
              <ul className="flex flex-col gap-6">
                {links.map((link, index) => (
                  <li key={link.id} ref={el => mobileLinksRef.current[index] = el}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => handleLinkClick(link.id)}
                      className={`block text-white text-lg font-semibold p-4 rounded-xl transition
                        ${activeCategory === link.id ? "bg-pink-600/70 shadow-lg" : "hover:bg-pink-600/20 hover:shadow-md"}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Icons */}
            <div ref={mobileSocialRef} className='px-6 py-6 border-t border-white/20'>
              <div className='flex items-center justify-center gap-6 text-2xl'>
                <a href="#" className="text-white transition hover:text-pink-500"><FaLinkedin /></a>
                <a href="#" className="text-white transition hover:text-pink-500"><FaFacebook /></a>
                <a href="#" className="text-white transition hover:text-pink-500"><FaInstagram /></a>
                <a href="#" className="text-white transition hover:text-pink-500"><FaFacebookMessenger /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
