import data from './data.js'

const app = new Vue({
    el: '#app',
    data,
    methods: {
      validEmail() {
        return this.email !== '' && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email)
      },

      isValid() {
        this.valid = {
          email: this.validEmail()
      }
      for(const key in this.valid) {
        if (!this.valid[key]) {
          return false
        }
      }
      return true
    },

        addLead() {
            const lead = {
                show: false,
                name: this.name,
                address: this.address,
                phone: this.phone,
                date: this.date,
                notes: this.notes,
                time: this.time,
                type: this.type,
                email: this.email
              }
            },
        deleteLead(lead) {
          this.leads.splice(this.leads.indexOf(lead), 1)
          },
        editLead(lead) {
          this.editedLead = lead

        },




        }

})
