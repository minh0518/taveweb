const { Sequelize } = require('sequelize');
const User = require('./user');
const Board = require('./board');
const Image = require('./image');
const Question = require('./question');
const Answer = require('./answer');
const Recruit = require('./recruit');
const Apply = require('./apply');
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

db.User = User;
db.Board = Board;
db.Image = Image;
db.Question = Question;
db.Answer = Answer;
db.Recruit = Recruit;
db.Apply = Apply;

db.Json = Json;
Json.init(sequelize);

User.init(sequelize);
Board.init(sequelize);
Image.init(sequelize);
Question.init(sequelize);
Answer.init(sequelize);
Recruit.init(sequelize);
Apply.init(sequelize);

User.associate(db);
Board.associate(db);
Image.associate(db);
Question.associate(db);
Answer.associate(db);
Recruit.associate(db);
Apply.associate(db);

module.exports = db;
