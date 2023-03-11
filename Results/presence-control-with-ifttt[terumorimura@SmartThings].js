
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Switch to a virtual monitor', section => {
            section.deviceSetting('theSwitch').capability(['switch']).name('');

        });


        page.section('Select Presense Sensor to control', section => {
            section.deviceSetting('thePresence').capability(['presenceSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.Off', 'offHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theSwitch, 'switch', 'switch.On', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("Received on from $theSwitch")
        
        context.api.devices.sendCommands(context.config.thePresence, 'presenceSensor', arrived)
    
        

	})

    .subscribedEventHandler('offHandler', (context, event) => {
        
        console.log("Received on from $theSwitch")
        
        context.api.devices.sendCommands(context.config.thePresence, 'presenceSensor', departed)
    
        

	})
