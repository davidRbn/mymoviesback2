const bcrypt = require('bcrypt')
const models = require('../models')
const jwtUtils = require('../utils/jwt.util')

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/


module.exports={

    register: (req,res) => {
        
        const email = req.body.email
        const username = req.body.username
        const password = req.body.password

        if(email == null || username == null || password == null){
            return res.status(400).json({'error': 'missing paramaters'})
        } 

        if(username.length >= 13 || username.length <= 4){
            return res.status(400).json({"error" : 'wrong username (must be length 5 - 12)'})

        };

        if (!EMAIL_REGEX.test(email)){
            return res.status(400).json({"error" : 'email is not valid'})
        }

        if (!PASSWORD_REGEX.test(password)){
            return res.status(400).json({"error" : 'password invalid must length 4 - 8 and include 1 number'})        

            }

        models
            .Users.findOne({attributes:['email'],where:{email : email}
        })
        .then((userFound) =>{
            if(!userFound){

                bcrypt.hash(password,5, (err, bcryptedPassword) => {
                    const newUser = models.Users.create({
                        email:email,
                        username:username,
                        password:bcryptedPassword,
                        isAdmin:0
                    })
                    .then(newUser => {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch((err) => {
                        return res.status(501).json({'error': 'cannot add user'})
                    })

                })
            }else{
                return res.status(409).json({'error':'user already exist'})
            }

        })
        .catch((err) => {
         return res.status(500).json({'error': 'unable to verify user'})
        })

    },
    login:(req,res) => {
        const email = req.body.email
        const password = req.body.password

        if(email == null || password == null){
            return res.status(400).json({'error': 'missing paramaters'})
        } 
        models.Users.findOne({
            where:{email:email}
        })
        .then((userFound) => {
            if(userFound){
                bcrypt.compare(password, userFound.password,(errBycrypt,resBycrypt)=>{
                    if(resBycrypt){
                        return res.status(200).json({
                            'userId':userFound.id,
                            'token':jwtUtils.generateTokenForUser(userFound)
                        })
                    }else{
                        return res.status(403).json({"error":"invalid password"})
                    }
                })

            }else{
                return res.status(404).json({'error':'user not exist in db'})
            }

        })
        .catch(err => {
            return res,status(500).json({'error':'unable to verify user'})
        })
    },
    getLogin : (req,res) => {

        console.log(res)

    }

}