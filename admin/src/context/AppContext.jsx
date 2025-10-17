import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [commentsData, setCommentsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [contactsData, setContactsData] = useState([]);

  // Fetch comments (public, no credentials)
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/get-all-comment`
      );
      if (data.success) {
        setCommentsData(data.commentData);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Fetch projects (public, no credentials)
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/project/get-all-project`
      );
      if (data.success) {
        setProjectsData(data.projectData);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Fetch contacts (public, no credentials)
  const fetchContacts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/get-all-contact`
      );
      if (data.success) {
        setContactsData(data.contactdata);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchProjects();
    fetchContacts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        commentsData,
        setCommentsData,
        projectsData,
        setProjectsData,
        contactsData,
        setContactsData,
        fetchComments,
        fetchProjects,
        fetchContacts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
