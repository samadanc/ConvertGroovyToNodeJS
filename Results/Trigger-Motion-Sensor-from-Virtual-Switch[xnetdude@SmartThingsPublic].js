
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which Switch will cause Motion Sensor to Activate:', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Which?');

        });


        page.section('Which Motion Sensor will be activated:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'onHandler')

    })

    .subscribedEventHandler('onHandler', (context, event) => {
        
        console.log("onHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.themotion, 'motionSensor', active)
    
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', off)
    
        
        context.api.devices.sendCommands(context.config.themotion, 'motionSensor', inactive)
    
        

	})
