'use-strict'

const models = require('../models')


module.exports = (sequelize, DataTypes) => {

    const Favori = sequelize.define('Favoris',{    
        idFavoris: {type : DataTypes.STRING, primaryKey: true,autoIncrement: true },
        userUid: DataTypes.STRING,
        idMovie : DataTypes.STRING , 
        typeMovie : DataTypes.STRING,
        img : DataTypes.STRING,
        title : DataTypes.STRING,
        details: DataTypes.STRING,
        description : DataTypes.TEXT,
        updatedAt : DataTypes.DATE,
        createdAt : DataTypes.DATE

    })


  return Favori
}


