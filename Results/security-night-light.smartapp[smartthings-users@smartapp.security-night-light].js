
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on', section => {
            section.deviceSetting('switches').capability(['switch']).name('Things');

        });


        page.section('Until:', section => {
            section.timeSetting('onUntil').name('Leave on until');

        });


        page.section('Turn on when there\'s movement...', section => {
            section.deviceSetting('motion1').capability(['motionSensor']).name('Where?');
            section.numberSetting('motionOnTime').name('Leave on for how long (minutes)');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('modeStopThings', delay);

        context.api.schedules.schedule('setupSchedule', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.motion1, 'motionSensor', 'motion', 'motionHandler')

    })

    .subscribedEventHandler('motionHandler', (context, event) => {
        
        if (!state.modeStarted) {
        let now = new Date()
        let sunrise = this.GetSunriseTime(now, location.latitude, location.longitude)
        let sunset = this.GetSunsetTime(now, location.latitude, location.longitude)
        if (event.value == 'active' && now > sunset || now < sunrise ) {
        console.log('Saw Motion')
        this.unschedule(motionStopThings)
        this.startThings()
        state.motionStarted = true
        } else {
        if (event.value == 'inactive') {
        console.log('No More Motion')
        this.runIn(motionOnTime * 60, motionStopThings)
        }
        }
        }
        

	})

    .scheduledEventHandler('setupSchedule', (context, event) => {
        
        let now = new Date()
        let times = this.getSunriseAndSunset()
        let sunrise = times.sunrise
        let sunset = times.sunset
        console.log("Rise: $sunrise | Set: $sunset | Now: $now")
        let offTime = this.timeToday(onUntil)
        if (now > sunset ) {
        if (now < offTime ) {
        console.log("Before off time: $offTime")
        this.modeStartThings()
        }
        } else {
        console.log("Scheduling start: $sunset")
        this.runOnce(sunset, modeStartThings)
        }
        

	})

    .scheduledEventHandler('modeStopThings', (context, event) => {
        
        console.log('Mode stopping things')
        state.modeStarted = false
        this.stopThings()
        

	})
