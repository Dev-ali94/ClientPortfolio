import React, { useState } from "react";
import Sidebar from "./Sidebar";
import CommentsSection from "../pages/CommentsSection";
import ProjectList from "../pages/ProjectList";
import ProjectForm from "../pages/PorjectForm";
import ContactSection from "../pages/ContactSection";
import Home from "./Home";

const Main = () => {
  const [activePage, setActivePage] = useState("home");
  const renderPage = () => {
    switch (activePage) {
      case "all-project":
        return <ProjectList />;
      case "comments":
        return <CommentsSection />;
      case "create-project":
        return <ProjectForm />;
      case "contact":
        return <ContactSection />;
      case "home":
        return <Home />;
      default:
        return <h2 className="text-white">Select an option from the sidebar</h2>;
    }
  };

  return (
    <div className="flex h-screen bg-[#1a1a1d] text-white">
      {/* Sidebar*/}
      <Sidebar onSelect={setActivePage} />
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">{renderPage()}</div>
    </div>
  );
};

export default Main;
