const Sequelize = require('sequelize');
// const User = require('./user');
// const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
// const config = {
//     username: process.env.MYSQL_USER,
//     password: process.env.MYSQL_ROOT_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//     host: process.env.MYSQL_HOST,
//     dialect: 'mysql',
// };
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
