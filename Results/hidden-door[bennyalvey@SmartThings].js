
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When the secret knock happens ...', section => {
            section.deviceSetting('globe').capability(['contactSensor']).name('Where?');

        });


        page.section('Open the hidden door...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.globe, 'contactSensor', 'contact.closed', 'contactClosedHandler')

    })

    .subscribedEventHandler('contactClosedHandler', (context, event) => {
        
        console.log("Globe value: ${event.value}, $evt")
        console.log('Opening door')
        
        context.api.devices.sendCommands(context.config.door, 'device.doorShield', open)
    
        

	})
