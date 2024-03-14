
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When there\'s movement...', section => {
            section.deviceSetting('themotion').capability(['motionSensor']).name('Where?');

        });


        page.section('Turn on a light...', section => {
            section.deviceSetting('theswitch').capability(['switch']).name('');
            section.numberSetting('onTime').name('For minutes');

        });


        page.section('Sunrise offset (optional)...', section => {
            section.textSetting('sunriseOffsetValue').name('HH:MM');
            section.enumSetting('sunriseOffsetDir').name('Before or After');

        });


        page.section('Sunset offset (optional)...', section => {
            section.textSetting('sunsetOffsetValue').name('HH:MM');
            section.enumSetting('sunsetOffsetDir').name('Before or After');

        });


        page.section('Zip code (optional, defaults to location coordinates)...', section => {
            section.textSetting('zipCode').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.themotion, 'motionSensor', 'motion.active', 'motionActiveHandler')

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

    .subscribedEventHandler('motionActiveHandler', (context, event) => {
        
        console.log("motionActiveHandler() $evt")
        let s = this.getSunriseAndSunset(['zipCode': zipCode , 'sunriseOffset': sunriseOffset , 'sunsetOffset': sunsetOffset ])
        let now = new Date()
        let riseTime = s.sunrise
        let setTime = s.sunset
        let nowTime = now.time
        let riseTimeNext = riseTime.next()
        let setTimeNext = setTime.next()
        console.log("onTime: $onTime")
        java.lang.Integer duration = 60 * onTime
        console.log("duration: $duration")
        if (now.after(setTime) || now.before(riseTime)) {
        console.log('Turn Light on')
        
        context.api.devices.sendCommands(context.config.theswitch, 'switch', on)
    
        this.runIn(60 * onTime , switchOffHandler)
        } else {
        console.log('No need to turn on Light')
        }
        

	})
        console.log("{{interesting}}")

