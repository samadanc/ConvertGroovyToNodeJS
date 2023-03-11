
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
                if (delay) {
                    this.unschedule(setMode)
                    this.runIn(delay, setMode)
                } else {
                    this.setMode(evt)
                }
            

	})
