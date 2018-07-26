//import data from './data.js'
//import template from './template.js'


const formDialog = Vue.component('form', {
		data: {
		date: null,
		menu: false,
		modal: false,
		menu2: false,
		dialog: false
	},
	template: `
		<h1>Hello World</h1>
	`,
	computed: {

	},
	methods: {
		showForm() {
			this.dialog = true
		}
	},
 })


export default formDialog
