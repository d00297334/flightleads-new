const express = require('express')
const router = express.Router()
const leadController = require('../controllers/leads')


// COLLECTION PATHS

// a get to `/expenses`
router.get('/', leadController.listLeads)
// a post to '/expenses'
router.post('/', leadController.createLead)


// ELEMENT PATHS

// a put to '/expenses/id'
router.put('/:id', leadController.updateLead)
// a delete to '/expense/id'
router.delete('/:id', leadController.deleteLead)
//a get to 'expenses/id'
router.get('/:id', leadController.getLead)

// export default router

module.exports = router
