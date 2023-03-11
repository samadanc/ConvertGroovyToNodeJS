
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log the following...', section => {
            section.deviceSetting('temp1').capability(['temperatureMeasurement']).name('Temperature');
            section.deviceSetting('humi1').capability(['relativeHumidityMeasurement']).name('Humidity');
            section.deviceSetting('lux1').capability(['illuminanceMeasurement']).name('Illuminance');

        });


        page.section('Enter your ThingSpeak API Key...', section => {
            section.textSetting('thingSpeakApiKey').name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temp1, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

    })

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        let httpGetUrl = "http://api.thingspeak.com/update?key=$thingSpeakApiKey&field1=${event.value}"
        this.httpGet(httpGetUrl, { let response ->
        if (response.status != 200) {
        console.log("ThingSpeak Logging Failed: status was ${response.status}")
        } else {
        console.log('ThingSpeak Logging Successful')
        }
        })
        

	})
