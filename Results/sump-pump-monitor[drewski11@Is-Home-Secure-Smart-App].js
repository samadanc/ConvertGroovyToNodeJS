
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Which multisensor should I monitor?', section => {
            section.deviceSetting('multi').capability(['accelerationSensor']).name('Which?');

        });


        page.section('Danger Zone?', section => {

        });


        page.section('Send this message (default is ... Alert: Sump pump has ran in twice in the last X minutes.)', section => {
            section.textSetting('messageText').name('Message Text');

        });


        page.section('Via a push notification and/or an SMS message', section => {
            section.enumSetting('pushAndPhone').name('Both Push and SMS?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.multi, 'accelerationSensor', 'acceleration.active', 'checkFrequency')

    })

    .subscribedEventHandler('checkFrequency', (context, event) => {
        
        console.log('running check sump')
        let lastTime = state[this.frequencyKeyAccelration(evt)]
        if (lastTime == null) {
        state[this.frequencyKeyAccelration(evt)] = this.now()
        } else {
        if (this.now() - lastTime >= frequency * 60000) {
        state[this.frequencyKeyAccelration(evt)] = this.now()
        } else {
        if (this.now() - lastTime <= frequency * 60000) {
        console.log('Last time valid')
        let timePassed = this.now() - lastTime
        let timePassedFix = timePassed / 60000
        let timePassedRound = Math.round(timePassedFix.toDouble()) + unit ? unit : ''
        state[this.frequencyKeyAccelration(evt)] = this.now()
        let msg = messageText ? messageText : "Alert: Sump pump has ran in twice in the last $timePassedRound minutes."
        if (!phone || pushAndPhone != 'No') {
        console.log('sending push')
        this.sendPush(msg)
        }
        if (phone) {
        console.log('sending SMS')
        this.sendSms(phone, msg)
        }
        }
        }
        }
        

	})
