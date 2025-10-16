import React, { useContext } from "react";
import { FaComments, FaProjectDiagram, FaAddressBook } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { commentsData, projectsData, contactsData } = useContext(AppContext);

  const stats = [
    {
      id: 1,
      title: "Total Projects",
      value: projectsData.length,
      icon: <FaProjectDiagram className="text-pink-500 text-4xl" />,
    },
    {
      id: 2,
      title: "Total Comments",
      value: commentsData.length,
      icon: <FaComments className="text-pink-500 text-4xl" />,
    },
    {
      id: 3,
      title: "Total Contacts",
      value: contactsData.length,
      icon: <FaAddressBook className="text-pink-500 text-4xl" />,
    },
  ];

  return (
    <div className="flex flex-col gap-y-17 h-full w-full bg-[#1a1a1d] text-white">
      {/*Header */}
      <div className="p-8 border-b border-[#2e2e33] text-center">
        <h1 className="text-3xl font-extrabold tracking-wide">
          Dashboard <span className="text-pink-500">Overview</span>
        </h1>
        <p className="text-gray-400 mt-2">
          Quick stats about your projects, comments, and contacts
        </p>
      </div>
<div>

</div>
      {/* Stats Cards */}
      <div className="flex flex-wrap justify-center gap-6 p-8 ">
        {stats.map((stats) => (
          <div
            key={stats.id}
            className="flex flex-col items-center justify-center p-6 rounded-2xl 
                       bg-[#232326] w-60 h-40 text-center"
          >
            <div className="mb-4">{stats.icon}</div>
            <h2 className="text-lg font-semibold">{stats.title}</h2>
            <p className="text-3xl font-bold text-pink-500 mt-2">{stats.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
