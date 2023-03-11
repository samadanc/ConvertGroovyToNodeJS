
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s motion on any of these sensors', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('');

        });


        page.section('During this time window (default End Time is 4:00 PM)', section => {
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
        
        if (state.modeStartTime == null) {
        this.subscribe(location, modeChangeHandler)
        state.modeStartTime = 0
        }
        let t0 = this.now()
        let modeStartTime = new Date(state.modeStartTime)
        let timeZone = location.timeZone ? location.timeZone : this.timeZone(timeOfDay)
        let startTime = this.timeTodayAfter(modeStartTime, timeOfDay, timeZone)
        let endTime = this.timeTodayAfter(startTime, endTime ? endTime : '16:00', timeZone)
        console.log("startTime: $startTime, endTime: $endTime, t0: ${new Date(t0)}, modeStartTime: $modeStartTime,  actionTakenOn: ${state.actionTakenOn}, currentMode: ${location.mode}, newMode: $newMode ")
        if (t0 >= startTime.time && t0 <= endTime.time && location.mode != newMode ) {
        let message = "Good morning! SmartThings changed the mode to '$newMode'"
        this.send(message)
        this.setLocationMode(newMode)
        console.log(message)
        let dateString = new Date().format('yyyy-MM-dd')
        console.log("last turned on switches on ${state.actionTakenOn}, today is $dateString")
        if (state.actionTakenOn != dateString ) {
        console.log('turning on switches')
        state.actionTakenOn = dateString
        switches?.on()
        }
        } else {
        console.log("not in time window, or mode is already set, currentMode = ${location.mode}, newMode = $newMode")
        }
        

	})
