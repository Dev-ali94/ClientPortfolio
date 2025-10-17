import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
 // backend URL

  // --- Global States ---
  const [commentsData, setCommentsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/comments/get-all-comment`);
      if (data.success) {
        setCommentsData(data.commentData);
        
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
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchProjects();

  }, []);
 

  return (
    <AppContext.Provider
      value={{
        commentsData,
        setCommentsData,
        fetchComments,
        projectsData,
        setProjectsData, 
        fetchProjects,
       
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

