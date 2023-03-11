
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When these presence sensors arrive or leave...', section => {
            section.deviceSetting('people').capability(['presenceSensor']).name('Who?');

        });


        page.section('When away...', section => {
            section.deviceSetting('awayOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('awayOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('When at home after sunrise...', section => {
            section.numberSetting('sunriseOffsetValue').name('Time offset (minutes after)');
            section.deviceSetting('sunriseOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('sunriseOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('When at home after sunset...', section => {
            section.numberSetting('sunsetOffsetValue').name('Time offset (minutes before)');
            section.deviceSetting('sunsetOn').capability(['switch']).name('Turn on switches?');
            section.deviceSetting('sunsetOff').capability(['switch']).name('Turn off switches?');

        });


        page.section('Don\'t change day/night when in this mode...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'position', 'locationPositionChange')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'scheduleSunset')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'scheduleSunrise')

        await context.api.subscriptions.subscribeToDevices(context.config.people, 'presenceSensor', 'presence', 'presenceHandler')

    })

    .subscribedEventHandler('scheduleSunrise', (context, event) => {
        
        let sunriseTime = Date.parse('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', sunriseString)
        let sunriseOffset = sunriseOffsetValue != null ? sunriseOffsetValue * 60000 : 0
        let timeOffsetSunrise = new Date(sunriseTime.time + sunriseOffset )
        console.log("Scheduling for: $timeOffsetSunrise (sunrise is $sunriseTime)")
        this.schedule(timeOffsetSunrise, sunriseHandler)
        

	})

    .subscribedEventHandler('locationPositionChange', (context, event) => {
        
        log.trace('locationChange()')
        

	})

    .subscribedEventHandler('presenceHandler', (context, event) => {
        
        console.log("event.name: ${event.value}")
        let refTime = new Date()
        let sunriseTime = Date.parse('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', location.currentValue('sunriseTime'))
        let sunsetTime = Date.parse('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', location.currentValue('sunsetTime'))
        let sunriseOffset = sunriseOffsetValue != null ? sunriseOffsetValue * 60000 : 0
        let sunsetOffset = sunsetOffsetValue != null ? sunsetOffsetValue * 60000 : 0
        let timeOffsetSunrise = new Date(sunriseTime.time + sunriseOffset )
        let timeOffsetSunset = new Date(sunsetTime.time - sunsetOffset )
        if (this.everyoneIsAway()) {
        let delay = falseAlarmThreshold != null && falseAlarmThreshold != '' ? falseAlarmThreshold * 60 : 10 * 60
        log.info("Setting to away after the delay ($delays) has passed.")
        this.runIn(delay, 'awayHandler')
        } else {
        if (location.mode == awayMode ) {
        log.info('Set to present + give notification')
        state.quietNotify = null
        if (timeOffsetSunset < timeOffsetSunrise && refTime < timeOffsetSunset ) {
        log.info('Setting to home day mode.')
        this.sunriseHandler()
        } else {
        log.info('Setting to home night mode.')
        this.sunsetHandler()
        }
        state.quietNotify = null
        } else {
        log.info('Set to present')
        state.quietNotify = true
        if (timeOffsetSunset < timeOffsetSunrise && refTime < timeOffsetSunset ) {
        log.info('Setting to home day mode.')
        this.sunriseHandler()
        } else {
        log.info('Setting to home night mode.')
        this.sunsetHandler()
        }
        state.quietNotify = null
        }
        }
        

	})

    .subscribedEventHandler('scheduleSunset', (context, event) => {
        
        let sunsetTime = Date.parse('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'', sunsetString)
        let sunsetOffset = sunsetOffsetValue != null ? sunsetOffsetValue * 60000 : 0
        let timeOffsetSunset = new Date(sunsetTime.time - sunsetOffset )
        console.log("Scheduling for: $timeOffsetSunset (sunset is $sunsetTime)")
        this.schedule(timeOffsetSunset, sunsetHandler)
        

	})
