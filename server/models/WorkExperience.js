const mongoose = require("mongoose");

const WorkExperienceSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  employmenttype: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startmonth: {
    type: Number,
    required: true,
  },
  startyear: {
    type: Number,
    required: true,
  },
  endmonth: {
    type: String,
  },
  endyear: {
    type: String,
  },
  description: {
    type: String,
  },
});

const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema);

module.exports = WorkExperience;
