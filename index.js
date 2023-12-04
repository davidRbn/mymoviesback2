const express = require('express');
const app = express()
const apiRouter = require('./apiRouter').router
const mysql = require('mysql');
const models = require('./models')
require('dotenv').config();

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/',apiRouter)

app.use(function(req, res) {
    res.header("Access-Control-Allow-Origin", "*"),
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  })

app.get('/',(req,res) =>{
    res.setHeader('Content-Type','text/html')
    res.status(200).send('<h1>Hello world</h1>')
})


models
    .sequelize
    .sync()
    .then(app.listen(process.env.PORT || 8080, () => {
        console.log('Server is running',process.env.PORT)
   

    }))
    .catch(error => {
        console.error('Error synchronizing Sequelize models:', error);
    });



