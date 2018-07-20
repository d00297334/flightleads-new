const moment = require('client/moment')
const Lead = require('../models/leads')


module.exports = {
  //req is 'request' through client, res is 'respond' through server
  listLeads: (req, res, next) => {
    Lead.find()
      .then(leads => res.json(leads))
      .catch(e => {
        req.error = e
        next()
      })
  },

  createLead: (req, res, next) => {
    console.log(req.body)
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
        next()
      })
  },

  getLead: (req, res, next) => {
    Lead.findById(req.params.id)
      .then(lead => {
        if (lead === null) {
          res.status(404).send()
          return
        }})
      .then(() => res.json(lead))
      .catch(e => {
        req.error = e
        next()
      })
  },

  updateLead: (req, res, next) => {
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
  },
  deleteLead: (req, res, next) => {
    Lead.findByIdAndRemove(req.params.id)
      .then(() => res.status(204).send())
      .catch(e => {
        req.error = e
        next()
      })
  },
}
