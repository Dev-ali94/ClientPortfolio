import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaBars, FaTimes, FaFacebook, FaInstagram, FaFacebookMessenger } from "react-icons/fa";

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState("about");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Link = [
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

  return (
    <>
      {/* Desktop Navbar */}
      <div className='hidden md:flex items-center justify-center
        bg-[#18181a] h-16 w-[80vw] lg:w-[66vw] xl:w-[50vw] 2xl:w-[35vw] 
        rounded-full shadow-lg shadow-black/60 mt-5 mb-5 relative z-50'>
        <ul className='flex items-center justify-center gap-x-5 uppercase cursor-pointer text-gray-300 font-[font2]'>
          {Link.map((link, index) => (
            <li key={link.id} className="flex flex-col relative group cursor-pointer list-none">
              <a href={`#${link.id}`}
                className={`text-medium font-[font2] transition-colors duration-300
                  ${activeCategory === link.id ? "text-pink-800" : "hover:text-pink-600"}
                  ${!activeCategory && index === 0 ? "text-purple-500" : ""}`}>
                {link.name}
              </a>
              <span className={`absolute left-0 -bottom-1 transition-all duration-300 h-[3px] w-[88%] rounded-full
                ${activeCategory === link.id ? "bg-pink-800" : (!activeCategory && index === 0 ? "bg-pink-800" : "group-hover:bg-pink-800")}`}>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile side navbar */}
      <div className='md:hidden my-4 mx-4 relative z-50'>
        {/* Mobile navbar */}
        <div className='flex w-[90vw] items-center justify-between px-4
         bg-[#18181a] shadow-lg shadow-black/60 h-14 rounded-full '>
          <div className='text-white font-bold text-lg'>
            Duaa
          </div>
          <button
            onClick={toggleMobileMenu}
            className='text-white text-2xl transition z-50 relative'>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Side navbar menu */}
        <div className={`fixed top-0 right-0 h-full w-[70vw] max-w-[420px] 
          transform transition-transform duration-300 ease-in-out bg-[#1f1f20] z-50
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex flex-col h-full'>
            {/* Topbar of sidebar menu */}
            <div className='flex items-center justify-between p-4 border-b border-white/20'>
              <h2 className='text-white font-bold text-xl'>Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className='text-white text-2xl transition'
              >
                <FaTimes />
              </button>
            </div>

            {/* Side navbar pages link */}
            <nav className="flex-1 px-4 py-6">
              <ul className="space-y-4">
                {Link.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => handleLinkClick(link.id)}
                      className={`block text-white text-start p-2 rounded-lg transition
                        ${activeCategory === link.id ? "bg-pink-600/60" : ""}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* All mobile navbar public link */}
            <div className='p-4 border-t border-white/20'>
              <div className='flex items-center justify-center gap-6 text-2xl'>
                <a href="#" className="text-white transition"><FaLinkedin /></a>
                <a href="#" className="text-white transition"><FaFacebook /></a>
                <a href="#" className="text-white transition"><FaInstagram /></a>
                <a href="#" className="text-white transition"><FaFacebookMessenger /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

