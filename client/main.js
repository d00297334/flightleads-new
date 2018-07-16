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
    methods: {
        addLead() {
            const lead = {
                show: false,
                name: this.name,
                address: this.address,
                phone: this.phone,
                date: this.date,
                notes: this.notes,
                startTime: this.endTime,
                endTime: this.endTime,
                type: this.type,
                email: this.email

            }
            const isAvailable = this.isTimeAvailable()
            if (isAvailable) {
              this.storeAppt()
              this.leads.unshift(lead)
              this.formDialog = false
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
        }

  }
})
