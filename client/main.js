import data from './data.js'


const app = new Vue({
    el: '#app',
    data,
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
                time: this.time,
                type: this.type,
                email: this.email,
                id: Math.random(),
                visible: true
            }
            this.leads.unshift(lead)
            this.clear()
        },

        formatDate(date) {
            return moment(date).format('ddd, MMMM-Do-YYYY')
        },

        setEditingId(id) {
            this.id = id
            this.dialog = true
            const indexOfLead = this.leads.findIndex(lead => lead.id === id)
            this.name = this.leads[indexOfLead].name
            this.date = this.leads[indexOfLead].date
            this.time = this.leads[indexOfLead].time
            this.phone = this.leads[indexOfLead].phone
            this.address = this.leads[indexOfLead].address
            this.email = this.leads[indexOfLead].email
            this.type = this.leads[indexOfLead].type
            this.notes = this.leads[indexOfLead].notes
        },

        updateLead(id) {
            const indexOfLead = this.leads.findIndex(lead => lead.id === id)
			const updatedLead = {
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
            this.dialog = false
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
        }
    }

})
