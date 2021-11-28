const { Sequelize } = require('sequelize');
const Question = require('./question');
const Answer = require('./answer');
const Json = require('./json');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/mysql')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Question = Question;
db.Answer = Answer;
db.Json = Json;

Question.init(sequelize);
Answer.init(sequelize);
Json.init(sequelize);

Question.associate(db);
Answer.associate(db);

module.exports = db;
