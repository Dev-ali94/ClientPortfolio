import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CommentsSection = () => {
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [replayname, setReplayName] = useState("");
  const [replay, setReplay] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { commentsData, fetchComments } = useContext(AppContext);

  // Submit comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comments/create-comment`, {
        name,
        comments,
      });
      if (!res.data.success) {
        setError(res.data.message);
      } else {
        setName("");
        setComments("");
        fetchComments();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error posting comment");
    } finally {
      setLoading(false);
    }
  };

  // Submit reply
  const handleReplaySubmit = async (e, commentId) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comments/create-replay`, {
        replayname,
        replay,
        commentId,
      });

      if (!res.data.success) {
        setError(res.data.message);
      } else {
        setReplayName("");
        setReplay("");
        setSelectedCommentId(null);
        fetchComments();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error posting reply");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      id="comments"
      className="w-full p-6 flex flex-col items-center gap-y-12 text-white"
    >
      {/* Heading */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl">
        <h2 className="text-3xl uppercase font-bold">Comments</h2>
        <p className="text-gray-300 leading-relaxed">
          Share your thoughts, feedback, or start a{" "}
          <span className="text-pink-800 font-semibold">conversation</span>.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full max-w-3xl bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Comment Form */}
      <div className="w-full max-w-3xl rounded-2xl bg-[rgb(40,40,45)] shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pink-800"
          />
          <textarea
            placeholder="Write your comment..."
            rows="4"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pink-800"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-full border-2 border-pink-800 text-sm font-medium hover:bg-pink-800/20 transition-all disabled:opacity-50"
          >
            <FaPaperPlane size={18} />{" "}
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>

      {/* Display Comments */}
      <div className="w-full max-w-3xl space-y-6">
        {commentsData.map((comment) => (
          <div
            key={comment._id}
            className="rounded-2xl bg-[rgb(40,40,45)] shadow-lg p-5"
          >
            {/* Comment */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full
               bg-pink-800 text-white font-bold text-lg">
                {comment.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-lg">{comment.name}</p>
                <p className="text-gray-300">{comment.comments}</p>

                {/* Toggle reply form button */}
                <button
                  onClick={() =>
                    setSelectedCommentId(
                      selectedCommentId === comment._id ? null : comment._id
                    )
                  }
                  className="mt-2 text-sm text-pink-800 hover:underline"
                >
                  {selectedCommentId === comment._id ? "Cancel" : "Reply"}
                </button>
              </div>
            </div>

            {/* Reply Form */}
            {selectedCommentId === comment._id && (
              <form
                onSubmit={(e) => handleReplaySubmit(e, comment._id)}
                className="mt-4 space-y-3 p-5 rounded-2xl bg-black/20 items-center"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={replayname}
                  onChange={(e) => setReplayName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pink-800"
                />
                <textarea
                  placeholder="Write a reply..."
                  rows="2"
                  value={replay}
                  onChange={(e) => setReplay(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-pink-800"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-full border-2 border-pink-800 text-white text-sm hover:bg-pink-800/20 transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Reply"}
                </button>
              </form>
            )}

            {/* Show Replies */}
            <div className="mt-4 space-y-3 pl-14 border-l-2 border-pink-800">
              {comment.replays?.map((replay) => (
                <div
                  key={replay.id}
                  className="flex items-start gap-3 bg-white/5 rounded-xl p-3"
                >
                   <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-800 text-white font-bold text-lg">
      {replay.replayname?.charAt(0).toUpperCase()}
    </div>
                  <div>
                    <p className="font-semibold">{replay.replayname}</p>
                    <p className="text-gray-300">{replay.replay}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentsSection;  