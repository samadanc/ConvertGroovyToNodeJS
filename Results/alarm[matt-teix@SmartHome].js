
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('doDeviceSync', delay);

    })

    .scheduledEventHandler('doDeviceSync', (context, event) => {
        
                console.log('Doing Alarm.com Device Sync!')
                if (!state.subscribe) {
                    this.subscribe(location, null, locationHandler, ['filterEvents': false])
                    state.subscribe = true
                }
                this.createSwitches()
            

	})
