
const data = () => ({
    date: null,
    menu: false,
    modal: false,
    menu2: false,
    formDialog: false,
    errorDialog: false,
    //show: false,
    startTime: null,
    endTime: null,
    startTimeMenu: false,
    endTimeMenu: false,
    name: '',
    email: '',
    phone: '',
    address: '',
    type: '',
    notes: '',
    valid: false,
    nameRules: [
        v => !!v || 'Name is required'
      ],
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    phoneRules: [
      v => !!v || 'Phone number is required',
      v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(v) || 'Phone number must be valid'
      ],

    leads: [
    ],
    id: null,
    editingId: null,
    visible: null,
    selectedAppts: {
      '2018-07-18':[{startTime: "10:30", endTime: "11:30"}]
    },


    leads: [],



    dateItems: ['Today', 'This Week', 'This Month'],
    typeItems: ['Videography', 'Photography', 'Land/Site Survey', 'Real Estate', 'Outdoor/Extreme Sports - Event', 'Outdoor/Extreme Sports - Personal', 'Other'],
    statusItems: ['NEW', 'Flight Scheduled', 'Flight Completed', 'Flight Canceled', 'Dead Lead'],
    dateFilters: ['None', 'Today', 'This Week', 'This Month'],
    typeFilters: ['None', 'Videography', 'Photography', 'Land/Site Survey', 'Real Estate', 'Outdoor/Extreme Sports - Event', 'Outdoor/Extreme Sports - Personal', 'Other'],
    statusFilters: ['None', 'NEW', 'Flight Scheduled', 'Flight Completed', 'Flight Canceled', 'Dead Lead'],

})


export default data
