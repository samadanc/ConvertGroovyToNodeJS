
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this switch is turned off...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('Which?');

        });


        page.section('Turn it back on after how many minutes?', section => {
            section.numberSetting('time').name('Enter 0 to turn on immedately');

        });


        page.section('But only after dark for this area.', section => {
            section.numberSetting('zip').name('Zip Code');

        });


        page.section('Automatically turn....', section => {
            section.booleanSetting('onAtSet').name('On at Sunset?');
            section.booleanSetting('offAtRise').name('Off at Sunrise?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunriseSunsetTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch.off', 'switchOffHandler')

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

    .subscribedEventHandler('switchOffHandler', (context, event) => {
        
        let data = this.getWeatherFeature('astronomy', (settings.zip as String))
        let sunsetTime = data.moon_phase.sunset.hour + ':' + data.moon_phase.sunset.minute
        let sunriseTime = data.moon_phase.sunrise.hour + ':' + data.moon_phase.sunrise.minute
        let currentTime = data.moon_phase.current_time.hour + ':' + data.moon_phase.current_time.minute
        let localData = this.getWeatherFeature('geolookup', (settings.zip as String))
        let timezone = TimeZone.getTimeZone(localData.location.tz_long)
        console.log("Sunset today is at $sunsetTime")
        console.log("Sunrise today is at $sunriseTime")
        console.log("${event.value}: $evt, $settings")
        let startTime = this.timeToday(sunsetTime, timezone)
        let endTime = this.timeToday(sunriseTime, timezone)
        if (this.now() < startTime.time && this.now() > endTime.time) {
        console.log('Too much light, not turning back on')
        } else {
        log.trace('Turning back on soon...')
        let delay = time * 60
        this.runIn(delay, switchOn)
        }
        

	})
