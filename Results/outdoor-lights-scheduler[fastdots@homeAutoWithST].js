
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Manage this switch', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'sunriseHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'sunsetHandler')

    })

    .subscribedEventHandler('sunriseHandler', (context, event) => {
        
        console.log("Turned off handler with event: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', off)
    
        

	})

    .subscribedEventHandler('sunsetHandler', (context, event) => {
        
        console.log("Turned on handler with event: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        

	})
