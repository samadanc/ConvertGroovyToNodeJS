
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


        page.section('Zip code (for sunrise/sunset)', section => {
            section.textSetting('zip').name('');

        });


        page.section('Notifications', section => {
            section.booleanSetting('sendPushMessage').name('Send notifications when house is empty?');
            section.booleanSetting('sendPushMessageHome').name('Send notifications when home is occupied?');

        });


        page.section('Send Notifications?', section => {

        });


        page.section('More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'setSunrise')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'setSunset')

    })

    .subscribedEventHandler('setSunrise', (context, event) => {
        
        state.sunMode = 'sunrise'
        this.changeSunMode(newMode)
        console.log("Current sun mode is ${state.sunMode}")
        

	})

    .subscribedEventHandler('setSunset', (context, event) => {
        
        state.sunMode = 'sunset'
        this.changeSunMode(newMode)
        console.log("Current sun mode is ${state.sunMode}")
        

	})

    .subscribedEventHandler('presence', (context, event) => {
        
        if (allOk) {
        if (event.value == 'not present') {
        console.log('Checking if everyone is away')
        if (this.everyoneIsAway()) {
        console.log('Nobody is home, running away sequence')
        let delay = falseAlarmThreshold != null && falseAlarmThreshold != '' ? falseAlarmThreshold * 60 : 10 * 60
        this.runIn(delay, 'setAway')
        }
        } else {
        let lastTime = state[event.deviceId]
        if (lastTime == null || this.now() - lastTime >= 1 * 60000) {
        console.log('Someone is home, running home sequence')
        this.setHome()
        }
        state[event.deviceId] = this.now()
        }
        }
        

	})
