
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Phones?', section => {
            section.deviceSetting('presence1').capability(['presenceSensor']).name('Who?');

        });


        page.section('Which door?', section => {
            section.deviceSetting('doors').capability(['contactSensor']).name('Which doors?');

        });


        page.section('Open/close garage door...', section => {
            section.deviceSetting('gdc1').capability(['garageDoorControl']).name('');

        });


        page.section('Send Push Notification?', section => {
            section.booleanSetting('sendPush').name('Send Push Notification when Opened?');

        });


        page.section('Send Texts?', section => {
            section.enumSetting('phones').name('Phones');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.gdc1, 'garageDoorControl', 'door.open', 'doorOpenHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.doors, 'contactSensor', 'contact.open', 'doorOpenHandler')

    })

    .subscribedEventHandler('doorOpenHandler', (context, event) => {
        
        if (event.isStateChange() && event.value == 'open') {
        let message = "SMARTTHINGS: The ${event.displayName} is open!"
        if (sendPush) {
        log.info("Pushing $message")
        this.sendPush(message)
        }
        for 
        log.info("Sending SMS to ${phones[p]}: $message")
        this.sendSms(phones[ p ], message)
        }
        }
        

	})
