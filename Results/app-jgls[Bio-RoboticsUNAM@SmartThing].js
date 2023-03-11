
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn On When Motion Detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where the motion sensor is?');

        });


        page.section('Turn off when there\'s been no movement for', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Turn On/Off This Light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Which light do you want to turn on?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("motionStoppedHandler called: $evt")
        this.runIn(60 * minutes , checkMotion)
        
        context.api.devices.sendCommands(context.config.themotion, 'motionSensor', currentState)
    
        console.log("Tiempo inicial: ${State.date.time}, Estado: ${State.value}")
        

	})
