
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

    })

    .updated(async (context, updateData) => {

        context.api.schedules.schedule('vacationMode_TurnOffHeater', delay);

        context.api.schedules.runOnce('vacationMode_TurnOffHeater', delay);

        context.api.schedules.schedule('vacationMode_TurnOnHeater', delay);

    })

    .scheduledEventHandler('vacationMode_TurnOffHeater', (context, event) => {
        
                if (apiSettings.childTurnedHeaterOn == 'true') {
                    return null
                }
                waterHeaters.setHeatingSetpoint(130)
                waterHeaters.off
                apiSettings.vactionModeHeatedRecently = 'true'
            

	})

    .scheduledEventHandler('vacationMode_TurnOnHeater', (context, event) => {
        
                waterHeaters.on
                waterHeaters.setHeatingSetpoint(140)
                console.log('Vacation Mode: turning on heater at 140 degrees for 2 hours')
                apiSettings.vactionModeHeatedRecently = 'false'
            

	})
