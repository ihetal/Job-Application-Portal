const express = require("express");
const router = express.Router();
const middleware = require("../middleware/verifyToken");
const Education = require("../models/Education");

router.get("/userEducation", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  Education.find({ userid: userid }, { userid: 0 })
    .sort({ startyear: -1 })
    .exec((err, userEducation) => {
      if (err)
        return res.status(404).send({ responseMsg: "Unable to read database" });
      return res
        .status(200)
        .send({ responseMsg: "Success", userEducation: userEducation });
    });
});

router.post("/userEducation", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  const {
    institution,
    degree,
    major,
    grade,
    startyear,
    endyear,
    activities,
    description,
  } = req.body;
  const newEducation = new Education({
    userid,
    institution,
    degree,
    major,
    grade,
    startyear,
    endyear,
    activities,
    description,
  });
  newEducation
    .save()
    .then((userEducation) => {
      let education = userEducation.toObject();
      delete education.userid;
      res
        .status(200)
        .send({ responseMsg: "Successfully saved!", userEducation: education });
    })
    .catch((err) => {
      res
        .status(403)
        .send({ responseMsg: "Something went wrong while saving!" });
    });
});

router.put("/userEducation", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  const {
    _id,
    institution,
    degree,
    major,
    grade,
    startyear,
    endyear,
    activities,
    description,
  } = req.body;
  Education.updateOne(
    { _id, userid },
    {
      institution,
      degree,
      major,
      grade,
      startyear,
      endyear,
      activities,
      description,
    },
    (err, userEducation) => {
      if (err)
        return res
          .status(404)
          .send({ responseMsg: "Something went wrong...!" });
      return res
        .status(200)
        .send({ responseMsg: "Success", userEducation: userEducation });
    }
  );
});

router.delete("/userEducation/:id", middleware.verifyToken, (req, res) => {
  const _id = req.params.id;
  Education.findByIdAndDelete({ _id }, (err, removedRecord) => {
    if (err)
      return res.status(404).send({ responseMsg: "Something went wrong...!" });
    return res.status(200).send({ responseMsg: "Successfully deleted record" });
  });
});

module.exports = router;
