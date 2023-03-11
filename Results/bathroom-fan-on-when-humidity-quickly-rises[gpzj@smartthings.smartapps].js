
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Humidity Sensor', section => {
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('Choose Humidity Sensor');

        });


        page.section('Bathroom Fan', section => {
            section.deviceSetting('bathroomFan').capability(['switch']).name('Choose Bathroom Fan Switch');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'humidityChangeCheck')

    })

    .subscribedEventHandler('humidityChangeCheck', (context, event) => {
        
        console.log("handler ${event.name}: ${event.value}")
        
        context.api.devices.sendCommands(context.config.bathroomFan, 'switch', on)
    
        

	})
