
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the humidity of:', section => {
            section.deviceSetting('humiditySensor1').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('Humidity threshold:', section => {
            section.numberSetting('humidity1').name('Percentage ?');

        });


        page.section('Control this switch:', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor1, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        let currentHumidity = Double.parseDouble(event.value.replace('%', ''))
        let tooHumid = humidity1
        let mySwitch = settings.switch1
        if (currentHumidity > tooHumid ) {
        switch1?.on()
        } else {
        switch1?.off()
        }
        

	})
