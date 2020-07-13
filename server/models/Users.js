const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  address: {
    street: { type: String },
    door: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipcode: { type: Number },
  },
  workexperience: {
    type: String,
  },
  availabilitytime: {
    type: String,
  },
  summary: {
    type: String,
  },
  profilepicture: {
    type: String,
  },
  resume: {
    type: String,
  },
});

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
