
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('waterHandler', (context, event) => {
        
                console.log("Sensor ${event.displayName} says ${event.value}")
                if (event.value == 'wet') {
                    valve.close()
                }
                if (frequency) {
                    let lastTime = state[event.deviceId]
                    if (lastTime == null || this.now() - lastTime >= frequency * 60000) {
                        this.sendMessage(evt)
                    }
                } else {
                    this.sendMessage(evt)
                }
            

	})
