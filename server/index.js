require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const leadsRouter = require('./routes/leads')

app.use(bodyParser.json())




app.use('/leads', leadsRouter)

app.use(express.static(`${__dirname}/../client`))

app.use((req, res, next) => {
  if (req.error) {
    switch(req.error.name) {
    case 'ValidationError':
      res.status(422).json({
        message: req.error.message
      })
      break
      default:
      res.status(500).send()
    }
  } else {
    res.status(404).send()
  }
})

const options = {useNewUrlParser: true}

mongoose.connect(process.env.DB_URL, options)
  .then(() => {

    console.log("Databse Working")
    app.listen(5000)

  })
