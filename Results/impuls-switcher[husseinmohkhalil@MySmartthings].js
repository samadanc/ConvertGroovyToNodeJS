
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which virtual switch You are going to use', section => {
            section.deviceSetting('virtualSwitch').capability(['switch']).name('Which switch?');

        });


        page.section('Which switch to act as Impuls ', section => {
            section.deviceSetting('targetSwitch').capability(['switch']).name('Target switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'switch', 'switch.off', 'SwitchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.virtualSwitch, 'switch', 'switch.on', 'SwitchOnHandler')

    })

    .subscribedEventHandler('SwitchOffHandler', (context, event) => {
        
        console.log("Updated with settings: ${event.value}")
        
        context.api.devices.sendCommands(context.config.targetSwitch, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.targetSwitch, 'switch', runIn)
    
        

	})

    .subscribedEventHandler('SwitchOnHandler', (context, event) => {
        
        console.log("Updated with settings: ${event.value}")
        
        context.api.devices.sendCommands(context.config.targetSwitch, 'switch', on)
    
        
        context.api.devices.sendCommands(context.config.targetSwitch, 'switch', runIn)
    
        

	})
