
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


        page.section('Zip Code', section => {

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
        let SRSS = this.getSunriseAndSunset(['zipCode': localZipCode , 'sunsetOffset': '-00:30', 'sunriseOffset': '00:30'])
        let between = this.timeOfDayIsBetween(SRSS.sunset, SRSS.sunrise, new Date(), location.timeZone)
        console.log("Sunset -30 is ${SRSS.sunset})")
        console.log("Sunrise +30 is ${SRSS.sunrise})")
        if (between) {
        console.log('Sun Has Set, Allow Switch to Turn On')
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        } else {
        console.log('Sun Has NOT Set, DO NOT Allow Switch to Turn On')
        }
        

	})
