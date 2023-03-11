
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Turn on a switch', section => {
            section.deviceSetting('switches').capability(['switch']).name('');

        });


        page.section('Run every minutes?', section => {
            section.numberSetting('RunCron').name('Enter 2 to 60 min');

        });


        page.section('Turn off after how many minutes?', section => {
            section.numberSetting('time').name('Enter 0 to not auto-off');

        });


        page.section('But during the day for this area.', section => {
            section.numberSetting('zip').name('Zip Code');

        });


    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('WaterPlants', delay);

    })

    .scheduledEventHandler('WaterPlants', (context, event) => {
        
        log.trace('Calling Watering')
        let data = this.getWeatherFeature('astronomy', (settings.zip as String))
        let sunsetTime = data.moon_phase.sunset.hour + ':' + data.moon_phase.sunset.minute
        let sunriseTime = data.moon_phase.sunrise.hour + ':' + data.moon_phase.sunrise.minute
        let currentTime = data.moon_phase.current_time.hour + ':' + data.moon_phase.current_time.minute
        let localData = this.getWeatherFeature('geolookup', (settings.zip as String))
        let timezone = TimeZone.getTimeZone(localData.location.tz_long)
        console.log("Sunset today is at $sunsetTime")
        console.log("Sunrise today is at $sunriseTime")
        let startTime = this.timeToday(sunsetTime, timezone)
        let endTime = this.timeToday(sunriseTime, timezone)
        if (this.now() < startTime.time && this.now() > endTime.time) {
        console.log('Turn the Switches on')
        
        context.api.devices.sendCommands(context.config.switches, 'switch', on)
    
        if (time == 0) {
        console.log('Not gonna turn you off')
        } else {
        let delay = time * 60
        log.trace("Turning off after $delay seconds")
        this.runIn(delay, turnAllOff)
        }
        } else {
        log.trace('After SunSet Not doing anything.')
        }
        

	})
