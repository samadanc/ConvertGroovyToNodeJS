
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Notification method', section => {
            section.booleanSetting('pushNotification').name('Push notification');

        });


        page.section('Choose Hub to Monitor', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.hub, 'hub', 'activity', 'processEvent')

    })

    .subscribedEventHandler('processEvent', (context, event) => {
        
        if (event.value.contains('inactive')) {
        let msg = event.description
        console.log("A Hub is inactive, sending message: '$msg', push:$pushNotification, phone:$phone")
        if (pushNotification) {
        this.sendPush(msg)
        }
        if (phone) {
        this.sendSms(phone, msg)
        }
        }
        

	})
