
const data = () => ({
    menu: false,
    modal: false,
    menu2: false,
    formDialog: false,
    errorDialog: false,
    startTimeMenu: false,
    endTimeMenu: false,
    name: '',
    date: null,
    startTime: null,
    endTime: null,
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

    id: null,
    editingId: null,
    visible: null,
    selectedAppts: {
      '2018-07-18':[{startTime: "10:30", endTime: "11:30"}]
    },


    leads: [
        {
          id: 1,
            name: 'Chandler 1',
            type: 'Videography',
            date:  '2018-07-18',
            startTime: '12:30',
            endTime: '13:30',
            address:  '123 Main Street St. George, Utah',
            notes: 'these are extra notes',
            show: false,
        },
        {
            name: 'Kath 2',
            type: 'Wedding',
            date:  '2018-07-20',
            address:  '123 Apple St. St. George, Utah',
            startTime: '12:30',
            endTime: '13:30',
            notes:'notes',
            show: false,
        },
        {
            name: 'Neil 3',
            type: 'LandSite/Survey',
            date:  '2018-07-24',
            address:  '123 State St. Kanab, Utah',
            startTime: '09:30',
            endTime: '11:30',
            notes: 'these are extra notes',
            show: false,
        },
    ],



    dateItems: ['Today', 'This Week', 'This Month'],
    typeItems: ['Videography', 'Photography', 'Land/Site Survey', 'Real Estate', 'Outdoor/Extreme Sports - Event', 'Outdoor/Extreme Sports - Personal', 'Other'],
    statusItems: ['NEW', 'Flight Scheduled', 'Flight Completed', 'Flight Canceled', 'Dead Lead'],

    dateFilters: [
      {text:'None', filter:'none'},
      {text:'Today', filter:'today'},
      {text:'This Week', filter:'thisWeek'},
      {text:'This Month', filter:'thisMonth'}
    ],
    dateFilter: 'None',
    typeFilters: ['None', 'Videography', 'Photography', 'Land/Site Survey', 'Real Estate', 'Outdoor/Extreme Sports - Event', 'Outdoor/Extreme Sports - Personal', 'Other'],
    typeFilter: 'None',
    statusFilters: ['None', 'NEW', 'Flight Scheduled', 'Flight Completed', 'Flight Canceled', 'Dead Lead'],
    statusFilter: 'None',

    filteredDateLeads: [],
    filteredTypeLeads: [],
    filteredStatuLeads: [],

})


export default data
