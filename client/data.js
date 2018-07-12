const data = () => ({
    date: null,
    menu: false,
    modal: false,
    menu2: false,
    dialog: false,
    show: false,
    time: null,
    timeMenu: false,
    email: null,
    phone: null,
    address: null,
    type: null,
    notes: null,
    
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

    
   
})


export default data
