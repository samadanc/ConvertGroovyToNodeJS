
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
                let contactSensor = settings.contactSensors.find({ 
                    it.label == "${event.displayName}" || it.name == "${event.displayName}"
                })
                if (contactSensor) {
                    this.runIn(settings.knockDelay, 'checkMultiSensor', ['data': ['name': "${event.displayName}"]])
                } else {
                    this.LOG("${event.displayName} is a ${accelerationSensor.name}")
                    this.runIn(settings.knockDelay, 'checkAnySensor', ['data': ['name': "${event.displayName}"]])
                }
            

	})

    .subscribedEventHandler('onContact', (context, event) => {
        
                this.LOG("onContact(${event.displayName})")
                state.lastClosed = this.now()
            

	})
