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


    availableAMs: [
      { id: 1, time: '9:00am - 10:00 am', click_state: 3, state: false },
      { id: 2, time: '10:00am - 11:00 am', click_state: 3, state: false },
      { id: 3, time: '11:00am - 12:00 pm', click_state: 3, state: false }
    ],
    availablePMs: [
      { id: 4, time: '12:00pm - 1:00 pm', click_state: 3, state: false },
      { id: 5, time: '1:00pm - 2:00 pm', click_state: 3, state: false },
      { id: 6, time: '2:00am - 3:00 pm', click_state: 3, state: false },
      { id: 7, time: '3:00pm - 4:00 pm', click_state: 3, state: false },
      { id: 8, time: '4:00am - 5:00 pm', click_state: 3, state: false }
    ],

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
