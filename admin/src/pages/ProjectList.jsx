// ProjectList.jsx
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const ProjectList = () => {
  const { projectsData, setProjectsData, } = useContext(AppContext);

  const handleDelete = async (id) => {

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/project/${id}`);
      alert("Project deleted successfully!");
      setProjectsData((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Delete error:", error.message);
      alert("Something went wrong while deleting");
    }
  };


  return (
    <div className="w-full h-full bg-[#1a1a1d] text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-500">All Projects</h2>
      {projectsData.length === 0 ? (
        <p className="text-gray-400">Loading projects...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {projectsData.map((project, index) => (
            <div
              key={project._id || index}
              className="w-full h-[7vw] min-h-[120px] flex items-center 
                         bg-[#232326] rounded-xl p-4 border border-[#2e2e32]"
            >
              {/*Project Image */}
              <div className="w-[28%] h-full rounded-lg overflow-hidden bg-[#1a1a1d] 
              border border-[#333]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-container"
                />
              </div>
              {/*Title + Description */}
              <div className="flex-1 px-4 flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/*Delete Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
