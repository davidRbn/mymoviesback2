'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env ='production';
const config = require(__dirname + '/../config/config.json')[env];
require('dotenv').config();



const db = {};
// console.log('NODE_ENV:', process.env.NODE_ENV);
// console.log('config.use_env_variable:', config.use_env_variable);
// console.log(env);
//test1
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
//   const sequelizeURL = process.env[config.use_env_variable]
// console.log(sequelizeURL,'hello')
// sequelize = new Sequelize(sequelizeURL,config)
} else {
  console.log('test');
  sequelize = new Sequelize(config.database, config.username, config.password,{
    host:'localhost',
    dialect:'mysql'
  });

}

console.log();

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
