
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('False alarm threshold (defaults to 10 min)', section => {

        });


        page.section('Zip code', section => {
            section.textSetting('zip').name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification when the house is empty?');
            section.enumSetting('sendPushMessageHome').name('Send a push notification when the house is occupied?');

        });


        page.section('More options', section => {
            section.enumSetting('days').name('Only on certain days of the week');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.runIn('checkSun', delay);

        context.api.schedules.schedule('changeToNightMode', delay);

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
        log.info('Nobody is home, running away sequence')
        let delay = falseAlarmThreshold != null && falseAlarmThreshold != '' ? falseAlarmThreshold * 60 : 10 * 60
        this.runIn(delay, 'setAway')
        }
        } else {
        let lastTime = state[event.deviceId]
        if (lastTime == null || this.now() - lastTime >= 1 * 60000) {
        log.info('Someone is home, running home sequence')
        this.setHome()
        }
        state[event.deviceId] = this.now()
        }
        }
        

	})

    .scheduledEventHandler('changeToNightMode', (context, event) => {
        
        log.info("It is night time $nightModeInitiationTime, checking which night mode to set based on if anyone is home.")
        if (this.everyoneIsAway() && location.currentMode == settings.awayModeDay || location.currentMode == settings.awayModeEvening || location.currentMode == settings.awayModeNight) {
        let message = "Performing "$inAwayToNight" for you as requested."
        log.info(message)
        this.sendAway(message)
        location.helloHome.execute(settings.inAwayToNight)
        } else {
        if (this.everyoneIsAway() && location.currentMode == settings.homeModeDay || location.currentMode == settings.homeModeEvening || location.currentMode == settings.homeModeNight) {
        let message = "Performing "$awayNight" for you as requested."
        log.info(message)
        this.sendAway(message)
        location.helloHome.execute(settings.awayNight)
        }
        }
        if (this.anyoneIsHome() && location.currentMode == settings.awayModeDay || location.currentMode == settings.awayModeEvening || location.currentMode == settings.awayModeNight) {
        let message = "Performing "$homeNight" for you as requested."
        log.info(message)
        this.sendHome(message)
        location.helloHome.execute(settings.homeNight)
        } else {
        if (this.anyoneIsHome() && location.currentMode == settings.homeModeDay || location.currentMode == settings.homeModeEvening || location.currentMode == settings.homeModeNight) {
        let message = "Performing "$inHomeToNight" for you as requested."
        log.info(message)
        this.sendHome(message)
        location.helloHome.execute(settings.inHomeToNight)
        }
        }
        

	})

    .scheduledEventHandler('checkSun', (context, event) => {
        
        let zip = (settings.zip as String)
        console.log("ZipCode is: $zip")
        let preOffsetSunInfo = this.getSunriseAndSunset(['zipCode': zip ])
        let df = new java.text.SimpleDateFormat('hh:mm:ss a')
        df.setTimeZone(location.timeZone)
        let preOffsetSunriseTime = df.format(preOffsetSunInfo.sunrise)
        let preOffsetSunsetTime = df.format(preOffsetSunInfo.sunset)
        console.log('CheckSun: preOffsetSunInfo.sunrise.time: ' + preOffsetSunInfo.sunrise.time + " in readable form: $preOffsetSunriseTime")
        console.log('CheckSun: preOffsetSunInfo.sunset.time: ' + preOffsetSunInfo.sunset.time + " in readable form: $preOffsetSunsetTime")
        let sunInfo = this.getSunriseAndSunset(['zipCode': zip , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        let current = this.now()
        let localTime = df.format(current)
        let localSunriseTime = df.format(sunInfo.sunrise)
        let localSunsetTime = df.format(sunInfo.sunset)
        console.log('CheckSun: Current time is: ' + current + " in readable form: $localTime")
        console.log('CheckSun: Offset sunInfo.sunrise.time: ' + sunInfo.sunrise.time + " in readable form: $localSunriseTime")
        console.log('CheckSun: Offset sunInfo.sunset.time: ' + sunInfo.sunset.time + " in readable form: $localSunsetTime")
        if (sunInfo.sunrise.time < current && sunInfo.sunset.time > current ) {
        state.sunMode = 'sunrise'
        this.setSunrise()
        } else {
        state.sunMode = 'sunset'
        this.setSunset()
        }
        

	})
