
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('What time would you like the motion sensor to take control of the light?', section => {
            section.timeSetting('theTimeStart').name('From');
            section.timeSetting('theTimeStop').name('To');

        });


        page.section('Select which motion sensor would you like to use?', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Select Sensor');

        });


        page.section('Turn off when there\'s been no movement for', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


        page.section('Turn on this light', section => {
            section.deviceSetting('light').capability(['switch']).name('Select Light');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $lightLevel")
        let between = this.timeOfDayIsBetween(theTimeStart, theTimeStop, new Date(), location.timeZone)
        if (between) {
        
        context.api.devices.sendCommands(context.config.light, 'switch', on)
    
        }
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("motionStoppedHandler called: $evt")
        this.runIn(60 * minutes , checkMotion)
        

	})
