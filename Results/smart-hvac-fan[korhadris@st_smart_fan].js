
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Temperature diffference to turn on fan', section => {
            section.numberSetting('max_delta').name('Max temp difference');
            section.numberSetting('hysteresis').name('Hysteresis');

        });


        page.section('Fans', section => {
            section.deviceSetting('thermostat_fans').capability(['thermostat']).name('Thermostat Fans');
            section.deviceSetting('switch_fans').capability(['switch']).name('Switched Fans');

        });


        page.section('Temperature sensors', section => {
            section.deviceSetting('temps').capability(['temperatureMeasurement']).name('Sensors');

        });


    })

    .updated(async (context, updateData) => {

    })

    .subscribedEventHandler('temperatureChangeHandler', (context, event) => {
        
        this.checkTemperatures()
        

	})
