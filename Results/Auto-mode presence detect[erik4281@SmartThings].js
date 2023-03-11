
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these presence sensors arrive or leave...', section => {
            section.deviceSetting('presenceDetect').capability(['presenceSensor']).name('Which?');

        });


        page.section('Wait this many minutes before changing to the requested away-mode...', section => {
            section.numberSetting('falseAlarmThreshold').name('Number of minutes');

        });


        page.section('When away...', section => {
            section.deviceSetting('awayOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('awayOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('When at home after sunrise...', section => {
            section.deviceSetting('sunriseOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('sunriseOff').capability(['switch']).name('Turn off switches?');
            section.textSetting('sunriseOffsetValue').name('Time offset: HH:MM (optional)');
            section.enumSetting('sunriseOffsetDir').name('Before or After (optional)');

        });


        page.section('When at home after sunset...', section => {
            section.deviceSetting('sunsetOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('sunsetOff').capability(['switch']).name('Turn off switches?');
            section.textSetting('sunsetOffsetValue').name('Time offset: HH:MM (optional)');
            section.enumSetting('sunsetOffsetDir').name('Before or After (optional)');

        });


        page.section('Don\'t change day/night when in this mode...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.presenceDetect, 'presenceSensor', 'presence', 'presenceHandler')

        context.api.schedules.runIn('astroCheck', delay);

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

    })

    .subscribedEventHandler('sunriseSunsetTimeHandler', (context, event) => {
        
        log.trace('sunriseSunsetTimeHandler()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        this.astroCheck()
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        log.info('Starting presenceHandler')
        
        context.api.devices.sendCommands(context.config.presenceDetect, 'presenceSensor', currentValue)
    
        console.log(current)
        let presenceValue = presenceDetect.find({
        it.currentPresence == 'present'
        })
        state.presence = presenceValue
        console.log("Presence set to: ${state.presence}")
        if (state.presence) {
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        let now = new Date()
        let riseTime = s.sunrise
        let setTime = s.sunset
        if (riseTime < now && setTime > now ) {
        log.info('Setting to home day mode.')
        this.sunriseHandler()
        } else {
        log.info('Setting to home night mode.')
        this.sunsetHandler()
        }
        } else {
        let delay = falseAlarmThreshold != null && falseAlarmThreshold != '' ? falseAlarmThreshold * 60 : 10 * 60
        log.info("Setting to away after the delay ($delays) has passed.")
        this.runIn(delay, 'awayHandler')
        }
        log.info('Finished presenceHandler')
        

	})

    .scheduledEventHandler('astroCheck', (context, event) => {
        
        log.info('Starting astroCheck')
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        let now = new Date()
        let riseTime = s.sunrise
        let setTime = s.sunset
        console.log("riseTime: $riseTime")
        console.log("setTime: $setTime")
        if (state.riseTime != riseTime.time) {
        this.unschedule('sunriseHandler')
        if (riseTime.before(now)) {
        riseTime = riseTime.next()
        }
        state.riseTime = riseTime.time
        log.info("scheduling sunrise handler for $riseTime")
        this.schedule(riseTime, sunriseHandler)
        }
        if (state.setTime != setTime.time) {
        this.unschedule('sunsetHandler')
        if (setTime.before(now)) {
        setTime = setTime.next()
        }
        state.setTime = setTime.time
        log.info("scheduling sunset handler for $setTime")
        this.schedule(setTime, sunsetHandler)
        }
        log.info('Finished astroCheck')
        

	})
