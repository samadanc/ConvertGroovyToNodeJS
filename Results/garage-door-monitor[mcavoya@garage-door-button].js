
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Garage Door Devices', section => {
            section.deviceSetting('door').capability(['doorControl']).name('Select door');
            section.deviceSetting('relay').capability(['momentary']).name('Select relay');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.door, 'doorControl', 'door', 'doorHandler')

    })

    .subscribedEventHandler('doorHandler', (context, event) => {
        
        let doorState = event.value
        console.log("New garage door state: $doorState")
        if ('closing' == doorState || 'closed' == doorState ) {
        
        context.api.devices.sendCommands(context.config.relay, 'momentary', doorClosed)
    
        }
        if ('opening' == doorState || 'open' == doorState ) {
        
        context.api.devices.sendCommands(context.config.relay, 'momentary', doorOpen)
    
        }
        

	})
