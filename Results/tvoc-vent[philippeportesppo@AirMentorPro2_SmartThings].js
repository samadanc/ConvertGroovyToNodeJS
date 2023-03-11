
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('TVOC Sensor', section => {
            section.deviceSetting('Air_Mentor_Pro_2').capability(['carbonDioxideMeasurement']).name('TVOC Sensor');
            section.enumSetting('level').name('TVOC Level for vents action');

        });


        page.section('Ventilation Fan', section => {
            section.deviceSetting('switches').capability(['switch']).name('Switches');
            section.deviceSetting('thermostat').capability(['thermostat']).name('thermostat');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.Air_Mentor_Pro_2, 'carbonDioxideMeasurement', 'TVOC', 'handleLevel')

    })

    .subscribedEventHandler('handleLevel', (context, event) => {
        
        if
        console.log('Turning on')
        switches.each({
        it.on()
        })
        thermostat.each({
        it.setThermostatFanMode('on')
        })
        } else {
        console.log('Turning off')
        switches.each({
        it.off()
        })
        thermostat.each({
        it.setThermostatFanMode('auto')
        })
        }
        

	})
