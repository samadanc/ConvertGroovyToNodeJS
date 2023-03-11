
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('meterHandler', delay);

    })

    .scheduledEventHandler('meterHandler', (context, event) => {
        
                let msg = "$meter used ${meter.latestValue(energy)}kWh during $repeater period."
                this.sendMessage(msg)
                meter.reset()
            

	})
