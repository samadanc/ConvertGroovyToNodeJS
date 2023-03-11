
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


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionDetectedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        if (event.value == 'active') {
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        } else {
        if (event.value == 'inactive') {
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', off)
    
        }
        }
        

	})
