
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('refreshChildDevices', delay);

    })

    .scheduledEventHandler('refreshChildDevices', (context, event) => {
        
                log.trace('refreshChildDevices()')
                this.getBedData()
            

	})
