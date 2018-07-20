require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()




app.use(express.static(`${__dirname}/../client`))

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Databse Working")
    app.listen(3000)
  })
