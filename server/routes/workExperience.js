const express = require("express");
const router = express.Router();
const middleware = require("../middleware/verifyToken");
const WorkExperience = require("../models/WorkExperience");

router.get("/workExperience", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  WorkExperience.find({ userid: userid }, { userid: 0 })
    .sort({ startyear: -1, startmonth: -1 })
    .exec((err, userWorkExperience) => {
      if (err)
        return res.status(404).send({ responseMsg: "Unable to read database" });
      return res
        .status(200)
        .send({ responseMsg: "Success", workExperience: userWorkExperience });
    });
});

router.post("/workExperience", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  const {
    title,
    employmenttype,
    company,
    startmonth,
    startyear,
    endmonth,
    endyear,
    description,
  } = req.body;
  const newWorkExperience = new WorkExperience({
    userid,
    title,
    employmenttype,
    company,
    startmonth,
    startyear,
    endmonth,
    endyear,
    description,
  });
  newWorkExperience
    .save()
    .then((workExperience) => {
      let experience = workExperience.toObject();
      delete experience.userid;
      res.status(200).send({
        responseMsg: "Successfully saved!",
        workExperience: experience,
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(403)
        .send({ responseMsg: "Something went wrong while saving!" });
    });
});

router.put("/workExperience", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  const {
    _id,
    title,
    employmenttype,
    company,
    startmonth,
    startyear,
    endmonth,
    endyear,
    description,
  } = req.body;
  console.log(_id);
  WorkExperience.updateOne(
    { _id, userid },
    {
      title,
      employmenttype,
      company,
      startmonth,
      startyear,
      endmonth,
      endyear,
      description,
    },
    (err, workExperience) => {
      if (err)
        return res
          .status(404)
          .send({ responseMsg: "Something went wrong...!" });
      return res
        .status(200)
        .send({ responseMsg: "Success", workExperience: workExperience });
    }
  );
});

router.delete("/workExperience/:id", middleware.verifyToken, (req, res) => {
  const _id = req.params.id;
  WorkExperience.findByIdAndDelete({ _id }, (err, removedRecord) => {
    if (err)
      return res.status(404).send({ responseMsg: "Something went wrong...!" });
    return res.status(200).send({ responseMsg: "Successfully deleted record" });
  });
});

module.exports = router;
