const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    comments: [
      {
        userid: { type: String, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        profilepicture: { type: String },
        comment: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;
