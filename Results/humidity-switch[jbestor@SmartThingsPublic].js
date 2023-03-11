
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the humidity of:', section => {
            section.deviceSetting('humiditySensor1').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('Too Humid:', section => {
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
        
        log.trace("humidity: ${event.value}")
        log.trace("set point: $humidity1")
        let currentHumidity = Double.parseDouble(event.value.replace('%', ''))
        let tooHumid = humidity1
        let mySwitch = settings.switch1
        let switchState = switch1.currentSwitch
        if (currentHumidity >= tooHumid ) {
        if (switchState == 'on') {
        console.log("Current Humidity is $currentHumidity, $mySwitch is already on")
        } else {
        console.log("Current Humidity is $currentHumidity, Turning on $mySwitch")
        this.sendNotificationEvent("Current Humidity is $currentHumidity, Turning on $mySwitch")
        }
        switch1?.on()
        }
        if (currentHumidity < tooHumid ) {
        if (switchState == 'off') {
        console.log("Current Humidity is $currentHumidity, $mySwitch is already off")
        } else {
        console.log("Current Humidity is $currentHumidity, Turning off $mySwitch")
        this.sendNotificationEvent("Current Humidity is $currentHumidity, Turning off $mySwitch")
        }
        switch1?.off()
        }
        

	})
