// Sequelize model for masters table
const Sequelize = require("sequelize");
const db = require("../db/db");

const Master = db.define("masters", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rate: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
Master.associate = (models) => {
  Master.belongsTo(models.City, {
    foreignKey: "cityId",
  });
};
Master.sync().then(() => {
  console.log("masters table created");
});
module.exports = Master;
