const Sequelize = require("sequelize");
const db = require("../config/sqlDB.js");
const JobOpening = require("./JobOpening");

const Applications = db.define(
  "divyangapplications",
  {
    appid: {
      type: Sequelize.INTEGER(9),
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: Sequelize.STRING,
      required: true,
    },
    jobid: {
      type: Sequelize.INTEGER(9),
      required: true,
    },
    employerid: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Applications;
