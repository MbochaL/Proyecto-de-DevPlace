const Sequelize = require('sequelize');
const db = new Sequelize('mysql://root:@localhost:3306/store')

module.exports = db;