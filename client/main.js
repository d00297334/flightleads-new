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
            this.dialog = false
        } 
    }

})
