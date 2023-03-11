
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Devices', section => {
            section.deviceSetting('alarm').capability(['alarm']).name('Select an Alarm');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.alarm, 'alarm', 'alarm', 'alarmHandler')

    })

    .subscribedEventHandler('alarmHandler', (context, event) => {
        
        state.activeAlarm = event.value
        

	})
