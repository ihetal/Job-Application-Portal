const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

SECRET_KEY = "secret_divyang";

router.post("/register", (req, res) => {
  let { firstname, lastname, email, password } = req.body;
  firstname =
    firstname.substring(0, 1).toUpperCase() +
    firstname.substring(1).toLowerCase();
  lastname =
    lastname.substring(0, 1).toUpperCase() +
    lastname.substring(1).toLowerCase();
  email = email.toLowerCase();
  Users.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(404).send({ responseMsg: "Cannot read database" });
    } else if (user) {
      res.status(401).send({ responseMsg: "Email already exists" });
    } else {
      bcrypt.hash(password, 12, (err, hashPassword) => {
        if (err) throw err;
        const newUser = new Users({
          firstname,
          lastname,
          email,
          password: hashPassword,
        });
        newUser
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

module.exports = router;
