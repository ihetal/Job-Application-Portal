const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

SECRET_KEY = "secret_divyang";

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email: email }, (err, user) => {
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
              console.log(token);
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
