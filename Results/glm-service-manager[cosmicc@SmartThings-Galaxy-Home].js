
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('glms').capability(['presenceSensor']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'mode', 'modeChangeHandler')

    })

    .subscribedEventHandler('modeChangeHandler', (context, event) => {
        
        if (event.value == 'Away') {
        console.log("Changing Mode to ${event.value}")
        
        context.api.devices.sendCommands(context.config.glms, 'presenceSensor', awayon)
    
        }
        if (event.value == 'Home') {
        console.log("Changing Mode to ${event.value}")
        
        context.api.devices.sendCommands(context.config.glms, 'presenceSensor', awayoff)
    
        }
        

	})
