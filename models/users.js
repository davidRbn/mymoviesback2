'use strict';

const models = require('../models')


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users',{
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  });

  User.associate = models => {
    User.hasMany(models.Favoris)
}


  return User;
};