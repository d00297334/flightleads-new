import data from './data.js'
import template from './template.js'

const formDialog = Vue.component('form', {
	data,
	template,

	computed {

	},

	methods {
		showForm() {
			this.dialog = true,
		}
	},


 }


export default formDialog
