
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn off when there\'s been no movement for', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Turn on/off this light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDectedHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("motionStoppedHandler called: $evt")
        this.runIn(60 * minutes , checkMotion)
        

	})
