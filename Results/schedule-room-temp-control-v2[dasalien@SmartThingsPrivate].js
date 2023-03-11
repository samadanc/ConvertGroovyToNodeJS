
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('logsOff', delay);

    })

    .scheduledEventHandler('logsOff', (context, event) => {
        
                log.warn('debug logging disabled...')
                app.updateSetting('detailedNotif', ['value': 'false', 'type': 'bool'])
            

	})
