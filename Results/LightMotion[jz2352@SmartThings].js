
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Info'', section => {

        });


        page.section('Select motion sensor...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Which Motion Sensor?');

        });


        page.section('Leave this light on when there is motion...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which Switch?');

        });


        page.section('Select the number of minutes to turn off the light after motion stops... (default 15 minutes)', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.active', 'motionOnHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion.inactive', 'motionOffHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("switch1 = ${event.value}")
        this.checkStatus()
        

	})

    .subscribedEventHandler('motionOnHandler', (context, event) => {
        
        console.log("motion1 = ${event.value}")
        this.checkStatus()
        

	})

    .subscribedEventHandler('motionOffHandler', (context, event) => {
        
        console.log("motion1 = ${event.value}")
        this.checkStatus()
        

	})
