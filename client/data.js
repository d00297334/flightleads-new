const data = () => ({
    date: null,
    menu: false,
    modal: false,
    menu2: false,
    formDialog: false,
    errorDialog: false,
    show: false,
    time: null,
    timeMenu: false,
    name: '',
    email: '',
    phone: '',
    address: '',
    type: '',
    notes: '',
    // allowedHoursList: ["8", "10", "11", "13", "14", "16", "18"],
    // allowedHoursList: [8, 10, 11, 13, 14, 16, 18],
    allowedMinutesList: [10, 30, 35],
    hoursAndMins: [
      {}
    ],
    selectedTimes: [],
    selectedAppts: {
      '2018-07-18':["10:30"]
    },


    leads: [
        {
            name: 'event 1',
            type: 'Construction',
            date:  'July 30th, 2018',
            address:  '123 St. Utah',
            time: '12:30',
            notes: 'these are extra notes',
            show: false,
        },
        {
            name: 'event 2',
            type: 'Wedding',
            date:  'July 30th, 2018',
            address:  '123 St. Utah',
            time: '4:10',
            notes:'notes',
            show: false,
        },
        {
            name: 'event 3',
            type: 'Construction',
            date:  'July 30th, 2018',
            address:  '123 St. Utah',
            time: '12:30',
            notes: 'these are extra notes',
            show: false,
        },
        {
            name: 'event 4',
            type: 'Wedding',
            date:  'July 30th, 2018',
            address:  '123 St. Utah',
            time: '4:10',
            notes:'some notes',
            show: false,
        }

    ],



    dateFilters: ['Today', 'This Week', 'This Month'],
    typeFilters: ['Videography', 'Photography', 'Land/Site Survey', 'Real Estate', 'Outdoor/Extreme Sports - Event', 'Outdoor/Extreme Sports - Personal', 'Other'],
    statusFilters: ['NEW', 'Flight Scheduled', 'Flight Completed', 'Flight Canceled', 'Dead Lead'],
})


export default data
