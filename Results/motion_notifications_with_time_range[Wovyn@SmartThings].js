
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on when motion detected:', section => {
            section.deviceSetting('theMotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn on these switches:', section => {
            section.deviceSetting('theSwitches').capability(['switch']).name('');

        });


        page.section('Only between these times:', section => {
            section.timeSetting('startTime').name('From Time');
            section.timeSetting('endTime').name('To Time');

        });


        page.section('Time beyond To Time to allow Inactive Event', section => {
            section.numberSetting('minutes').name('Minutes?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.theMotion, 'motionSensor', 'motion.inactive', 'motionStoppedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theMotion, 'motionSensor', 'motion.active', 'motionDetectedHandler')

    })

    .subscribedEventHandler('motionDetectedHandler', (context, event) => {
        
        console.log("motionDetectedHandler called: $evt")
        let between = this.timeOfDayIsBetween(startTime, endTime, new Date(), location.timeZone)
        if (between) {
        console.log('motionNotificationWithTimeRange:  active executed - inside of time range!')
        for (let aSwitch : theSwitches ) {
        aSwitch.on()
        }
        } else {
        console.log('motionNotificationWithTimeRange:  active ignored - outside of time range!')
        }
        

	})

    .subscribedEventHandler('motionStoppedHandler', (context, event) => {
        
        console.log("motionStoppedHandler called: $evt")
        this.use(groovy.time.TimeCategory, {
        let between = this.timeOfDayIsBetween(startTime, endTime + minutes.minutes, new Date(), location.timeZone)
        if (between) {
        console.log('motionNotificationWithTimeRange:  inactive executed - inside of time range!')
        for (let aSwitch : theSwitches ) {
        aSwitch.off()
        }
        } else {
        console.log('motionNotificationWithTimeRange:  inactive ignored - outside of time range!')
        }
        })
        

	})
