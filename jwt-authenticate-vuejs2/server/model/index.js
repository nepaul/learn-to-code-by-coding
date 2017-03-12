const path = require('path');

const Sequelize = require('sequelize');


const DBClient = new Sequelize(
  config.DB.db, config.DB.user, config.DB.password, config.DB.options);

function load(name) {
  return DBClient.import(path.join(__dirname, name));
}


module.exports = {
  DBClient,

  User: load('User'),
}
