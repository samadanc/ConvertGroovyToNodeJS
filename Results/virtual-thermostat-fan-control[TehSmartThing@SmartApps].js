
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a temperature sensor... ', section => {
            section.deviceSetting('sensor').capability(['temperatureMeasurement']).name('Sensor');

        });


        page.section('Select dimmer for the Fan(s)... ', section => {
            section.deviceSetting('outlets').capability(['switchLevel']).name('Fan');

        });


        page.section('Set the desired temperature...', section => {

        });


        page.section('Select \'heat\' for a heater and \'cool\' for an air conditioner...', section => {
            section.enumSetting('mode').name('Heating or cooling?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensor, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        this.evaluate(event.doubleValue, setpoint)
        

	})
