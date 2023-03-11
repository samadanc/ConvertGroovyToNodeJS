
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('When this door opens...', section => {
            section.deviceSetting('contact1').capability(['contactSensor']).name('Where?');

        });


        page.section('Turn on this light(s)...', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('But only after dark for this area.', section => {
            section.numberSetting('zip').name('Zip Code');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.contact1, 'contactSensor', 'contact.open', 'contactOpenHandler')

    })

    .subscribedEventHandler('contactOpenHandler', (context, event) => {
        
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
        console.log('Too much light, not turning on')
        } else {
        log.trace("Turning on switches: $switches")
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        }
        

	})
