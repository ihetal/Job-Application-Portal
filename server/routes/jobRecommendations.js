const express = require("express");
const router = express.Router();
const axios = require("axios");
let middleware = require("../middleware/verifyToken");
const JobOpening = require("../models/JobOpening");
const Applications = require("../models/Applications");

module.exports = router;

router.get("/jobrecommendation/:id", (req, response) => {
  const jobid = parseInt(req.params.id) - 1;
  console.log("In here", jobid);
  axios
    .get(`http://127.0.0.1:5000/jobrecommendations/${jobid}`)
    .then((res) => {
      if (res.data.length !== 0) {
        JobOpening.findAll({
          where: {
            id: res.data,
          },
        })
          .then((jobs) => {
            response.status(200).send({ jobs: jobs });
          })
          .catch((err) => {
            console.log(err);
            response.status(403);
          });
      } else {
        response.status(200).send({ jobs: [] });
      }
    })
    .catch((err) => console.log(err));
});

router.get(
  "/recommendations/applicationbased",
  middleware.getUserId,
  (req, response) => {
    let userid = req.payload.id;
    if (userid === undefined) {
      response.status(403).send({ jobs: [] });
    } else {
      Applications.findAll({
        where: {
          userid,
        },
        attributes: ["jobid"],
      }).then((jobids) => {
        let ids = [];
        jobids.forEach((id) => {
          ids.push(id.dataValues.jobid - 1);
        });
        axios
          .post("http://127.0.0.1:5000/applicationbased", ids)
          .then((res) => {
            if (res.data.length !== 0) {
              JobOpening.findAll({
                where: {
                  id: res.data,
                },
              })
                .then((jobs) => {
                  response.status(200).send({ jobs: jobs });
                })
                .catch((err) => {
                  console.log(err);
                  response.status(403);
                });
            } else {
              response.status(200).send({ jobs: [] });
            }
          })
          .catch((err) => {
            console.log("Unable to get recommendations!");
            response.status(403);
          });
      });
    }
  }
);
