import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); 
  const [commentsData, setCommentsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [contactsData, setContactsData] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Check auth and get admin info
  const getAuthState = async () => {
    setLoadingAuth(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/auth`, {
        withCredentials: true,
      });

      if (data.success) {
        setIsLoggedIn(true);
        setUserData(data.user);
        await fetchComments();
        await fetchProjects();
        await fetchContacts();
      } else {
        logoutCleanup();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Not authenticated");
      logoutCleanup();
    } finally {
      setLoadingAuth(false);
    }
  };

  // Fetch functions
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/comments/get-all-comment`);
      if (data.success) setCommentsData(data.commentData);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/project/get-all-project`);
      if (data.success) setProjectsData(data.projectData);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/contact/get-all-contact`);
      if (data.success) setContactsData(data.contactdata);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  // Logout / cleanup
  const logoutCleanup = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setCommentsData([]);
    setProjectsData([]);
    setContactsData([]);
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        commentsData,
        setCommentsData,
        projectsData,
        setProjectsData,
        contactsData,
        setContactsData,
        loadingAuth,
        getAuthState,
        fetchComments,
        fetchProjects,
        fetchContacts,
        logoutCleanup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
