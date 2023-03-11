
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Alarms', section => {
            section.enumSetting('alarmMode').name('Set alarm mode to...');
            section.enumSetting('alarmSensitivity').name('With a sensitivity of...');
            section.deviceSetting('locks').capability(['lock']).name('On these devices...');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'routineExecuted', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        console.log("${event.displayName} routine has run")
        if (event.displayName == settings.routine) {
        if (alarmMode && locks ) {
        this.setAlarmMode()
        }
        if (alarmSensitivity && locks ) {
        this.setAlarmSensitivity()
        }
        }
        

	})
