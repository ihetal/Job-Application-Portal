const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
  startyear: {
    type: String,
    required: true,
  },
  endyear: {
    type: String,
    required: true,
  },
  activities: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Education = mongoose.model("Education", EducationSchema);

module.exports = Education;
