
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('getWeather', delay);

    })

    .subscribedEventHandler('contactHandler', (context, event) => {
        
                if (event.value == 'open') {
                    this.debug('Contact sensor open, turning on light', true)
                    this.displayWeather()
                }
            

	})

    .subscribedEventHandler('motionHandler', (context, event) => {
        
                if (event.value == 'active') {
                    this.debug('Motion detected, turning on light', true)
                    this.displayWeather()
                }
            

	})

    .scheduledEventHandler('getWeather', (context, event) => {
        
                let forecastUrl = "https://api.forecast.io/forecast/$apiKey/${location.latitude},${location.longitude}?exclude=daily,flags,minutely"
                if (forecastRange == 'Current conditions') {
                    forecastUrl += ',hourly'
                } else {
                    forecastUrl += ',currently'
                }
                if (alertFlash == null) {
                    forecastUrl += ',alerts'
                }
                this.debug(forecastUrl)
                this.httpGet(forecastUrl, { let response ->
                    if (response.data) {
                        state.weatherData = response.data
                        let d = new Date()
                        state.forecastTime = d.getTime()
                        this.debug('Successfully retrieved weather.', true)
                        if (alwaysOn) {
                            this.displayWeather(true)
                        }
                    } else {
                        this.runIn(60, getWeather)
                        this.debug('Failed to retrieve weather.', true)
                    }
                })
            

	})
