
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use the following lights...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'alarmSystemStatus', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        console.log("Alarm Handler value: ${event.value}")
        console.log("alarm state: ${location.currentState(alarmSystemStatus)?.value}")
        if (location.currentState('alarmSystemStatus')?.value == 'off') {
        for (let s : switches ) {
        s.off()
        }
        } else {
        for (let s : switches ) {
        s.on()
        }
        }
        

	})
