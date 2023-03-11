
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


        page.section('Zip code (for sunrise/sunset)', section => {

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification when house is empty?');
            section.enumSetting('sendPushMessageHome').name('Send a push notification when home is occupied?');

        });


        page.section('More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('checkSun', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunrise', 'setSunrise')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunset', 'setSunset')

    })

    .subscribedEventHandler('setSunrise', (context, event) => {
        
        state.sunMode = 'sunrise'
        this.changeSunMode(newMode)
        

	})

    .subscribedEventHandler('setSunset', (context, event) => {
        
        state.sunMode = 'sunset'
        this.changeSunMode(newMode)
        

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

    .scheduledEventHandler('checkSun', (context, event) => {
        
        let zip = (settings.zip as String)
        let sunInfo = this.getSunriseAndSunset(['zipCode': zip ])
        let current = this.now()
        if (sunInfo.sunrise.time < current && sunInfo.sunset.time > current ) {
        state.sunMode = 'sunrise'
        this.setSunrise()
        } else {
        state.sunMode = 'sunset'
        this.setSunset()
        }
        

	})
