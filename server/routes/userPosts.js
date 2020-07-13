const express = require("express");
const router = express.Router();
const Posts = require("../models/Posts");
const Users = require("../models/Users");
const middleware = require("../middleware/verifyToken");

router.get("/posts", (req, res) => {
  Posts.find({})
    .sort({ updatedAt: -1 })
    .exec((err, posts) => {
      if (err)
        return res.status(404).send({ responseMsg: "Unable to read database" });
      return res.status(200).send({ responseMsg: "Success", posts: posts });
    });
});
router.post("/addpost", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  const { topic, category, description } = req.body;
  Users.findOne({ _id: userid }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(404).send({ responseMsg: "Something went wrong" });
    }
    if (user) {
      const newPost = new Posts({
        topic,
        category,
        description,
        userid,
        firstname: user.firstname,
        lastname: user.lastname,
      });

      newPost
        .save()
        .then((newpost) => {
          let post = newpost.toObject();
          delete post.userid;
          res
            .status(200)
            .send({ responseMsg: "Successfully saved!", post: post });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).send({ responseMsg: "Something weng wrong" });
        });
    }
  });
});

router.put("/replypost", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  const { postid, comment } = req.body;
  Users.findOne({ _id: userid }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(404).send({ responseMsg: "Something went wrong" });
    }
    if (user) {
      newComment = {
        userid,
        firstname: user.firstname,
        lastname: user.lastname,
        profilepicture: user.profilepicture,
        comment: comment,
      };
      Posts.findOneAndUpdate(
        { _id: postid },
        { $push: { comments: newComment } },
        { new: true },
        (err, updatedpost) => {
          if (err) {
            console.log(err);
            return res
              .status(404)
              .send({ responseMsg: "Something went wrong" });
          }
          if (updatedpost) {
            return res
              .status(200)
              .send({ responseMsg: "Success", post: updatedpost });
          }
        }
      );
    }
  });
});

router.post("/searchposts", (req, res) => {
  const { search } = req.body;
  Posts.find({
    $or: [
      { topic: { $regex: ".*" + search + ".*" } },
      { description: { $regex: ".*" + search + ".*" } },
    ],
  })
    .sort({ updatedAt: -1 })
    .exec((err, posts) => {
      if (err) {
        return res.status(404).send({ responseMsg: "Unable to read database" });
      }
      return res.status(200).send({ responseMsg: "Success", posts: posts });
    });
});

module.exports = router;
