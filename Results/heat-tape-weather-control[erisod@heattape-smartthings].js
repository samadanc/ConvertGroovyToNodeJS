
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
                console.log('getMinTemp (controller) says : ' + this.getMinTemp(4))
                switch ( op_mode ) {
                    case 'Automatic':
                        this.controlAuto()
                        break
                    case 'Temperature-Only':
                        this.controlTempOnly()
                        break
                    case 'Force-On':
                        this.sendHeattapeCommand(1)
                        break
                    case 'Force-Off':
                        this.sendHeattapeCommand(0)
                        break
                    case 'Monitor-Only':
                        break
                }
            

	})

    .scheduledEventHandler('snowBookkeeper', (context, event) => {
        
                this.setupInitialConditions()
                let now = this.now()
                Map currentConditions = this.getWeatherFeature('conditions', zipcode)
                if (null == currentConditions.current_observation) {
                    log.error('Failed to fetch weather condition data.')
                    console.log("conditions data: $currentConditions")
                    return null
                }
                console.log("condition data : ${currentConditions.current_observation}")
                console.log("precip: ${currentConditions.current_observation.precip_1hr_metric}")
                java.lang.Float precip_mm = currentConditions.current_observation.precip_1hr_metric.toFloat()
                java.lang.Float temp_c = currentConditions.current_observation.temp_c.toFloat()
                let solar_radiation = currentConditions.current_observation.solarradiation
                let uv = currentConditions.current_observation.uv
                let wind_kph = currentConditions.current_observation.wind_kph
                let weather = currentConditions.current_observation.weather
                let sunLevel = this.getSunLevel()
                let powerValue = this.getHeattapePower()
                let stateValue = this.getHeattapeState()
                java.lang.Float snow_amount = 0.0
                java.lang.Float rain_amount = 0.0
                if (temp_c < 2) {
                    snow_amount = precip_mm.toFloat()
                } else {
                    rain_amount = precip_mm.toFloat()
                }
                let newWeatherHistory = ['ts': now , 'snow_mm': snow_amount , 'rain_mm': rain_amount , 'temp_c': temp_c , 'solar_radiation': solar_radiation , 'uv': uv , 'wind_kph': wind_kph , 'state': stateValue , 'power': powerValue , 'agg_snow_mm': 0.0, 'sun_level': sunLevel , 'weather': weather ]
                state.history.add(0, newWeatherHistory)
                state.history[0].agg_snow_mm = this.getSnowDepth()
                while (state.history.size() > state.MAX_HISTORY) {
                    state.history.remove(state.MAX_HISTORY)
                }
                this.heattapeController()
            

	})
