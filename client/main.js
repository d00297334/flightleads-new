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
                show: this.show,
                name: this.name,
                address: this.address,
                phone: this.phone,
                date: this.date,
                notes: this.notes,
                startTime: this.endTime,
                endTime: this.endTime,
                type: this.type,
                email: this.email,
                id: Math.random(),
                visible: true
            }

            const isAvailable = this.isTimeAvailable()
            if (isAvailable) {
              this.storeAppt()
              this.leads.unshift(lead)
              this.clear()
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

        allowedHours(hour) {

          const availableHours = [0,1,2,3,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
          // const unavailableTimes = this.selectedAppts[this.date]
          // for (const index in unavailableTimes) {
          return availableHours.includes(hour)
        },
        //
        // allowedMinutes: v => !(v % 15),

        allowedMinutes(v) {
          const unavailableTimes = this.selectedAppts[this.date]
          return !(v %15)
        },

        formatDate(date) {
            return moment(date).format('ddd, MMMM-Do-YYYY')
        },

        setEditingId(id) {
            this.id = id
            this.formDialog = true
            const indexOfLead = this.leads.findIndex(lead => lead.id === id)
            this.name = this.leads[indexOfLead].name
            this.date = this.leads[indexOfLead].date
            this.time = this.leads[indexOfLead].time
            this.phone = this.leads[indexOfLead].phone
            this.address = this.leads[indexOfLead].address
            this.email = this.leads[indexOfLead].email
            this.type = this.leads[indexOfLead].type
            this.notes = this.leads[indexOfLead].notes
            this.show = this.leads[indexOfLead].show
          
        },

        updateLead(id) {
            const indexOfLead = this.leads.findIndex(lead => lead.id === id)
      			const updatedLead = {
              show: false,
      				id: this.id,
      				name: this.name,
              date: this.date,
              time:this.time,
              phone: this.phone,
              address: this.address,
              email: this.email,
              type: this.type,
              notes: this.notes,
              
            }
            this.leads[indexOfLead] = updatedLead
        },

        saveLead() {
            if (this.id !== null) {
                this.updateLead(this.id)
                
                this.close()
            } else {
                this.addLead()
                this.close()
            }
        },

        deleteLead(lead) {
            this.leads.splice(this.leads.indexOf(lead), 1)
        },

        close() {
            this.clear()
            this.formDialog = false
        },

        clear() {
            this.name = ''
            this.address = ''
            this.phone = ''
            this.date = null
            this.notes = ''
            this.time = null
            this.type = null
            this.email = ''
            this.id = null
            this.show = false
        }
    }

})
