
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('scheduledRun', delay);

        context.api.schedules.schedule('dailyForecast', delay);

    })

    .scheduledEventHandler('scheduledRun', (context, event) => {
        
                let delay 
                let forecastDay 
                if (settings.switch1Timmer != null || 0) {
                    delay = switch1Timmer * 60
                }
                if (settings.highLow == false) {
                    forecastDay = state.forecastDayHigh.toInteger()
                } else {
                    forecastDay = state.forecastDayLow.toInteger()
                }
                if (settings.aboveBelow == false && settings.switch1OnOff == false) {
                    if (forecastDay >= settings.setTemp) {
                        switch1.on()
                        if (settings.switch1Timmer != null || 0) {
                            this.runIn(delay, 'turnOff')
                        }
                    }
                }
                if (settings.aboveBelow == false && settings.switch1OnOff == true) {
                    if (forecastDay >= settings.setTemp) {
                        switch1.off()
                        if (settings.switch1Timmer != null || 0) {
                            this.runIn(delay, 'turnOn')
                        }
                    }
                }
                if (settings.aboveBelow == true && settings.switch1OnOff == false) {
                    if (forecastDay <= settings.setTemp) {
                        switch1.on()
                        if (settings.switch1Timmer != null || 0) {
                            this.runIn(delay, 'turnOff')
                        }
                    }
                }
                if (settings.aboveBelow == true && settings.switch1OnOff == true) {
                    if (forecastDay <= settings.setTemp) {
                        switch1.off()
                        if (settings.switch1Timmer != null || 0) {
                            this.runIn(delay, 'turnOn')
                        }
                    }
                }
            

	})

    .scheduledEventHandler('dailyForecast', (context, event) => {
        
                let forecast 
                let forecastDayHigh 
                let forecastDayLow 
                let temperatureScale = this.getTemperatureScale()
                if (settings.zipcode) {
                    forecast = this.getWeatherFeature('forecast', settings.zipcode)
                } else {
                    forecast = this.getWeatherFeature('forecast')
                }
                if (temperatureScale == 'F') {
                    state.forecastDayHigh = forecast.forecast.simpleforecast.forecastday[0].high.fahrenheit.toInteger()
                    state.forecastDayLow = forecast.forecast.simpleforecast.forecastday[0].low.fahrenheit.toInteger()
                } else {
                    state.forecastDayHigh = forecast.forecast.simpleforecast.forecastday[0].high.celsius.toInteger()
                    state.forecastDayLow = forecast.forecast.simpleforecast.forecastday[0].low.celsius.toInteger()
                }
                state.update = new Date().format('yyyy-MM-dd HH:mm', location.timeZone)
                if (settings.switch1Schedule == null) {
                    this.scheduledRun()
                }
            

	})
