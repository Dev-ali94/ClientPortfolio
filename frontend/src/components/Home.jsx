import React from 'react'
import Navbar from './Navbar'
import Hero from '../pages/Hero'
import Services from '../pages/Services'
import About from '../pages/About'
import Footer from './Footer'
import Contact from '../pages/Contact'
import Project from '../pages/Project'


const Home = () => {
  return (

    <div className="flex flex-col items-center justify-between gap-y-6 min-h-screen bg-[#28282B]">
     
      <Hero />
      <Services />
      <About />
      <Project />
      <Contact />
      <Footer />
    </div>

  )
}

export default Home
