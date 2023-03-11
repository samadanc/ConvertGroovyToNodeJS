
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Toggle off/on when motion not/detected:', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn off this light', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');

        });


        page.section('Turn off when there\'s been no movement for', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Turn on between what times?', section => {
            section.timeSetting('fromTime').name('From');
            section.timeSetting('toTime').name('To');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'noMotionDetectedHandler')

    })

    .subscribedEventHandler('noMotionDetectedHandler', (context, event) => {
        
        console.log("noMotionDetectedHandler called: $evt")
        this.runIn(minutes * 60, checkMotion)
        

	})

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        let between = this.timeOfDayIsBetween(fromTime, toTime, new Date(), location.timeZone)
        if (between) {
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        }
        

	})
