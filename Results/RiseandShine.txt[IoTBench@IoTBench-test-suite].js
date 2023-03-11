
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s motion on any of these sensors', section => {
            section.deviceSetting('motionSensors').capability(['motionSensor']).name('Intrusion');

        });


        page.section('after this time of day', section => {
            section.timeSetting('timeOfDay').name('Time?');

        });


        page.section('Change to this mode', section => {

        });


        page.section('and (optionally) turn on these appliances', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log("motion(event.name: ${event.value}), timeOfDay: $timeOfDay,  actionTakenOn: ${state.actionTakenOn}, currentMode: ${location.mode}, newMode: $newMode ")
        let startTime = this.timeToday(timeOfDay)
        console.log("now: ${new Date(this.now())}, startTime: $startTime")
        if (this.now() > startTime.time && location.mode != newMode ) {
        let message = "Good morning! SmartThings changed the mode to '$newMode'"
        this.sendPush(message)
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
