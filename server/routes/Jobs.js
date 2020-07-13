const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JobOpening = require("../models/JobOpening");
const Applications = require("../models/Applications");
const Users = require("../models/Users");
const sqldb = require("../config/sqlDB");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
let middleware = require("../middleware/verifyToken");

router.get("/jobs", (req, res) => {
  JobOpening.findAll()
    .then((openings) => {
      res.status(200);
    })
    .catch((err) => {
      if (err) throw err;
    });
});
router.post("/paginatedjobs", middleware.getUserId, (req, res) => {
  console.log("paginated");
  let userid = req.payload.id;
  if (userid === undefined) {
    userid = null;
  }
  let { title, city, state, country, page } = req.body;
  if (title === undefined || title === "") {
    title = "%";
  }
  if (country === undefined || country === "") {
    country = "%";
  }
  if (state === undefined || state === "") {
    state = "%";
  }
  if (city === undefined || city === "") {
    city = "%";
  }

  JobOpening.hasMany(Applications, { foreignKey: "jobid" });
  JobOpening.findAll({
    where: {
      title: {
        [Op.like]: "%" + title + "%",
      },
      city: {
        [Op.like]: "%" + city + "%",
      },
      state: {
        [Op.like]: "%" + state + "%",
      },
      country: {
        [Op.like]: "%" + country + "%",
      },
    },
    include: [
      {
        model: Applications,
        where: {
          userid: userid,
        },
        attributes: ["userid"],
        required: false,
      },
    ],
    limit: 10,
    offset: (page - 1) * 10,
  }).then((openings) => {
    res.status(200).send({ openings: openings });
  });
});
router.post("/searchjobs", middleware.getUserId, (req, res) => {
  let userid = req.payload.id;
  if (userid === undefined) {
    userid = null;
  }
  let { title, city, state, country } = req.body;
  console.log(city);
  if (title === undefined || title === "") {
    title = "%";
  }
  if (country === undefined || country === "") {
    country = "%";
  }
  if (state === undefined || state === "") {
    state = "%";
  }
  if (city === undefined || city === "") {
    city = "%";
  }

  JobOpening.hasMany(Applications, { foreignKey: "jobid" });

  const promise1 = JobOpening.findAll({
    where: {
      title: {
        [Op.like]: "%" + title + "%",
      },
      city: {
        [Op.like]: "%" + city + "%",
      },
      state: {
        [Op.like]: "%" + state + "%",
      },
      country: {
        [Op.like]: "%" + country + "%",
      },
    },
    attributes: [[Sequelize.fn("count", Sequelize.col("id")), "count"]],
  });
  const promise2 = JobOpening.findAll({
    where: {
      title: {
        [Op.like]: "%" + title + "%",
      },
      city: {
        [Op.like]: "%" + city + "%",
      },
      state: {
        [Op.like]: "%" + state + "%",
      },
      country: {
        [Op.like]: "%" + country + "%",
      },
    },
    include: [
      {
        model: Applications,
        where: {
          userid: userid,
        },
        attributes: ["userid"],
        required: false,
      },
    ],
    limit: 10,
  });
  Promise.all([promise1, promise2])
    .then(([result1, result2]) => {
      res
        .status(200)
        .send({ totalpages: result1[0].dataValues.count, openings: result2 });
    })
    .catch((err) => {
      console.log(err);
      res.status(403).send({ responseMsg: "Something went wrong!" });
    });
  // JobOpening.findAll({
  //   where: {
  //     title: {
  //       [Op.like]: "%" + title + "%",
  //     },
  //     city: {
  //       [Op.like]: "%" + city + "%",
  //     },
  //     state: {
  //       [Op.like]: "%" + state + "%",
  //     },
  //     country: {
  //       [Op.like]: "%" + country + "%",
  //     },
  //   },
  //   include: [
  //     {
  //       model: Applications,
  //       where: {
  //         userid: userid,
  //       },
  //       attributes: ["userid"],
  //       required: false,
  //     },
  //   ],
  // }).then((openings) => {
  //   res.status(200).send({ openings: openings });
  // });
});

router.get("/popularjobs", (req, res) => {
  sqldb
    .query(
      "SELECT jobid FROM `divyangapplications` group by jobid order by count(*) desc limit 10; ",
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    )
    .then((result) => {
      id = [];
      result.forEach((jobs) => {
        id.push(jobs.jobid);
      });
      JobOpening.findAll({
        where: {
          id: id,
        },
      })
        .then((openings) => {
          res.status(200).send({ responseMsg: "Success", openings: openings });
        })
        .catch((err) => {
          if (err) throw err;
        });
    });
});

router.get("/fetchapplications", middleware.verifyEmployerToken, (req, res) => {
  const id = req.payload.id;

  JobOpening.findAll({ where: { employerid: id } })
    .then((applications) => {
      res
        .status(200)
        .send({ responseMsg: "Success", applications: applications });
    })
    .catch((err) => {
      if (err) throw err;
    });
});
router.post("/addopening", middleware.verifyEmployerToken, (req, res) => {
  const id = req.payload.id;
  let {
    title,
    jobtype,
    description,
    companyname,
    companydescription,
    applicationurl,
    country,
    state,
    city,
  } = req.body;
  const newJobOpening = new JobOpening({
    title,
    jobtype,
    description,
    companyname,
    companydescription,
    applicationurl,
    country,
    state,
    city,
    employerid: id,
  });
  newJobOpening
    .save()
    .then((jobopening) => {
      res.status(200).send({
        responseMsg: "Success",
        jobopening: jobopening,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ responseMsg: "Something went wrong" });
    });
});

router.get(
  "/viewapplicants/:id",
  middleware.verifyEmployerToken,
  (req, res) => {
    const jobid = req.params.id;
    const employerid = req.payload.id;
    Applications.findAll({
      where: {
        jobid: jobid,
        employerid: employerid,
      },
      attributes: ["userid"],
    }).then((result) => {
      applicantsprofile = [];
      for (const applicant of result) {
        applicantsprofile.push(applicant.dataValues.userid);
      }

      Users.find(
        { _id: { $in: applicantsprofile } },
        { password: 0 },
        (err, user) => {
          if (err) {
            return res
              .status(404)
              .send({ responseMsg: "Something went wrong!" });
          } else {
            res.status(200).send({ responseMsg: "Success", applicants: user });
          }
        }
      );
    });
  }
);

module.exports = router;
