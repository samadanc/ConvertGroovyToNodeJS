
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('modeChangeHandler', delay);

    })

    .scheduledEventHandler('modeChangeHandler', (context, event) => {
        
                let delay = falseAlarmThreshold != null && falseAlarmThreshold != '' ? falseAlarmThreshold * 60 : 2 * 60
                this.runIn(delay, scheduleCheck)
            

	})
