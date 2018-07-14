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
            if (this.validApptTime(this.date, this.time)) {
              this.selectedAppts[this.date] = []
              this.storeAppt(this.date, this.time)
              this.formDialog = false
            } else {
              this.errorDialog = true
            }

        },

        storeAppt(date, time) {
          let oldtimes = this.selectedAppts[date]
          // this.selectedAppts.push({date: 'time'})
          this.selectedAppts[date] = oldtimes.push(time)
          // console.log(this.selectedAppts)
        },

        validApptTime(date, time) {
          let goodTimes = this.selectedAppts[date]
          console.log(goodTimes)
          if (goodTimes == undefined) {
            return true
          }
          for (const takenTime in goodTimes) {
            if (time == takenTime) {
              return false
            }
          }
          return true
        },

        isTimeAvailable(time) {
          for (const usedTime in this.selectedTimes) {
            if (time == usedTime) {
              return false
            }
          }
          return true
        },

        // allowedHours: v => v >= 8 && v<= 21,


        allowedMinutes: v => !(v % 15),

  }
})
