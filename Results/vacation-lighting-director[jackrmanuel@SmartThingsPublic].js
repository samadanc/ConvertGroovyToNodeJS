
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
                log.trace("modeChangeHandler $evt")
                this.setSched()
            

	})
