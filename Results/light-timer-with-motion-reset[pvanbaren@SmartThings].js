
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn off light(s)...', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


        page.section('after what length of time...', section => {
            section.numberSetting('thetime').name('Minutes?');

        });


        page.section('unless there is movement...', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where? (optional)');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.on', 'switchOnHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        console.log('extending timeout')
        this.resetTimeout()
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        console.log('setting timeout')
        this.resetTimeout()
        

	})

    .subscribedEventHandler('switchOnHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        console.log('setting timeout')
        this.resetTimeout()
        

	})
