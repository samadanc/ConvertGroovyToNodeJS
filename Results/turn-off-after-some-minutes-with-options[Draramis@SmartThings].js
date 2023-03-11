
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
                if (event.value in ['on', 'setLevel']) {
                    this.runIn(minutes * 60, turnOff)
                }
            

	})
