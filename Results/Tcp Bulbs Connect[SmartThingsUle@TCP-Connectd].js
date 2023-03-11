
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('syncronizeDevices', delay);

    })

    .scheduledEventHandler('syncronizeDevices', (context, event) => {
        
                this.poll(null)
            

	})
