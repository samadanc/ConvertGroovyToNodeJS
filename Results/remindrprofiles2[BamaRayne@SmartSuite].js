
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('mGetCurrentWeather', delay);

        context.api.schedules.runEvery5Minutes('mGetWeatherAlerts', delay);

    })

    .scheduledEventHandler('mGetWeatherAlerts', (context, event) => {
        
                let result 
                let firstTime = false
                if (state.weatherAlert == null) {
                    result = 'You are now subscribed to selected weather alerts for your area'
                    firstTime = true
                    state.weatherAlert = 'There are no weather alerts for your area'
                    state.lastAlert = new Date(this.now()).format('h:mm aa', location.timeZone)
                } else {
                    result = 'There are no weather alerts for your area'
                }
                let data = [:]
                try {
                    let weather = this.getTwcAlerts('alerts', state?.wZipCode)
                    let type = weather?.alerts?.type[0]
                    let alert = weather?.alerts?.description[0]
                    let expire = weather?.alerts?.expires[0]
                    let typeOk = settings?.myWeatherAlert?.find({ let a ->
                        a == type 
                    })
                    if (typeOk) {
                        if (expire != null) {
                            expire = expire?.replaceAll(~(' EST ') , ' ')?.replaceAll(~(' CST ') , ' ')?.replaceAll(~(' MST ') , ' ')?.replaceAll(~(' PST ') , ' ')
                        }
                        if (alert != null) {
                            result = alert + ' is in effect for your area, that expires at ' + expire 
                            if (state?.weatherAlert == null) {
                                state?.weatherAlert = result 
                                state?.lastAlert = new Date(this.now()).format('h:mm aa', location.timeZone)
                                data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                                this.alertsHandler(data)
                            } else {
                                if (state?.showDebug) {
                                    console.log("new weather alert = $alert, expire = $expire")
                                }
                                let newAlert = result != state?.weatherAlert ? true : false
                                if (newAlert == true) {
                                    state?.weatherAlert = result 
                                    state?.lastAlert = new Date(this.now()).format('h:mm aa', location.timeZone)
                                    data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                                    this.alertsHandler(data)
                                }
                            }
                        }
                    } else {
                        if (firstTime == true) {
                            data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                            this.alertsHandler(data)
                        }
                    }
                } 
                catch (Throwable t) {
                    log.error(t)
                    return result 
                } 
            

	})

    .scheduledEventHandler('mGetCurrentWeather', (context, event) => {
        
                let weatherData = [:]
                let data = [:]
                let result 
                try {
                    let cWeather = this.getTwcAlertDetail(state?.wZipCode)
                    let cWeatherCondition = cWeather?.hourly_forecast[0]?.condition
                    let cWeatherPrecipitation = cWeather?.hourly_forecast[0]?.pop + ' percent'
                    let cWeatherWind = cWeather?.hourly_forecast[0]?.wspd?.english + ' miles per hour'
                    let cWeatherWindC = cWeather?.hourly_forecast[0]?.wspd?.metric + ' kilometers per hour'
                    if (this.getMetric() == true) {
                        cWeatherWind = cWeatherWindC 
                    }
                    let cWeatherHum = cWeather?.hourly_forecast[0]?.humidity + ' percent'
                    let cWeatherUpdate = cWeather?.hourly_forecast[0]?.FCTTIME?.civil
                    let pastWeather = state.lastWeather
                    weatherData.wCond = cWeatherCondition 
                    weatherData.wWind = cWeatherWind 
                    weatherData.wHum = cWeatherHum 
                    weatherData.wPrecip = cWeatherPrecipitation 
                    let lastUpdated = new Date(this.now()).format('h:mm aa', location.timeZone)
                    if (settings?.myWeather) {
                        if (pastWeather == null) {
                            state.lastWeather = weatherData 
                            state.lastWeatherCheck = lastUpdated 
                            result = 'hourly weather forcast notification has been activated at ' + lastUpdated + ' You will now receive hourly weather updates, only if the forecast data changes'
                            data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                            this.alertsHandler(data)
                        } else {
                            let wUpdate = pastWeather.wCond != cWeatherCondition ? 'current weather condition' : pastWeather.wWind != cWeatherWind ? 'wind intensity' : pastWeather.wHum != cWeatherHum ? 'humidity' : pastWeather.wPrecip != cWeatherPrecipitation ? 'chance of precipitation' : null
                            let wChange = wUpdate == 'current weather condition' ? cWeatherCondition : wUpdate == 'wind intensity' ? cWeatherWind : wUpdate == 'humidity' ? cWeatherHum : wUpdate == 'chance of precipitation' ? cWeatherPrecipitation : null
                            if (wUpdate != null) {
                                state.lastWeather = weatherData 
                                state.lastWeatherCheck = lastUpdated 
                                if (settings?.myWeather == 'Any Weather Updates') {
                                    let condChanged = pastWeather.wCond != cWeatherCondition 
                                    let windChanged = pastWeather.wWind != cWeatherWind 
                                    let humChanged = pastWeather.wHum != cWeatherHum 
                                    let precChanged = pastWeather.wPrecip != cWeatherPrecipitation 
                                    if (condChanged) {
                                        result = 'The hourly weather forecast has been updated. The weather condition has been changed to ' + cWeatherCondition 
                                    }
                                    if (windChanged) {
                                        if (result) {
                                            result = result + ', the wind intensity to ' + cWeatherWind 
                                        } else {
                                            result = 'The hourly weather forecast has been updated. The wind intensity has been changed to ' + cWeatherWind 
                                        }
                                    }
                                    if (humChanged) {
                                        if (result) {
                                            result = result + ', the humidity to ' + cWeatherHum 
                                        } else {
                                            result = 'The hourly weather forecast has been updated. The humidity has been changed to ' + cWeatherHum 
                                        }
                                    }
                                    if (precChanged) {
                                        if (result) {
                                            result = result + ', the chance of rain to ' + cWeatherPrecipitation 
                                        } else {
                                            result = 'The hourly weather forecast has been updated. The chance of rain has been changed to ' + cWeatherPrecipitation 
                                        }
                                    }
                                    data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                                    this.alertsHandler(data)
                                } else {
                                    if (settings?.myWeather == 'Weather Condition Changes' && wUpdate == 'current weather condition') {
                                        result = 'The ' + wUpdate + ' has been updated to ' + wChange 
                                        data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                                        this.alertsHandler(data)
                                    } else {
                                        if (settings?.myWeather == 'Chance of Precipitation Changes' && wUpdate == 'chance of precipitation') {
                                            result = 'The ' + wUpdate + ' has been updated to ' + wChange 
                                            data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                                            this.alertsHandler(data)
                                        } else {
                                            if (settings?.myWeather == 'Wind Speed Changes' && wUpdate == 'wind intensity') {
                                                result = 'The ' + wUpdate + ' has been updated to ' + wChange 
                                                data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                                                this.alertsHandler(data)
                                            } else {
                                                if (settings?.myWeather == 'Humidity Changes' && wUpdate == 'humidity') {
                                                    result = 'The ' + wUpdate + ' has been updated to ' + wChange 
                                                    data = ['value': result , 'name': 'weather alert', 'device': 'weather']
                                                    this.alertsHandler(data)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
                catch (Throwable t) {
                    log.error(t)
                    return result 
                } 
            

	})
