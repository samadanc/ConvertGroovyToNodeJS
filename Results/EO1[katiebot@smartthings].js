
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn EO1 on when motion detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn EO1 off when there\'s been no movement for', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('EO1 device ID', section => {
            section.numberSetting('deviceid').name('EO1 device ID?');

        });


        page.section('Remember user token', section => {
            section.textSetting('rememberusertoken').name('Remember user token?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        this.toggleEO1('true')
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("motionStoppedHandler called: $evt")
        this.runIn(60 * minutes , checkMotion)
        

	})
