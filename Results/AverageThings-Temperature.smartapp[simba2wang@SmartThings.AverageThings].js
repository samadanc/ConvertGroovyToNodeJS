
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a target virtual temperature tile... ', section => {
            section.deviceSetting('target').capability(['temperatureMeasurement']).name('Tile');

        });


        page.section('Choose a source temperature sensors... ', section => {
            section.deviceSetting('sensors').capability(['temperatureMeasurement']).name('Sensors');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        let sum = 0
        let count = 0
        let average = 0
        for (let sensor : settings.sensors) {
        count += 1
        sum += sensor.currentTemperature
        }
        average = sum / count
        console.log("average: $average")
        settings.target.parse
        

	})
