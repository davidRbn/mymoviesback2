'use-strict'

const models = require('../models')


module.exports = (sequelize, DataTypes) => {

    const Favori = sequelize.define('Favoris',{    
        idFavoris: {type : DataTypes.STRING, primaryKey: true},
        idMovie : DataTypes.STRING , 
        typeMovie : DataTypes.STRING,
        img : DataTypes.STRING,
        title : DataTypes.STRING,
        details: DataTypes.STRING,
        description : DataTypes.TEXT,
        updatedAt : DataTypes.DATE,
        createdAt : DataTypes.DATE

    })

 //model favori
    
    Favori.associate = models => {
        Favori.belongsTo(models.Users, {
            foreignKey: {
                name: 'UserId',
                allowNull: false, // ou false en fonction de vos besoins
            },
        })
    }

  return Favori
}


