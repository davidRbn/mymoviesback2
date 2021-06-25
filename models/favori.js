'use-strict'

const models = require('../models')


module.exports = (sequelize, DataTypes) => {

    const Favori = sequelize.define('Favoris',{    
        idFavoris: {type : DataTypes.STRING,autoIncrement : true, primaryKey: true},
        userId : {type: DataTypes.STRING},
        idMovie : DataTypes.STRING , 
        typeMovie : DataTypes.STRING,
        img : DataTypes.STRING,
        title : DataTypes.STRING,
        details: DataTypes.STRING,
        description : DataTypes.TEXT,
        updatedAt : DataTypes.DATE,
        createdAt : DataTypes.DATE

    })


    Favori.associate = models => {
        Favori.belongsTo(models.Users)
    }

  return Favori
}


