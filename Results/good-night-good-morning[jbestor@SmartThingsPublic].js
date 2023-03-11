
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When things have quieted down...', section => {
            section.deviceSetting('nightMotion').capability(['motionSensor']).name('Where should there be no motion?');
            section.numberSetting('delayMinutes').name('How long there should be no movement for in Minutes');
            section.timeSetting('nightTime').name('Start after...');

        });


        page.section('When things start to happen...', section => {
            section.deviceSetting('dayMotion').capability(['motionSensor']).name('Where is morning motion detected?');
            section.timeSetting('dayTime').name('Start after...');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('dayTimeHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.nightMotion, 'motionSensor', 'motion', 'nightMotionHandler')

        context.api.schedules.schedule('nightTimeHandler', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.dayMotion, 'motionSensor', 'motion.active', 'dayMotionDetectedHandler')

    })

    .subscribedEventHandler('dayMotionDetectedHandler', (context, event) => {
        
        console.log("dayMotionDetectedHandler called: $evt")
        let between = this.timeOfDayIsBetween(dayTime, nightTime, new Date(), location.timeZone)
        if (location.mode == nightMode && between ) {
        this.changeDay()
        } else {
        console.log("$dayMode not detected, Current Mode: ${location.mode} and day time: $between")
        }
        

	})

    .subscribedEventHandler('nightMotionHandler', (context, event) => {
        
        if (event.value == 'active') {
        this.nightMotionDetectedHandler(evt)
        } else {
        if (event.value == 'inactive') {
        this.nightMotionStoppedHandler(evt)
        }
        }
        

	})

    .scheduledEventHandler('dayTimeHandler', (context, event) => {
        
        console.log("dayTimeHandler called at ${new Date()}")
        if (this.daySensorsActive()) {
        this.changeDay()
        } else {
        console.log('day sensors inactive')
        }
        

	})

    .scheduledEventHandler('nightTimeHandler', (context, event) => {
        
        console.log("nightTimeHandler called at ${new Date()}")
        if (this.nightSensorsInactive()) {
        console.log("checkNight will run in $delayMinutes minutes")
        this.runIn(delayMinutes * 60, checkNight)
        } else {
        console.log('night sensors active')
        }
        

	})
