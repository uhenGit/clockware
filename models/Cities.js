// Sequelize model for cities table
const Sequelize = require("sequelize");
const db = require("../db/db");

const City = db.define("cities", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
City.sync().then(() => {
  console.log("cities table created");
});
module.exports = City;
