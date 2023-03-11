
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Toggle this switch:', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Which Switch?');

        });


        page.section('Toggle this light', section => {
            section.deviceSetting('thelight').capability(['switch']).name('Which Lights?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.thelight, 'switch', 'switch.off', 'lightOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.thelight, 'switch', 'switch.on', 'lightOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log("switchOffHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.thelight, 'switch', off)
    
        

	})

    .subscribedEventHandler('lightOffHandler', (context, event) => {
        
        console.log("switchOffHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', off)
    
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("switchOnHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.thelight, 'switch', on)
    
        

	})

    .subscribedEventHandler('lightOnHandler', (context, event) => {
        
        console.log("switchOnHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        

	})
