// Sequelize model for orders table
const Sequelize = require("sequelize");
const db = require("../db/db");

const Order = db.define("orders", {
  client_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  master_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  clock_size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  time: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Order.sync().then(() => {
  console.log("masters table created");
});
module.exports = Order;
