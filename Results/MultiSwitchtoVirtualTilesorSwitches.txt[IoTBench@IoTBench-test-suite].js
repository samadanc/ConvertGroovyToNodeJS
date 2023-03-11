
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('swch6', (context, event) => {
        
                master."${event.value}6"()
            

	})

    .subscribedEventHandler('swch2', (context, event) => {
        
                master."${event.value}2"()
            

	})

    .subscribedEventHandler('swch7', (context, event) => {
        
                master."${event.value}7"()
            

	})

    .subscribedEventHandler('swch10', (context, event) => {
        
                master."${event.value}10"()
            

	})

    .subscribedEventHandler('swch5', (context, event) => {
        
                master."${event.value}5"()
            

	})

    .subscribedEventHandler('swch8', (context, event) => {
        
                master."${event.value}8"()
            

	})

    .subscribedEventHandler('swch1', (context, event) => {
        
                master."${event.value}1"()
            

	})

    .subscribedEventHandler('swch9', (context, event) => {
        
                master."${event.value}9"()
            

	})

    .subscribedEventHandler('swch4', (context, event) => {
        
                master."${event.value}4"()
            

	})

    .subscribedEventHandler('swch3', (context, event) => {
        
                master."${event.value}3"()
            

	})
