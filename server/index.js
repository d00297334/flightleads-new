require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


app.use(express.static(`${__dirname}/../client`))

//console.log(processEnv.env.DB_URL)


//app.listen(3000)

mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(3000)
    })



    //in server
    //DB_URL = url npm start