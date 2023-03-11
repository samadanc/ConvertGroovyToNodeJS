
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Listen to this motion detector:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('When?');

        });


        page.section('Turn on this light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


        page.section('Minutes to wait before turning off the light', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionActiveDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionInactiveDetectedHandler')

    })

    .subscribedEventHandler('motionInactiveDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        

	})

    .subscribedEventHandler('motionActiveDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        

	})
