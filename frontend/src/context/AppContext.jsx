import React, { createContext, useState, useEffect,useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);
// Create context
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
 // backend URL

  // --- Global States ---
  const [commentsData, setCommentsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
   const boxRef = useRef(null);
  const textRef = useRef(null);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/comments/get-all-comment`);
      if (data.success) {
        setCommentsData(data.commentData);
        console.log(data.commentData);
        
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/project/get-all-project`);
      if (data.success) {
        setProjectsData(data.projectData);
        console.log(data.projectData);
        
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchProjects();
    console.log(import.meta.env.VITE_BACKEND_URL)

  }, []);
  // anmiation
  useEffect(() => {
    // 🧊 Animate the box
    gsap.from(boxRef.current, {
      opacity: 0,
      scale: 0.7,
      y: 60,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: boxRef.current,
        start: "top 80%", // trigger when element enters
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    // ✨ Animate the text
    gsap.from(textRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        markers: false,
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <AppContext.Provider
      value={{
        commentsData,
        setCommentsData,
        fetchComments,
        projectsData,
        setProjectsData, // ✅ fixed
        fetchProjects,
       boxRef,
       textRef
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

