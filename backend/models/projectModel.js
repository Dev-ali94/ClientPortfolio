import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String, 
      required: true,
    },

    //  Hero section
    hero: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      buttons: [ 
        {
          text: { type: String, required: true },
          link: { type: String, required: true },
        }
      ]
    },

    //  Project overview 
    overview: {
      content: { type: String, required: true },
    },

    //  Project results 
    results: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],

    //  Process section
    process: [
      {
        title: { type: String, required: true },
      },
    ],

    // Related articles 
    relatedArticles: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
