
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When . . .', section => {
            section.deviceSetting('contactSensor').capability(['contactSensor']).name('Something is left open');
            section.numberSetting('numMinutes').name('For this many minutes');

        });


        page.section('Message Text', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Send SmartThings Notification (optional)', section => {
            section.enumSetting('pushNotification').name('Send SmartThings Notification?');

        });


        page.section('Send SMS Message (optional)', section => {

        });


        page.section('Send Pushover Notification (optional)', section => {
            section.textSetting('apiKey').name('Pushover API Key');
            section.textSetting('userKey').name('Pushover User Key');
            section.textSetting('deviceName').name('Pushover Device Name');
            section.enumSetting('priority').name('Pushover Priority');
            section.enumSetting('sound').name('Pushover Alert Sound');

        });


        page.section('Send BEEP to (optional)', section => {
            section.deviceSetting('alertDevice').capability(['tone']).name('Alert Device');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contactSensor, 'contactSensor', 'contact', 'onContactChange')

    })

    .subscribedEventHandler('onContactChange', (context, event) => {
        
        console.log('onContactChange')
        if (event.value == 'open') {
        this.runIn(numMinutes * 60, onContactLeftOpenHandler)
        }
        

	})
