
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('pauseSwitchOnHandler', (context, event) => {
        
                console.log("${event.displayName}'s ${event.name} is ${event.value}")
                if (reminderPause == turnedOn ) {
                    this.pause()
                } else {
                    this.resume()
                }
            

	})

    .subscribedEventHandler('reminderSwitchOnHandler', (context, event) => {
        
                console.log("${event.displayName}'s ${event.name} is ${event.value}")
                if (reminderStart == turnedOn ) {
                    this.start()
                } else {
                    this.stop()
                }
            

	})

    .subscribedEventHandler('reminderSwitchOffHandler', (context, event) => {
        
                console.log("${event.displayName}'s ${event.name} is ${event.value}")
                if (reminderStart == turnedOn ) {
                    this.stop()
                } else {
                    this.start()
                }
            

	})

    .subscribedEventHandler('pauseSwitchOffHandler', (context, event) => {
        
                console.log("${event.displayName}'s ${event.name} is ${event.value}")
                if (reminderPause == turnedOn ) {
                    this.resume()
                } else {
                    this.pause()
                }
            

	})
