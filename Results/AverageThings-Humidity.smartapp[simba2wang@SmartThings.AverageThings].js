
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Choose a target virtual humidity tile... ', section => {
            section.deviceSetting('target').capability(['relativeHumidityMeasurement']).name('Tile');

        });


        page.section('Choose a source humidity sensors... ', section => {
            section.deviceSetting('sensors').capability(['relativeHumidityMeasurement']).name('Sensors');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.sensors, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        let sum = 0
        let count = 0
        let average = 0
        for (let sensor : settings.sensors) {
        count += 1
        sum += sensor.currentHumidity
        }
        average = sum / count
        console.log("average: $average")
        settings.target.parse
        

	})
