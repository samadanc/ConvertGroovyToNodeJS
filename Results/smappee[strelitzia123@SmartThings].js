
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery5Minutes('poll', delay);

    })

    .scheduledEventHandler('poll', (context, event) => {
        
                let devices = this.getChildDevices()
                devices.each({ 
                    this.pollHandler(it)
                })
            

	})
