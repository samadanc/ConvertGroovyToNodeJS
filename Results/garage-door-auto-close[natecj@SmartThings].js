
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices', section => {
            section.deviceSetting('door').capability(['switch']).name('Garage Door Switch');
            section.deviceSetting('contact').capability(['contactSensor']).name('Contact Sensor');

        });


        page.section('Automatically close the door...', section => {
            section.numberSetting('closeAfterMinutes').name('after X minutes:');
            section.numberSetting('confirmCloseAfterSeconds').name('confirm close after X seconds:');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'closed', 'doorHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.contact, 'contactSensor', 'open', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        if (event.value == 'closed') {
        this.unschedule()
        } else {
        if (event.value == 'open') {
        this.runIn(closeAfterMinutes * 60, closeDoor)
        }
        }
        

	})
