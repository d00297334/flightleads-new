const express = require('express')
const router = express.Router()
const leadController = require('../controllers/leads')


// COLLECTION PATHS

// a get to `/leads`
router.get('/leads', leadController.listLeads)
// a post to '/leads'
router.post('/leads', leadController.createLead)


// ELEMENT PATHS

// a put to '/leads/id'
router.put('/leads/:id', leadController.updateLead)
// a delete to '/leads/id'
router.delete('/leads/:id', leadController.deleteLead)
//a get to 'leads/id'
router.get('/leads/:id', leadController.getLead)

// export default router

module.exports = router
