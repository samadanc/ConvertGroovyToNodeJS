
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('sensorTriggered', (context, event) => {
        
                this.sendPush("Alarm: ${event.name} is ${event.value}")
                console.log("Alarm: ${event.name} is ${event.value}")
            

	})
