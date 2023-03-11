
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('CO2 Sensor', section => {
            section.deviceSetting('sensor').capability(['carbonDioxideMeasurement']).name('Sensor');
            section.numberSetting('level').name('CO2 Level');

        });


        page.section('Ventilation Fan', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'carbonDioxideMeasurement', 'carbonDioxide', 'handleLevel')

    })

    .subscribedEventHandler('handleLevel', (context, event) => {
        
        
        context.api.devices.sendCommands(context.config.sensor, 'carbonDioxideMeasurement', currentValue)
    
        console.log("CO2 Level: $co2 / ${settings.level} Active: ${state.active}")
        if (co2 >= settings.level && !state.active) {
        console.log('Turning on')
        switches.each({
        it.on()
        })
        state.active = true
        } else {
        if (co2 < settings.level && state.active) {
        console.log('Turning off')
        state.active = false
        switches.each({
        it.off()
        })
        }
        }
        

	})
