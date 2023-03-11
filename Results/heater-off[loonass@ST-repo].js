
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Select the heater outlet(s)... ', section => {
            section.deviceSetting('outlets').capability(['switch']).name('Outlets');

        });


        page.section('Set the maximum temperature...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        console.log("Evaluate (Is ${sensor.currentTemperature} >= ${settings.setpoint})")
        if (sensor.currentTemperature >= setpoint ) {
        console.log('Yes')
        
        context.api.devices.sendCommands(context.config.outlets, 'switch', off)
    
        console.log('Off')
        } else {
        console.log('No')
        }
        

	})
