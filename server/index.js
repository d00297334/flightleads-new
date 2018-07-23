require('dotenv').config()

const express = require('express')
const nodeMailer = require('nodemailer')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()


//email stuff
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({entended: true}))

app.post('/send-email', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'box575.bluehost.com',
        port: 465,
        secure: true,
        auth: {
            user: 'notifications@flightleadscrm.com',
            pass: 'FLemail123!'
        }
    })
    let mailOptions = {
        from: "'Flight Leads' <notifications@flightleadscrm.com>",
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body,
        heml: req.body.body
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message %s sent: %s', info.messageId, info.response)
        res.render('index')
    })

})


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

const port = 3000
mongoose.connect(process.env.DB_URL)
  .then(() => {

    console.log("Databse Working")
    app.listen(port, function(req, res){
        console.log('server is running at port ', port)
    })

  })
