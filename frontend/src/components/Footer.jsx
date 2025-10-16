import React from "react";
import {  FaLinkedin, FaInstagram, FaFacebook, FaFacebookMessenger } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[rgb(32,32,35)] text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/*About */}
        <div>
          <h2 className="text-xl font-bold text-white">Duaa</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Showcasing my work, skills, and projects.
            Let’s build something great together 
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Services i provided</h3>
          <ul className="space-y-2 text-md">
            <li>
              <p  className="hover:text-pink-800 transition">content writing</p>
            </li>
            <li>
              <p className="hover:text-pink-800 transition">seo writing</p>
            </li>
            <li>
              <p className="hover:text-pink-800 transition">blog write</p>
            </li>
            <li>
              <p  className="hover:text-pink-800 transition">seo content</p>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Me</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-pink-800"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-800"><FaLinkedin /></a>
            <a href="#" className="hover:text-pink-800"><FaFacebookMessenger /></a>
            <a href="#" className="hover:text-pink-800"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} duaa portfolio. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
