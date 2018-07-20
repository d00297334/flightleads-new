import data from './data.js'


const app = new Vue({
    el: '#app',
    data,
    watch: {
      date(val) {
        if (val !== '')
          this.date = this.date
        }
      },
    computed: {
        changeFormMenu() {
			return this.id === null ? 'New Lead' : 'Update Lead'
        },
        changeFormSubmit() {
            return this.id === null ? 'Create Lead' : 'Save Lead'
        }
    },
    methods: {
        addLead() {
            const lead = {
                show: false,
                name: this.name,
                date: this.date,
                address: this.address,
                phone: this.phone,
                startTime: this.startTime,
                endTime: this.endTime,
                notes: this.notes,
                type: this.type,
                email: this.email,
                id: Math.random(),
                visible: true
            }
            const timeValid = this.isTimeValid()
            const isAvailable = this.isTimeAvailable()
            if (timeValid) {
              if (isAvailable) {
                this.storeAppt()
                this.leads.unshift(lead)
                this.close()
                this.clear()
              } else {
                this.errorDialog = true
              }
            } else {
              this.invalidTimeDialog = true
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
              moment(this.startTime, 'HH:mm').isBetween(
                moment(apptStartTime, 'HH:mm'),
                moment(apptEndTime, 'HH:mm')
              ) ||
              moment(this.endTime, 'HH:mm').isBetween(
                moment(apptStartTime, 'HH:mm'),
                moment(apptEndTime, 'HH:mm')
              )
            ) {
              return false
            }
          }
          return true
        },

        isTimeValid() {
          if (moment(this.endTime, 'HH:mm').isBefore(moment(this.startTime, 'HH:mm'))) {
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

        formatDate(date) {
            return moment(date).format('dddd, MMMM Do, YYYY')
        },

        setEditingId(id) {
            this.id = id
            this.formDialog = true
            const indexOfLead = this.leads.findIndex(lead => lead.id === id)
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
            const indexOfLead = this.leads.findIndex(lead => lead.id === id)
            this.leads[indexOfLead].id = this.id
            this.leads[indexOfLead].name = this.name
            this.leads[indexOfLead].date = this.date
            this.leads[indexOfLead].startTime = this.startTime
            this.leads[indexOfLead].endTime = this.endTime
            this.leads[indexOfLead].phone = this.phone
            this.leads[indexOfLead].address = this.address
            this.leads[indexOfLead].email = this.email
            this.leads[indexOfLead].type = this.type
            this.leads[indexOfLead].notes = this.notes
            this.leads[indexOfLead].show = false
            this.close()

        },

        restrictOldDates() {
          var today = moment(Date.now().format('YYYY-MM-DD'))
          return today.toString()
        },

        saveLead() {
            if (this.id !== null) {
                this.updateLead(this.id)
            } else {
                this.addLead()
            }
        },

        setDeletingId(id) {
          this.deleteDialog = true
          this.deletingId = id
        },

        deleteLead(lead) {
          // const indexOfLead = this.leads.findIndex(lead => lead.id === this.deletingId)
          this.leads.splice(this.leads.indexOf(lead), 1)
          // this.leads = this.leads.filter(lead => lead.id !== this.deletingId)
          // this.deleteDialog = false
          // this.deletingId = null
        },

        close() {
          this.clear()
          this.formDialog = false
        },

        clear() {
            this.name = ''
            this.address = ''
            this.phone = null
            this.date = null
            this.notes = ''
            this.startTime = null
            this.endTime = null
            this.type = ''
            this.email = null
            this.id = null
        },

        showFilteredDates() {
          if (this.dateFilter === 'None') {
            return this.leads
          }
          return this.filteredDateLeads
        },

        filterDates() {
          this.filteredDateLeads = []
          const today = moment(new Date()).format('dddd, MMMM-Do-YYYY')
          if (this.dateFilter === 'Today') {
            for (const leadIndex in this.leads) {
              if (moment(this.leads[leadIndex].date).format('dddd, MMMM-Do-YYYY') === today) {
                this.filteredDateLeads.push(this.leads[leadIndex])
              }
            }
          }
        },

        toggleShow(lead) {
          lead.show = !lead.show

        }
    }

})
