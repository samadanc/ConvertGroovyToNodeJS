
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {
            section.deviceSetting('light').capability(['switch']).name('Light');
            section.deviceSetting('doors').capability(['contactSensor']).name('Doors');

        });


        page.section('', section => {
            section.numberSetting('initialDuration').name('Time before Initial Reminder (in minutes)');
            section.numberSetting('repeatDuration').name('Time between Repeated Reminders (in minutes)');

        });


        page.section('', section => {
            section.deviceSetting('notifier').capability(['notification']).name('Notification Device');
            section.textSetting('message').name('Message Text');

        });


        page.section('', section => {
            section.booleanSetting('logEnable').name('Enable debug logging?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.light, 'switch', 'switch', 'handler')

    })

    .subscribedEventHandler('handler', (context, event) => {
        
        this.logDebug("${event.device} changed to ${event.value}")
        this.unschedule()
        if
        this.runIn(60 * initialDuration , reminder)
        }
        

	})
