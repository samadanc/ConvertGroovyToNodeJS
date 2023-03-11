
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onMovement', (context, event) => {
        
                this.LOG("onMovement(${event.displayName})")
                let delay = settings.knockDelay == null ? 5 : settings.knockDelay
                let contactSensor = settings.contactSensors.find({ 
                    it.label == "${event.displayName}" || it.name == "${event.displayName}"
                })
                if (contactSensor) {
                    this.runIn(delay, 'checkMultiSensor', ['data': ['name': "${event.displayName}"]])
                } else {
                    this.LOG("${event.displayName} is a ${accelerationSensor.name}")
                    this.runIn(delay, 'checkAnySensor', ['data': ['name': "${event.displayName}"]])
                }
            

	})

    .subscribedEventHandler('onContact', (context, event) => {
        
                this.LOG("onContact(${event.displayName})")
                state.lastClosed = this.now()
            

	})
