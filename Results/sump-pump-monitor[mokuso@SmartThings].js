
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which multi-sensor do you want to monitor?', section => {
            section.deviceSetting('multi').capability(['accelerationSensor']).name('Which?');

        });


        page.section('Danger Zone?', section => {

        });


        page.section('Send this message (default is ... Alert: Sump pump has ran twice in the last X minutes.)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.multi, 'accelerationSensor', 'acceleration.active', 'activeHandler')

    })

    .subscribedEventHandler('activeHandler', (context, event) => {
        
        console.log("running check at: ${event.date}")
        let lastTime = state[this.frequencyKeyAcceleration(evt)]
        if (lastTime == null) {
        state[this.frequencyKeyAcceleration(evt)] = this.now()
        } else {
        if (this.now() - lastTime >= frequency * 60000) {
        state[this.frequencyKeyAcceleration(evt)] = this.now()
        } else {
        if (this.now() - lastTime <= frequency * 60000) {
        console.log('Last time valid')
        let timePassed = this.now() - lastTime
        let timePassedFix = timePassed / 60000
        let timePassedRound = Math.round(timePassedFix.toDouble()) + unit ? unit : ''
        state[this.frequencyKeyAcceleration(evt)] = this.now()
        let msg = messageText ? messageText : "Alert: Sump pump has ran twice in the last $timePassedRound minutes."
        this.sendMessage(msg)
        }
        }
        }
        

	})
