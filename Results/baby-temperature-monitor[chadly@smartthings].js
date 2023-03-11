
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.runEvery1Hour('doTempCheck', delay);

    })

    .scheduledEventHandler('doTempCheck', (context, event) => {
        
                log.trace("(0D) - doTempCheck() - settings: $settings")
                let thermostatLevel = therm.currentValue('temperature')
                log.trace("(0E) - Checking... ${therm.label}: $thermostatLevel°
        ")
                if (settings.maxThreshold.toInteger() != null && thermostatLevel >= settings.maxThreshold.toInteger()) {
                    log.warn("(0F) - ${therm.label}: $thermostatLevel°
        ")
                    lights.on()
                }
                if (settings.minThreshold.toInteger() != null && thermostatLevel <= settings.minThreshold.toInteger()) {
                    log.warn("(10) - ${thermostatDevice.label}: $thermostatLevel°
        ")
                    lights.on()
                }
            

	})
