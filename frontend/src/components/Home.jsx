import React from 'react'
import Navbar from './Navbar'
import Hero from '../pages/Hero'
import Services from '../pages/Services'
import About from '../pages/About'
import Footer from './Footer'
import Contact from '../pages/Contact'
import Project from '../pages/Project'
import MobileSidebar from './MobileSidebar'


const Home = () => {
  return (

    <div className=" relative flex flex-col items-center justify-between gap-y-6 min-h-screen bg-[#28282B]">
      <div className="hidden lg:block fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <Hero />
      <Services />
      <About />
      <Project />
      <Contact />
      <Footer />
      <MobileSidebar/>
    </div>

  )
}

export default Home
