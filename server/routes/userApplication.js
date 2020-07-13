const express = require("express");
const router = express.Router();
const Applications = require("../models/Applications");
const middleware = require("../middleware/verifyToken");

router.post("/application", middleware.verifyToken, (req, res) => {
  const userid = req.payload.id;
  const { id, employerid } = req.body;

  Applications.findOne({
    where: {
      userid: userid,
      jobid: id,
      employerid: employerid,
    },
  }).then((application) => {
    if (application)
      return res.status(200).send({ responseMsg: "Already Applied" });
    else {
      Applications.create({
        userid: userid,
        jobid: id,
        employerid: employerid,
      })
        .then((application) => {
          res.status(200).send({ responseMsg: "Successfully Applied" });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(403)
            .send({ responseMsg: "Something went wrong while saving!" });
        });
    }
  });
});

module.exports = router;
