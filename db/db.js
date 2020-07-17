const Sequelize = require("sequelize");
const config = require("config");

const dbConfig = config.get("connection.db");
const connectionString = `postgres://${dbConfig.dbUser}:${dbConfig.dbPass}@${dbConfig.host}/${dbConfig.dbName}`;
module.exports = new Sequelize(connectionString);
