const Sequelize = require("sequelize");
const db = require("../config/sqlDB.js");

const JobOpening = db.define(
  "divyangjobs",
  {
    id: {
      type: Sequelize.INTEGER(9),
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING(150),
      required: true,
    },
    description: {
      type: Sequelize.STRING(1000),
      required: true,
    },
    jobtype: {
      type: Sequelize.STRING(150),
      required: true,
    },
    country: {
      type: Sequelize.STRING(150),
      required: true,
    },
    state: {
      type: Sequelize.STRING(150),
    },
    city: {
      type: Sequelize.STRING(150),
    },
    applicationurl: {
      type: Sequelize.INTEGER(),
    },
    companyname: {
      type: Sequelize.INTEGER(),
    },
    companydescription: {
      type: Sequelize.INTEGER(),
    },
    employerid: {
      type: Sequelize.STRING(),
    },
    timestamp: {
      type: "TIMESTAMP",
    },
  },
  {
    timestamps: false,
  }
);

module.exports = JobOpening;
