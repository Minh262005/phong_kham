const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.model')(sequelize, Sequelize);
db.location = require('./location.model')(sequelize);
db.symptom = require('./symptom.model')(sequelize);
db.specialty = require('./specialty.model')(sequelize);
db.schedule = require('./schedule.model')(sequelize);
db.news = require('./news.model')(sequelize);

module.exports = db;
