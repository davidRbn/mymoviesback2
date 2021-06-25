const models = require('../models')
const jwtUtils = require('../utils/jwt.util')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports = {

    favoriPost : (req,res) => {
   console.log(req.body);
       //Getting auth header
        const headerAuth = req.headers['authorization']
        const id = jwtUtils.getUserId(headerAuth)
        const {userId,idMovie,typeMovie,img,title,details,description} = req.body
        models.Users.findOne({
            where: {id : id}
        })
        .then((userFound) => {
            if (userFound){
                models.Favoris.findOne({
                        attributes : ['idMovie'],
                        where : {
                           [Op.and] :[{idMovie : idMovie},{userId: id}] // verifier si idMovie et id user car sinon probleme!!!
                }})
                    .then(favori => {
                        if(!favori){
                            models.Favoris.create({
                                userId : userId,
                                idMovie : idMovie,
                                typeMovie : typeMovie,
                                img : img,
                                title: title,
                                details: details,
                                description: description
                            })
                            .then((favori) => {
                                res.json(favori)
                            })
                        }else{
                            res.status(409).json({'error' : 'Est déja dans la liste de vos favoris'})
                        }
                    })
            }else{
                res.status(404).json({'error' : 'user not found '})
            }
        })
        
    },

    favoriGet : (req,res,err) => {

       const userId = req.params.id

        models.Favoris.findAll({
            where : {userId : userId }
        }).then(favoris =>{
            if (favoris.length != 0){
            res.status(201).json(favoris)
            }else{
                res.json({'error': 'Vous n\'avez aucun favoris dans votre liste '})      
            }
        })
        
    },
    favoriDelete : (req,res) => {

        const idMovie = req.params.idMovie
        const idUser = req.params.idUser

        models.Favoris.destroy({
            where : {
            [Op.and] :[{idMovie : idMovie},{userId: idUser}]
        }})
        .then(movie => {
            if(movie > 0){
                res.status(201).json({'message':'Supprimé de ma liste de favoris'})
            }else{
                res.status(404).json({'error' : 'Une erreur est survenue'})
            }
        })
    }

}