import data from './data.js'
import api from './helpers/api.js'

const app = new Vue({
    created() {
      api.getLeads()
        .then(leads => {
          this.leads = leads.reverse()
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
			return this._id === null ? 'New Lead' : 'Update Lead'
        },
        changeFormSubmit() {
            return this._id === null ? 'Create Lead' : 'Save Lead'
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
                  lead.show = false
                  lead.date = this.formatDateForAPI(lead.date)
                  lead.visible = true //ask what this is doing...??
                  this.leads.unshift(lead)
                  this.close()
                  this.storeAppt()
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

          const availableHours = [0,1,2,3,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
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
            return moment(date).format('dddd, MMMM Do, YYYY')
        },

        formatDateForAPI(date) {
            return moment(date).format('YYYY-MM-DD')
        },

        restrictOldDates() {
          return this.formatDateForAPI()
        },

        setEditingId(id) {
            this._id = id
            this.formDialog = true
            const indexOfLead = this.leads.findIndex(lead => lead._id === id)
            this.name = this.leads[indexOfLead].name
            this.date = this.leads[indexOfLead].date
            this.startTime = this.leads[indexOfLead].startTime
            this.endTime = this.leads[indexOfLead].endTime
            this.phone = this.leads[indexOfLead].phone
            this.address = this.leads[indexOfLead].address
            this.email = this.leads[indexOfLead].email
            this.type = this.leads[indexOfLead].type
            this.notes = this.leads[indexOfLead].notes
        },

        updateLead(id) {
            const indexOfLead = this.leads.findIndex(lead => lead._id === this._id)
            const lead = this.leads[indexOfLead]
            lead._id = this._id
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
          if (validForm && this._id) {
            this.updateLead()
          } else if (validForm) {
            this.addLead()
          }
        },

        setDeletingId(id) {
          this.deleteDialog = true
          this.deletingId = id
        },

        deleteLead(lead) {
          // const indexOfLead = this.leads.findIndex(lead => lead.id === this.deletingId)
          api
            .deleteLead(lead._id)
            .then(() => {
              this.leads.splice(this.leads.indexOf(lead),1)
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
          this.formDialog = false
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

        showFilteredDates() {
          if (this.dateFilter === 'None') {
            return this.leads
          }
          return this.filteredDateLeads
        },

        filterDates() {
          this.filteredDateLeads = []
          if (this.dateFilter === 'Today') {
            for (const leadIndex in this.leads) {
              if (this.leads[leadIndex].date === this.formatDateForAPI()) {
                this.filteredDateLeads.push(this.leads[leadIndex])
              }
            }
          }
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
          this.subject = `Flight Leads Confirmation`
          this.text = `${this.leads[indexOfLead].name.toUpperCase()},
you have a flight leads appointment on ${this.formatDate(this.leads[indexOfLead].date)} at ${this.leads[indexOfLead].startTime}.`
        }
    }

})
