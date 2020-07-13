const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  primaryphone: {
    type: Number,
  },
  secondaryphone: {
    type: Number,
  },
  companyname: {
    type: String,
    required: true,
  },

  companyaddress: {
    street: { type: String },
    street2: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipcode: { type: Number },
  },
});

const Employer = mongoose.model("Employer", EmployerSchema);

module.exports = Employer;
