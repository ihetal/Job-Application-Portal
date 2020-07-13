const express = require("express");
const router = express.Router();
const middleware = require("../middleware/verifyToken");
const { upload, uploadresume } = require("../utils/fileHandling.js");
const Users = require("../models/Users");

router.post("/upload", middleware.verifyToken, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("In err", err.message);
      res.status(403).send({ responseMsg: err.message });
    } else {
      const userid = req.payload.id;
      Users.updateOne(
        {
          _id: userid,
        },
        { profilepicture: req.file.key },
        (err, updated) => {
          if (err) {
            console.log(err);
            return res
              .status(404)
              .send({ responseMsg: "Something went wrong...!" });
          } else {
            res
              .status(200)
              .send({ responseMsg: "Success", file: req.file.key });
          }
        }
      );
    }
  });
});

router.post("/uploadresume", middleware.verifyToken, (req, res) => {
  uploadresume(req, res, (err) => {
    if (err) {
      console.log("In err", err.message);
      res.status(403).send({ responseMsg: err.message });
    } else {
      const userid = req.payload.id;
      Users.updateOne(
        {
          _id: userid,
        },
        { resume: req.file.key },
        (err, updated) => {
          if (err) {
            console.log(err);
            return res
              .status(404)
              .send({ responseMsg: "Something went wrong...!" });
          } else {
            console.log(req.file.key);
            res
              .status(200)
              .send({ responseMsg: "Success", file: req.file.key });
          }
        }
      );
    }
  });
});

module.exports = router;
