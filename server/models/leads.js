const mongoose = require('mongoose')
const moment = require('moment')

const leadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: moment().format('dddd, MMMM Do, YYYY'),
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Lead', leadSchema)
