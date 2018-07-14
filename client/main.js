import data from './data.js'

const app = new Vue({
    el: '#app',
    data,
    methods: {
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
            this.leads.unshift(lead)
            const isAvailable = this.isTimeAvailable()
            if (isAvailable) {
              this.storeAppt()
              this.formDialog = false
            } else {
              this.errorDialog = true
            }

        },

        storeAppt() {
          const todaysAppointments = this.selectedAppts[this.date]
          if (!todaysAppointments) {
            this.selectedAppts[this.date] = [this.time]
          } else {
            todaysAppointments.push(this.time)
          }
        },

        isTimeAvailable() {
          const unavailableTimes = this.selectedAppts[this.date]
          if (!unavailableTimes) {
            return true
          }
          for (const index in unavailableTimes) {
            if (this.time == unavailableTimes[index]) {
              return false
            }
          }
          return true
        },

        // allowedHours: v => v >= 8 && v<= 21,


        allowedMinutes: v => !(v % 15),
        
        // allowedMinutes(v) {
        //   const unavailableTimes = this.selectedAppts[this.date]
        //   return !(v %15)
        // }

  }
})
