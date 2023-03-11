
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s motion on this sensor', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('');

        });


        page.section('During this time window', section => {
            section.timeSetting('timeOfDay').name('Start Time?');
            section.timeSetting('endTime').name('End Time?');

        });


        page.section('Change to this mode', section => {

        });


        page.section('And (optionally) turn on these appliances', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.motionSensors, 'motionSensor', 'motion.active', 'motionActiveHandler')

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        let t0 = this.now()
        let timeZone = location.timeZone ? location.timeZone : this.timeZone(timeOfDay)
        let start = this.timeToday(timeOfDay, timeZone)
        let end = this.timeToday(endTime, timeZone)
        console.log("startTime: $start, endTime: $end, t0: ${new Date(t0)}, currentMode: ${location.mode}, newMode: $newMode")
        if (t0 >= start.time && t0 <= end.time && location.mode != newMode ) {
        let message = "SmartThings changed the mode to '$newMode'"
        this.send(message)
        this.setLocationMode(newMode)
        console.log(message)
        console.log('turning on switches')
        switches?.on()
        } else {
        console.log("not in time window, or mode is already set, currentMode = ${location.mode}, newMode = $newMode")
        }
        

	})
