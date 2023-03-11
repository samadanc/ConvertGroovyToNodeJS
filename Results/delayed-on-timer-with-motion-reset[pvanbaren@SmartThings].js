
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on switch(es)...', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('Which?');

        });


        page.section('after movement ceases for...', section => {
            section.numberSetting('thetime').name('Minutes?');

        });


        page.section('unless there is movement...', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theswitch, 'switch', 'switch.off', 'switchOffHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        console.log('resetting timeout')
        this.resetTimeout()
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        console.log('setting timeout')
        this.resetTimeout()
        

	})

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}")
        console.log('setting timeout')
        this.resetTimeout()
        

	})
