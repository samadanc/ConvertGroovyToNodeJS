
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('eventHandler', (context, event) => {
        
                if (!(this.correctTime()) || !(this.correctMode())) {
                    console.log('eventHandler, nothing to do')
                    return null
                }
                console.log("eventHandler, wasOn=${state.wasOn}")
                if (!state.wasOn) {
                    state.wasOn = switch1.currentValue('power') > 5
                }
                if (state.wasOn) {
                    if (this.isPowerOff()) {
                        this.takeActions()
                        state.wasOn = false
                    }
                }
            

	})
