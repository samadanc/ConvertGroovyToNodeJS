
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Title', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');

        });


        page.section('turn on this switch', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOffHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log("switchOffHandler called: $evt")
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("switchOnHandler called: $evt")
        

	})
