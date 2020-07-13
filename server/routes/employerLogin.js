const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Employer = require("../models/Employer");

SECRET_KEY = "secret_divyangemployer";

router.post("/registeremployer", (req, res) => {
  let { firstname, lastname, email, password, companyname } = req.body;
  firstname =
    firstname.substring(0, 1).toUpperCase() +
    firstname.substring(1).toLowerCase();
  lastname =
    lastname.substring(0, 1).toUpperCase() +
    lastname.substring(1).toLowerCase();
  email = email.toLowerCase();
  Employer.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(404).send({ responseMsg: "Cannot read database" });
    } else if (user) {
      res.status(401).send({ responseMsg: "Email already exists" });
    } else {
      bcrypt.hash(password, 12, (err, hashPassword) => {
        if (err) throw err;
        const newEmployer = new Employer({
          firstname,
          lastname,
          email,
          companyname,
          password: hashPassword,
        });
        newEmployer
          .save()
          .then((user) =>
            jwt.sign(
              { user: user.email, id: user.id },
              SECRET_KEY,
              {
                expiresIn: "1h",
              },
              (err, token) => {
                if (err) {
                  console.log(err);
                  res.status(404).send({ responseMsg: "Something went wrong" });
                }
                res.status(200).send({
                  responseMsg: "Success",
                  username: user.firstname,
                  token: token,
                });
              }
            )
          )
          .catch((err) => console.log(err));
      });
    }
  });
});

router.post("/employerlogin", (req, res) => {
  const { email, password } = req.body;
  Employer.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(404).send({ responseMsg: "Cannot read database" });
    } else if (!user) {
      return res.status(403).send({ responseMsg: "Email ID does not exists" });
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          jwt.sign(
            { user: user.email, id: user.id },
            SECRET_KEY,
            {
              expiresIn: "1h",
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).send({
                responseMsg: "Success",
                username: user.firstname,
                token: token,
              });
            }
          );
        } else {
          return res
            .status(403)
            .send({ responseMsg: "Password does not match" });
        }
      });
    }
  });
});

module.exports = router;
