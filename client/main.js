import data from './data.js'
import api from './helpers/api.js'

const app = new Vue({
    created() {
      api.getLeads()
        .then(leads => {
          this.leads = leads.reverse()
          this.filter()
        })
        .catch(e => console.log(e))
      },
    el: '#app',
    data,
    watch: {
      date(val) {
        if (val !== '')
          this.date = this.date
        },
      name(val) {
        if (val !== '')
          this.valid.name = this.validName()
          },
      email(val) {
        if (val !== '')
          this.valid.email = this.validEmail()
      },
      phone(val) {
        if (val !== '')
          this.valid.phone = this.validPhone()
        },
      },
    computed: {
        changeFormMenu() {
			return this.editingId === null ? 'New Lead' : 'Update Lead'
        },
        changeFormSubmit() {
            return this.editingId === null ? 'Create Lead' : 'Save Lead'
        }
    },

    methods: {
        addLead() {
            const lead = {
                name: this.name,
                date: this.formatDateForAPI(this.date),
                address: this.address,
                phone: this.phone,
                startTime: this.startTime,
                endTime: this.endTime,
                notes: this.notes,
                type: this.type,
                email: this.email,
            }
            const timeValid = this.isTimeValid()
            const isAvailable = this.isTimeAvailable()
            if (!timeValid) {
              this.invalidTimeDialog = true
            } else if (isAvailable) {
              api
                .addLead(lead)
                .then(lead => {
                  lead.date = this.formatDateForAPI(lead.date)
                  this.leads.unshift(lead)
                  this.storeAppt()
                  this.close()
                })
                .catch(e => {
                  console.log(e)
                  this.errorDialog = true
                })
            } else {
              this.errorDialog = true
            }
        },

        storeAppt() {
          const todaysAppointments = this.selectedAppts[this.date]
          const apptBlock = { startTime: this.startTime, endTime: this.endTime }
          if (!todaysAppointments) {
            this.selectedAppts[this.date] = [apptBlock]
          } else {
            todaysAppointments.push(apptBlock)
          }
        },

        isTimeAvailable() {
          const unavailableTimes = this.selectedAppts[this.date]
          if (!unavailableTimes) {
            return true
          }
          for (const index in unavailableTimes) {
            const { startTime, endTime } = unavailableTimes[index]
            const apptStartTime = unavailableTimes[index].startTime
            const apptEndTime = unavailableTimes[index].endTime

            if (
              this.getMomentTime(this.startTime).isBetween(
                this.getMomentTime(apptStartTime),
                this.getMomentTime(apptEndTime)
              ) ||
              this.getMomentTime(this.endTime).isBetween(
                this.getMomentTime(apptStartTime),
                this.getMomentTime(apptEndTime)
              )
            ) {
              return false
            }
          }
          return true
        },

        isTimeValid() {
          if (this.getMomentTime(this.endTime).isBefore(this.getMomentTime(this.startTime))) {
          return false
        } else return true
        },

        allowedHours(hour) {

          const availableHours = [0,1,2,3,6,8,9,10,11,12,13,14,16,17,18,19,20,21,22,23,24]
          const unavailableTimes = this.selectedAppts[this.date]
          for (const index in unavailableTimes) {
            const { startTime, endTime } = unavailableTimes[index]
            const apptStartTime = unavailableTimes[index].startTime
            const apptEndTime = unavailableTimes[index].endTime
          }
          // for (index in availableHours) {
          //   const available = isTimeAvailable(index)
          //   console.log('Hour ', index, 'is ', available)
          // }
          return availableHours.includes(hour)
        },
        //

        // allowedMinutes: v => !(v % 15),

        allowedMinutes(v) {
          const unavailableTimes = this.selectedAppts[this.date]
          return !(v %15)
        },

        getMomentTime(time) {
          return moment(time, 'HH:mm')
        },

        formatDate(date) {
            return moment.utc(date).format('dddd, MMMM Do, YYYY')
        },

        formatDateForAPI(date) {
            return moment.utc(date).format('YYYY-MM-DD')
        },

        restrictOldDates() {
          return this.formatDateForAPI()
        },

        setEditingId(id) {
            this.editingId = id
            this.formDialog = true
            const indexOfLead = this.leads.findIndex(lead => lead._id === id)
            this.name = this.leads[indexOfLead].name
            this.date = this.formatDateForAPI(this.leads[indexOfLead].date)
            this.startTime = this.leads[indexOfLead].startTime
            this.endTime = this.leads[indexOfLead].endTime
            this.phone = this.leads[indexOfLead].phone
            this.address = this.leads[indexOfLead].address
            this.email = this.leads[indexOfLead].email
            this.type = this.leads[indexOfLead].type
            this.notes = this.leads[indexOfLead].notes
        },

        updateLead(id) {
            const indexOfLead = this.leads.findIndex(lead => lead._id === id)
            const lead = this.leads[indexOfLead]
            lead.name = this.name
            lead.date = this.date
            lead.startTime = this.startTime
            lead.endTime = this.endTime
            lead.phone = this.phone
            lead.address = this.address
            lead.email = this.email
            lead.type = this.type
            lead.notes = this.notes

            api.updateLead(lead)
              .then(lead => {
                lead.show = false
                this.close()
                //don't forget to store appointment for validation
              })
              .catch(e => {
                console.log(e)
                //pull up a server error message right here... need to create
              })
        },

        saveLead() {
          const validForm = this.isValid()
          if (validForm && this.editingId) {
            console.log("Updating Lead")
            this.updateLead(this.editingId)
            this.startTime = null
            this.endTime = null
          } else if (validForm && !this.editingId) {
            console.log("Adding Lead")
            this.addLead()
          }
        },

        setDeletingId(id) {
          this.deletingId = id
          this.deleteDialog = true
          // const indexOfLead = this.leads.findIndex(lead => lead._id === id)

        },

        deleteLead() {
          const indexOfLead = this.leads.findIndex(lead => lead._id === this.deletingId)
          const lead = this.leads[indexOfLead]
          api
            .deleteLead(lead._id)
              .then(() => {
                this.leads.splice(this.leads.indexOf(lead),1)
                this.deleteDialog = false
                this.deletingId = null
                this.filter()
              })
            .catch(e => {
              console.log(e)
              this.errorDialog = true //change this to the right dialog later
            })
          // this.leads = this.leads.filter(lead => lead.id !== this.deletingId)
          // this.deleteDialog = false
          // this.deletingId = null
        },

        close() {
          this.clear()
          this.filter()
          this.formDialog = false
          this.editingId = null
        },

        validName() {
          return this.name !== '' && this.name.length <= 60
        },

        validEmail() {
          return this.email !== '' && /.+@.+/.test(this.email)
        },
        validPhone() {
          return this.phone !== '' && /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(this.phone)
        },

        isValid() {
          this.valid = {
            name: this.validName(),
            email: this.validEmail(),
            phone: this.validPhone(),
          }
          for(const key in this.valid) {
            if (!this.valid[key]) {
              return false
            }
          }
          return true
        },

        clear() {
            this.name = ''
            this.address = ''
            this.phone = ''
            this.date = null
            this.notes = ''
            this.startTime = null
            this.endTime = null
            this.type = ''
            this.email = ''
            this.valid.name = true
            this.valid.email = true
            this.valid.phone = true
        },

        showFilteredLeads() {
          return this.visible
        },

        filter() {
          this.visible = []
          const dates = this.filterDates()
          const filteredTypes = this.filterType()
          for (const index in filteredTypes) {
            if (dates.includes(filteredTypes[index])) {
              this.visible.push(filteredTypes[index])
            }
          }
          return this.visible
        },

        filterType() {
          this.filteredTypeLeads = []
          if (this.typeFilter === 'None') {
            this.filteredTypeLeads = this.leads.slice()
          }
          if (this.typeFilter === 'Videography') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].type === 'Videography') {
                this.filteredTypeLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.typeFilter === 'Photography') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].type === 'Photography') {
                this.filteredTypeLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.typeFilter === 'Land/Site Survey') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].type === 'Land/Site Survey') {
                this.filteredTypeLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.typeFilter === 'Real Estate') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].type === 'Real Estate') {
                this.filteredTypeLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.typeFilter === 'Outdoor/Extreme Sports - Event') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].type === 'Outdoor/Extreme Sports - Event') {
                this.filteredTypeLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.typeFilter === 'Outdoor/Extreme Sports - Personal') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].type === 'Outdoor/Extreme Sports - Personal') {
                this.filteredTypeLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.typeFilter === 'Other') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].type === 'Other') {
                this.filteredTypeLeads.push(this.leads[leadIndex])
              }
            }
          }
          return this.filteredTypeLeads
        },

        filterDates() {
          this.filteredDateLeads = []
          if (this.dateFilter === 'None') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].date >= this.formatDateForAPI()) {
                this.filteredDateLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.dateFilter === 'Today') {
            for (const leadIndex in this.leads) {
              const lead = this.leads[leadIndex].date
              if (this.formatDateForAPI(lead) === this.formatDateForAPI()) {
                this.filteredDateLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.dateFilter === 'This Week') {
            for (const leadIndex in this.leads) {
              if (moment(this.leads[leadIndex].date).isBetween(
                this.formatDateForAPI(),
                moment().add(7,'d')
                // this.formatDateForAPI().add(7, 'd')
              )) {
                this.filteredDateLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.dateFilter === 'This Month') {
            for (const leadIndex in this.leads) {
              if (moment(this.leads[leadIndex].date).isBetween(
                this.formatDateForAPI(),
                moment().add(30,'d')
                // this.formatDateForAPI().add(7, 'd')
              )) {
                this.filteredDateLeads.push(this.leads[leadIndex])
              }
            }
          }
          if (this.dateFilter === 'Past') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].date < this.formatDateForAPI()) {
                this.filteredDateLeads.push(this.leads[leadIndex])
              }
            }
          }
          return this.filteredDateLeads
        },

        toggleShow(id) {
          if (id === this.showId) {
            this.showId = null
          } else {
            this.showId = id
          }
        },

        shouldShowLead(id) {
          return (this.showId === id)
        },

        setMailInfo(id) {
          const indexOfLead = this.leads.findIndex(lead => lead._id === id)

          this.emailDialog = true
          this.to = this.leads[indexOfLead].email
          this.subject = `Flight Appointment Confirmation`
          this.text = `Hello ${this.leads[indexOfLead].name.split(' ').slice(0, -1).join(' ')},

This is just a friendly reminder that you have an upcoming drone flight appointment on ${this.formatDate(this.leads[indexOfLead].date)} at ${this.leads[indexOfLead].startTime}.
The type of drone flight requested is ${this.leads[indexOfLead].type}.

Please let us know if any details have changed, or if this time no longer works for, you by replying to this email or calling our number at the bottom.
We look forward to working with you.

~The Flight Leads Crew
notifications@FlightLeadsCRM.com
(801)989-3659`
        }
    }

})
