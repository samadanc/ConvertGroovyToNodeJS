
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('How much (percentage) must the humidity rise to trigger a mode change?', section => {
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('');
            section.numberSetting('humidity1').name('How much up?');
            section.numberSetting('humidity2').name('How much down?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'humidityEvent')

    })

    .subscribedEventHandler('humidityEvent', (context, event) => {
        
        log.trace("Current Humidity is ${event.value} as of ${event.date}")
        log.trace("Last Humidity is ${state.lastHumidity}")
        log.trace("set point $humidity1")
        if (state.lastHumidity < event.value.toInteger()) {
        state.currentTrend = 'UP'
        state.currentTrendPts = event.value.toInteger() - state.lastHumidity
        }
        if (state.lastHumidity > event.value.toInteger()) {
        state.currentTrend = 'DOWN'
        state.currentTrendPts = event.value.toInteger() - state.lastHumidity
        }
        if (state.lastHumidity == event.value.toInteger()) {
        state.currentTrend = 'NONE'
        state.currentTrendPts = 0
        }
        state.lastHumidity = event.value.toInteger()
        log.trace("Trend: ${state.currentTrend}  TrendPoints: ${state.currentTrendPts}")
        if (state.currentTrend == 'UP' || state.currentTrend == 'NONE' && state.currentTrendPts >= settings.humidity1 && !state.humidityThresholdActivated) {
        log.trace('Passed Threshold.. Do Stuff!')
        if (location.mode != newModeUp ) {
        this.setLocationMode(newModeUp)
        }
        state.humidityThresholdActivated = true
        } else {
        log.trace("state.currentTrendPts:${state.currentTrendPts} ; 0 - settings.humidity2:${(0 - settings.humidity2)}")
        if (state.humidityThresholdActivated && state.currentTrendPts <= 0 - settings.humidity2) {
        log.trace('Dropped below threshold.. Undo Stuff!')
        if (location.mode != newModeDown ) {
        this.setLocationMode(newModeDown)
        }
        state.humidityThresholdActivated = false
        }
        }
        

	})
