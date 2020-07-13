const express = require("express");
const router = express.Router();
const Employer = require("../models/Employer");
let middleware = require("../middleware/verifyToken");

router.get("/employerinfo", middleware.verifyEmployerToken, (req, res) => {
  const id = req.payload.id;

  Employer.findOne({ _id: id }, (err, user) => {
    if (err) {
      return res.status(404).send({ responseMsg: "Something went wrong!" });
    }
    let employerDetails = user.toObject();
    delete employerDetails.password;
    res.status(200).send({ responseMsg: "Success", user: employerDetails });
  });
});

router.post("/employerinfo", middleware.verifyEmployerToken, (req, res) => {
  console.log(req.body);
  let {
    companyname,
    firstname,
    lastname,
    email,
    primaryphone,
    secondaryphone,
    street,
    street2,
    country,
    state,
    city,
    zipcode,
  } = req.body;
  const companyaddress = {
    street: street,
    street2: street2,
    country: country,
    state: state,
    city: city,
    zipcode: zipcode,
  };
  Employer.updateOne(
    { _id: req.payload.id },
    {
      companyname,
      firstname,
      lastname,
      email,
      primaryphone,
      secondaryphone,
      companyaddress,
    },
    (err, user) => {
      if (err)
        return res
          .status(404)
          .send({ responseMsg: "Something went wrong while updating!!!!!" });
      res
        .status(200)
        .send({ responseMsg: "Success! Details have been saved...!" });
    }
  );
});

module.exports = router;
