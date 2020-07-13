const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const { uploadresume } = require("../utils/fileHandling.js");
let middleware = require("../middleware/verifyToken");

router.get("/profile/personalinfo", middleware.verifyToken, (req, res) => {
  const id = req.payload.id;

  Users.findOne({ _id: id }, (err, user) => {
    if (err) {
      return res.status(404).send({ responseMsg: "Something went wrong!" });
    }
    let userDetails = user.toObject();
    delete userDetails.password;
    res.status(200).send({ responseMsg: "Success", user: userDetails });
  });
});

router.post("/profile/personalinfo", middleware.verifyToken, (req, res) => {
  console.log("in personal info");
  let {
    title,
    firstname,
    lastname,
    email,
    primaryphone,
    secondaryphone,
    street,
    door,
    country,
    state,
    city,
    zipcode,
    workexperience,
    availabilitytime,
    summary,
  } = req.body;
  const address = {
    street: street,
    door: door,
    country: country,
    state: state,
    city: city,
    zipcode: zipcode,
  };
  Users.updateOne(
    { _id: req.payload.id },
    {
      title,
      firstname,
      lastname,
      email,
      primaryphone,
      secondaryphone,
      address,
      workexperience,
      availabilitytime,
      summary,
    },
    (err, user) => {
      if (err) {
        console.log(err);
        return res
          .status(404)
          .send({ responseMsg: "Something went wrong while updating!!!!!" });
      }
      res
        .status(200)
        .send({ responseMsg: "Success! Details have been saved...!" });
    }
  );
});

router.post("/profile/updatesummary", middleware.verifyToken, (req, res) => {
  uploadresume(req, res, (err) => {
    if (err) {
      console.log("err", err.message);
      res.status(403).send({ responseMsg: err.message });
    } else {
      const { summary } = req.body;
      const userid = req.payload.id;
      Users.updateOne(
        {
          _id: userid,
        },
        { resume: req.file.key, summary: summary },
        (err, updated) => {
          if (err) {
            console.log(err);
            return res
              .status(404)
              .send({ responseMsg: "Something went wrong...!" });
          } else {
            console.log(req.file.key);
            res.status(200).send({
              responseMsg: "Success! Details have been saved...!",
              file: req.file.key,
            });
          }
        }
      );
    }
  });
});

module.exports = router;
