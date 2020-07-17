// Sequelize model for clients table
const Sequelize = require("sequelize");
const db = require("../db/db");

const Client = db.define("clients", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mail: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
Client.sync().then(() => {
  console.log("clients table created");
});
module.exports = Client;
