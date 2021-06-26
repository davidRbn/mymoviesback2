const express = require('express')
const usersCtrl = require('./routes/usersCtrl')
const favori = require('./routes/favori')
const cors = require('cors')



exports.router = (() => {
    const apiRouter= express.Router()
    apiRouter.use(cors())
     
    //Route USER

    apiRouter.route('/users/register').post(usersCtrl.register)
    apiRouter.route('/users/login').post(usersCtrl.login)

    // Route FAVORIS

    apiRouter.route('/favoris/:id').post(favori.favoriPost)
    apiRouter.route('/favoris/:id').get(favori.favoriGet)
    apiRouter.route('/favoris/:idMovie/:idUser').delete(favori.favoriDelete)



    return apiRouter

})();
