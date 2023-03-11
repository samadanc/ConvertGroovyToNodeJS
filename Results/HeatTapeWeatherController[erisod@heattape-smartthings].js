
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('snowBookkeeper', delay);

        context.api.schedules.runEvery15Minutes('heattapeController', delay);

    })

    .scheduledEventHandler('heattapeController', (context, event) => {
        
                log.info("heattapeController operational mode: $op_mode")
                log.info('4 hour minTemp: ' + this.getMinTemp(4))
                if (heattape) {
                    heattape.each({ 
                        log.info("Unit ${it.displayName} is ${it.currentValue(switch)} and drawing ${it.currentValue(power)}W")
                    })
                }
                switch ( op_mode ) {
                    case 'Automatic':
                    case 1:
                        this.controlAuto()
                        break
                    case 'TemperatureOnly':
                    case 2:
                        this.controlTempOnly()
                        break
                    case 'ForceOn':
                    case 3:
                        this.sendHeattapeCommand(true)
                        break
                    case 'ForceOff':
                    case 4:
                        this.sendHeattapeCommand(false)
                        break
                    case 'Monitor':
                    case 5:
                        break
                }
            

	})

    .scheduledEventHandler('snowBookkeeper', (context, event) => {
        
                this.setupInitialConditions()
                let now = this.now()
                if (state.history.size() > 0) {
                    let age_ms = now - state.history[0].ts
                    log.info("History data is $age_msms old")
                    if (age_ms < 60 * 1000) {
                        log.info('Skipping data collection.')
                        return null
                    }
                }
                Map currentConditions = this.getWeatherFeature('conditions', zipcode)
                if (null == currentConditions.current_observation) {
                    log.error('Failed to fetch weather condition data.')
                    console.log("conditions data: $currentConditions")
                    return null
                }
                console.log("condition data : ${currentConditions.current_observation}")
                java.lang.Float precip_mm = currentConditions.current_observation.precip_1hr_metric.toFloat()
                java.lang.Float temp_c = currentConditions.current_observation.temp_c.toFloat()
                let solar_radiation = currentConditions.current_observation.solarradiation
                let uv = currentConditions.current_observation.uv
                let wind_kph = currentConditions.current_observation.wind_kph
                let weather = currentConditions.current_observation.weather
                let sunLevel = this.getSunLevel()
                let powerValue = this.getHeattapePower()
                let stateValue = this.getHeattapeState()
                java.lang.Float snow_mm = 0.0
                java.lang.Float rain_mm = 0.0
                if (temp_c < 2) {
                    snow_mm = precip_mm.toFloat()
                } else {
                    rain_mm = precip_mm.toFloat()
                }
                if (snow_mm == 0.0 && weather == 'Light Snow') {
                    snow_mm = 1.0
                } else {
                    if (snow_mm == 0.0 && weather == 'Snow') {
                        snow_mm = 2.2
                    } else {
                        if (snow_mm == 0.0 && weather == 'Heavy Snow') {
                            snow_mm = 3.0
                        }
                    }
                }
                if (weather == null || snow_mm == null || temp_c == null) {
                    log.error('Critical field is null.  Not adding data to history.  Something is wrong with fetch or parsing.')
                    log.error("weather : $weather")
                    log.error("snow_mm : $snow_mm")
                    log.error("temp_c  : $temp_c")
                    return null
                }
                let newWeatherHistory = ['ts': now , 'snow_mm': snow_mm , 'rain_mm': rain_mm , 'temp_c': temp_c , 'solar_radiation': solar_radiation , 'uv': uv , 'wind_kph': wind_kph , 'state': stateValue , 'power': powerValue , 'agg_snow_mm': 0.0, 'sun_level': sunLevel , 'weather': weather ]
                state.history.add(0, newWeatherHistory)
                state.history[0].agg_snow_mm = this.getSnowDepth()
                while (state.history.size() > state.MAX_HISTORY) {
                    state.history.remove(state.MAX_HISTORY)
                }
                this.heattapeController()
            

	})
