
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('sleepTemp', delay);

        context.api.schedules.schedule('returnTemp', delay);

        context.api.schedules.schedule('leaveTemp', delay);

        context.api.schedules.schedule('wakeTemp', delay);

    })

    .scheduledEventHandler('wakeTemp', (context, event) => {
        
                if (enabled) {
                    currentTemp = thermostatDevice.currentValue('heatingSetpoint')
                    currentMode = thermostatDevice.currentValue('thermostatMode')
                    if (logEnable) {
                        console.log("Thermostat: $thermostatDevice Temp: $currentTemp Mode: $currentMode, setting to Temp: $WakeTemp")
                    }
                    thermostatDevice.setHeatingSetpoint(WakeTemp)
                }
            

	})

    .scheduledEventHandler('sleepTemp', (context, event) => {
        
                if (enabled) {
                    currentTemp = thermostatDevice.currentValue('heatingSetpoint')
                    currentMode = thermostatDevice.currentValue('thermostatMode')
                    if (logEnable) {
                        console.log("Thermostat: $thermostatDevice Temp: $currentTemp Mode: $currentMode, setting to Temp: $SleepTemp")
                    }
                    thermostatDevice.setHeatingSetpoint(SleepTemp)
                }
            

	})

    .scheduledEventHandler('leaveTemp', (context, event) => {
        
                if (enabled) {
                    currentTemp = thermostatDevice.currentValue('heatingSetpoint')
                    currentMode = thermostatDevice.currentValue('thermostatMode')
                    if (logEnable) {
                        console.log("Thermostat: $thermostatDevice Temp: $currentTemp Mode: $currentMode, setting to Temp: $LeaveTemp")
                    }
                    thermostatDevice.setHeatingSetpoint(LeaveTemp)
                }
            

	})

    .scheduledEventHandler('returnTemp', (context, event) => {
        
                if (enabled) {
                    currentTemp = thermostatDevice.currentValue('heatingSetpoint')
                    currentMode = thermostatDevice.currentValue('thermostatMode')
                    if (logEnable) {
                        console.log("Thermostat: $thermostatDevice Temp: $currentTemp Mode: $currentMode, setting to Temp: $ReturnTemp")
                    }
                    thermostatDevice.setHeatingSetpoint(ReturnTemp)
                }
            

	})
