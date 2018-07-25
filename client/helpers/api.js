const getLeads = () =>
  fetch('/leads')
    .then(res => res.json())


const addLead = lead =>
  fetch('/leads', {
    method: 'POST',
    body: JSON.stringify(lead),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())

const updateLead = updatedLead =>
  fetch(`/leads/${updatedLead._id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedLead),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())


const deleteLead = id =>
  fetch(`/leads/${id}`, {
    method: 'DELETE'
  })


export default {
  getLeads,
  addLead,
  updateLead,
  deleteLead
 }
