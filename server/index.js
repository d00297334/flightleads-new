require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const nodeMailer = require('nodemailer')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Lead = require('./models/leads')


//email stuff
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))


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
//const emailRouter = require('../client/Components/Form/form')

app.use(bodyParser.json())
app.use(express.static(`${__dirname}/../client`))
app.use(morgan('tiny'))
app.use('/leads', leadsRouter)
//app.use('/send-email', emailRouter)

app.get('/leads', (req, res, next) => {
  Lead.find()
    .then(leads => res.json(leads))
    .catch(e => {
      req.error = e
      next()
    }
  )
})

app.post('/leads', (req, res, next) => {

  Lead.create({
    name: req.body.name,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    type: req.body.type,
    notes: req.body.notes
  })
    .then(lead => res.status(201).json(lead))
    .catch(e => {
      req.error = e
      console.log(e)
      next()
    })
})

app.put('/leads/:id', (req, res, next) => {
  Lead.findByIdAndUpdate(req.params.id)
    .then(lead => {
      lead.name = req.body.name
      lead.date = req.body.date
      lead.startTime = req.body.startTime
      lead.endTime = req.body.endTime
      lead.address = req.body.address
      lead.phone = req.body.phone
      lead.email = req.body.email
      lead.type = req.body.type
      lead.notes = req.body.notes
      return lead.save()
    })
    .then(lead => res.json(lead))
    .catch(e => {
      req.error = e
      next()
    })
})


app.use('/leads', leadsRouter)

app.delete('/leads/:id', (req, res, next) => {
  Lead.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).send())
    .catch(e => {
      req.error = e
      next()
    })
})


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
    app.listen(3000)

  })
