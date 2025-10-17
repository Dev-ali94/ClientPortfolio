import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CommentsSection = () => {
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [replayName, setReplayName] = useState("");
  const [replay, setReplay] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { commentsData, fetchComments } = useContext(AppContext);

  // Refs for animation
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const commentRefs = useRef([]);
  // Inside the component
const commentFormRef = useRef(null);
const replyFormRefs = useRef([]);
replyFormRefs.current = [];

  // Clear comment refs before rendering
  commentRefs.current = [];

  // GSAP animation
  useEffect(() => {
    if (!commentsData || commentsData.length === 0) return;
// Animate comment form
if (commentFormRef.current) {
  gsap.from(commentFormRef.current, {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 0.8,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: commentFormRef.current,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
}

// Animate reply forms
replyFormRefs.current.forEach((form, i) => {
  gsap.from(form, {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 0.7,
    delay: i * 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: form,
      start: "top 95%",
      toggleActions: "play none none reverse",
    },
  });
});

    // Animate heading
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Animate paragraph
    if (paragraphRef.current) {
      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.85,
        duration: 1,
        delay: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Animate comment cards
    commentRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });



    ScrollTrigger.refresh();
  }, [commentsData]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/create-comment`,
        { name, comments }
      );
      if (!res.data.success) setError(res.data.message);
      else {
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

  // Handle reply submission
  const handleReplaySubmit = async (e, commentId) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/comments/create-replay`,
        { replayname: replayName, replay, commentId }
      );
      if (!res.data.success) setError(res.data.message);
      else {
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
      ref={sectionRef}
      className="w-full px-4 sm:px-6 py-8 flex flex-col items-center gap-y-12 text-white"
    >
      {/* Heading */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-3xl">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl uppercase font-bold"
        >
          Comments
        </h2>
        <p
          ref={paragraphRef}
          className="text-gray-300 leading-relaxed max-w-xl"
        >
          Share your thoughts, feedback, or start a{" "}
          <span className="text-pink-800 font-semibold">conversation</span>.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="w-full max-w-3xl bg-red-600/20 border border-red-600 text-red-400 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Comment Form */}
      <div ref={commentFormRef} className="w-full max-w-3xl rounded-2xl bg-[rgb(40,40,45)] shadow-lg p-4 sm:p-6">
        <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
        <form onSubmit={handleCommentSubmit} className="space-y-4 min-h-[150px]">
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
            <FaPaperPlane size={18} /> {loading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>

      {/* Comment List */}
      <div className="w-full max-w-3xl space-y-6">
        {commentsData.map((comment, i) => (
          <div
            key={comment._id}
            ref={(el) => el && commentRefs.current.push(el)}
            className="rounded-2xl bg-[rgb(40,40,45)] shadow-lg p-4 sm:p-5"
          >
            <div className="flex flex-wrap sm:flex-nowrap items-start gap-4">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
              rounded-full bg-pink-800 text-white font-bold text-lg">
                {comment.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg break-words">{comment.name}</p>
                <p className="text-gray-300 whitespace-pre-wrap break-words">
                  {comment.comments}
                </p>
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
              ref={(el) => el && replyFormRefs.current.push(el)}
                onSubmit={(e) => handleReplaySubmit(e, comment._id)}
                className="mt-4 space-y-3 p-4 sm:p-5 rounded-2xl bg-black/20"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={replayName}
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

            {/* Replies */}
            <div className="mt-4 space-y-3 sm:pl-14 pl-6 border-l-2 border-pink-800">
              {comment.replays?.map((replyItem) => (
                <div
                  key={replyItem.id}
                  className="flex flex-wrap sm:flex-nowrap items-start gap-3 bg-white/5 rounded-xl p-3"
                >
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-pink-800 text-white font-bold text-lg">
                    {replyItem.replayname?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold break-words">{replyItem.replayname}</p>
                    <p className="text-gray-300 whitespace-pre-wrap break-words">
                      {replyItem.replay}
                    </p>
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
