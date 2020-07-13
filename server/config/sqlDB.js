const Sequelize = require("sequelize");
const dbConfig = {};

module.exports = new Sequelize("jobs", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
