
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Select Nest Devices...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        console.log("modeChangeHandler: ${event.value}")
        if (event.value == 'Away') {
        
        context.api.devices.sendCommands(context.config.nestDevices, 'device.nest', away)
    
        } else {
        if (event.value == 'Home') {
        
        context.api.devices.sendCommands(context.config.nestDevices, 'device.nest', present)
    
        }
        }
        

	})
