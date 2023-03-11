
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('At this time every day', section => {
            section.timeSetting('time').name('Time of Day');

        });


        page.section('Make sure it\'s closed', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Which contact sensor?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('setTimeCallback', delay);

    })

    .scheduledEventHandler('setTimeCallback', (context, event) => {
        
        if (contacts) {
        this.doorOpenCheck()
        }
        

	})
