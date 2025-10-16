import Comments from "../models/commentModels.js";


export const createComments = async (req, res) => {
  try {
    const { name, comments } = req.body;

    // Basic validation
    if (!name || !comments) {
      return res.json({ success: false, message: "Name and comment are required" });
    }
    if (name.length < 3 || name.length > 30) {
      return res.json({ success: false, message: "Name must be between 3 and 30 characters" });
    }
    if (comments.length < 10 || comments.length > 500) {
      return res.json({ success: false, message: "Comment must be between 10 and 500 characters" });
    }
    // Save comment
    const comment = new Comments({ name, comments });
    await comment.save();
    res.json({ success: true, message: "Comment sent successfully"});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const createReplay = async (req, res) => {
  try {
    const { commentId, replayname, replay } = req.body;
    // Basic validation
    if (!commentId || !replayname || !replay) {
      return res.json({ success: false, message: "Comment ID, name and reply are required" });
    }
    if (replayname.length < 3 || replayname.length > 30) {
      return res.json({ success: false, message: "Name must be between 3 and 30 characters" });
    }
    if (replay.length < 10 || replay.length > 500) {
      return res.json({ success: false, message: "Reply must be between 10 and 500 characters" });
    }
    // Find comment
    const comment = await Comments.findById(commentId);
    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }

    // ✅ Add reply
    comment.replays.push({ replayname, replay });
    await comment.save();
    res.json({ success: true, message: "Reply sent successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comments.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: comments.length,
      commentData:comments,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
