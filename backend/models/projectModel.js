import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false, // ❌ was true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },

    // Hero section
    hero: {
      title: { type: String, required: false },
      description: { type: String, required: false },
      buttons: [
        {
          text: { type: String, required: false },
          link: { type: String, required: false },
        },
      ],
    },

    // Project overview
    overview: {
      content: { type: String, required: false },
    },

    // Project results
    results: [
      {
        title: { type: String, required: false },
        desc: { type: String, required: false },
      },
    ],

    // Process section
    process: [
      {
        title: { type: String, required: false },
      },
    ],

    // Related articles
    relatedArticles: [
      {
        title: { type: String, required: false },
        link: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
