import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { FaTrash } from "react-icons/fa";


const CommentsSection = () => {
  const { commentsData } = useContext(AppContext);

  // Store hidden comment IDs in localStorage
  const [hiddenComments, setHiddenComments] = useState(
    JSON.parse(localStorage.getItem("hiddenComments")) || []
  );
  // Update localStorage whenever hiddenComments changes
  useEffect(() => {
    localStorage.setItem("hiddenComments", JSON.stringify(hiddenComments));
  }, [hiddenComments]);

  // Delete handler (UI only +  with localStorage)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to hide this comment?")) {
      setHiddenComments((prev) => [...prev, id]);
    }
  };
  // Filter out hidden comments
  const visibleComments = commentsData.filter(
    (comment) => !hiddenComments.includes(comment._id)
  );

  return (
    <div className="w-full h-full bg-[#1a1a1d] text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-500">Comments</h2>
      {/*vissable comment*/}
      {visibleComments.length === 0 ? (
        <p className="text-gray-400">No comments yet.</p>
      ) : (
        <div className="flex flex-col gap-5 rounded-2xl shadow-lg shadow-black/30 ">
          {visibleComments.map((comment) => (
            <div
              key={comment._id}
              className="rounded-xl bg-[#232326] border border-[#2e2e32] p-5 relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(comment._id)}
                className="absolute top-3 right-3 text-lg
                 text-red-500 hover:text-red-700 px-2 py-1 rounded"
              >
                <FaTrash />
              </button>
              {/* Main Comment */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center 
                rounded-full bg-pink-600 text-white font-bold">
                  {comment.name ? comment.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">
                    {comment.name}
                  </p>
                  <p className="text-gray-300 mt-1">{comment.comments}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Replies */}
              {comment.replays && comment.replays.length > 0 && (
                <div className="mt-4 space-y-3 pl-12 border-l border-pink-600/40">
                  {comment.replays.map((replay) => (
                    <div
                      key={replay.id}
                      className="flex items-start gap-3 bg-[#1a1a1d] border border-[#2e2e32] 
                      rounded-lg p-3"
                    >
                      <div className="w-10 h-10 flex items-center justify-center 
                rounded-full bg-pink-600 text-white font-bold">
                        {replay.replayname ? replay.replayname.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {replay.replayname}
                        </p>
                        <p className="text-gray-300">{replay.replay}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
