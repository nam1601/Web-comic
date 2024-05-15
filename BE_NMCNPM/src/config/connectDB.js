const { Sequelize } = require('sequelize');
// import Sequelize from 'sequelize';
const sequelize = new Sequelize('nettruyen', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  logging: false
});
let connectDB =async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
module.exports = connectDB;