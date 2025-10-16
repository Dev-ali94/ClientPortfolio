import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  replayname: { type: String, required: true },
  replay: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comments: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replays: [replySchema]   
});

const Comments = mongoose.model("Comments", commentSchema);
export default Comments;
