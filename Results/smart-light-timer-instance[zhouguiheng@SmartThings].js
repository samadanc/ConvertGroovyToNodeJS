
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
                if (!(this.shouldEnable())) {
                    return null
                }
                if (debuglog) {
                    console.log("contactHandler: ${event.name}: ${event.value}")
                }
                if (event.value == 'open') {
                    this.turnOn(minutes1)
                }
            

	})

    .subscribedEventHandler('lightHandler', (context, event) => {
        
                if (!(this.shouldEnable())) {
                    return null
                }
                if (debuglog) {
                    console.log("lightHandler from ${event.source}: ${event.name}: ${event.value}")
                }
                if (event.value == 'on') {
                    this.scheduleTurnOff(minutes1)
                } else {
                    if (event.value == 'off') {
                        this.unschedule(turnOff)
                    }
                }
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                if (!(this.shouldEnable())) {
                    return null
                }
                if (debuglog) {
                    console.log("motionHandler: ${event.name}: ${event.value}")
                }
                if (event.value == 'active') {
                    this.turnOn(minutes1)
                } else {
                    if (event.value == 'inactive') {
                        this.scheduleTurnOff(motionMinutes)
                    }
                }
            

	})

    .subscribedEventHandler('holderHandler', (context, event) => {
        
                if (!(this.shouldEnable())) {
                    return null
                }
                if (debuglog) {
                    console.log("holderHandler: ${event.name}: ${event.value}")
                }
                if (event.value == 'on') {
                    this.turnOn(-1)
                } else {
                    this.turnOff()
                }
            

	})
