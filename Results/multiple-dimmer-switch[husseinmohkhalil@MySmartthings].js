
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Virtual Dimmer You are going to use', section => {
            section.deviceSetting('virtualDimmer').capability(['switchLevel']).name('Which switch?');

        });


        page.section('Which device(s) to control ', section => {
            section.deviceSetting('targets').capability(['switchLevel']).name('Target dimmer switch(s)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDimmer, 'switchLevel', 'switch.on', 'SwitchOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDimmer, 'switchLevel', 'switch.off', 'SwitchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualDimmer, 'switchLevel', 'level', 'SwitchLevelChangedHandler')

    })

    .subscribedEventHandler('SwitchOffHandler', (context, event) => {
        
        console.log("Updated with settings: ${event.value}")
        
        context.api.devices.sendCommands(context.config.targets, 'switchLevel', off)
    
        

	})

    .subscribedEventHandler('SwitchOnHandler', (context, event) => {
        
        console.log("Updated with settings: ${event.value}")
        
        context.api.devices.sendCommands(context.config.targets, 'switchLevel', on)
    
        

	})

    .subscribedEventHandler('SwitchLevelChangedHandler', (context, event) => {
        
        console.log("Updated with settings: ${event.value}")
        
        context.api.devices.sendCommands(context.config.targets, 'switchLevel', setLevel)
    
        

	})
