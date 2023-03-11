
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Use this Jawbone as a notification button and...', section => {

        });


        page.section('Send a message when you press and hold the button...', section => {
            section.textSetting('warnMessage').name('Warning Message');

        });


        page.section('Or text message to these numbers (optional)', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.jawbone, 'device.jawboneUser', 'sleeping', 'sendit')

    })

    .subscribedEventHandler('sendit', (context, event) => {
        
        console.log("${event.value}: $evt")
        this.sendMessage()
        

	})
