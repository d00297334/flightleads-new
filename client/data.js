
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
