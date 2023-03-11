
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices to sense and control humidity:', section => {
            section.deviceSetting('humiditySensor1').capability(['relativeHumidityMeasurement']).name('Humidity Sensor');
            section.deviceSetting('switch1').capability(['switch']).name(' Dehumidifier Switch');

        });


        page.section('Settings:', section => {
            section.numberSetting('humidityHigh').name('Turn on when the humidity rises above (%):');
            section.numberSetting('humidityLow').name('Turn off when the humidity drops below (%):');
            section.numberSetting('delay').name('Polling delay (minutes):');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.switch1, 'switch', 'switch', 'switchHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor1, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('switchHandler', (context, event) => {
        
        console.log("${event.name}: ${event.value}: ${event.displayName}")
        state.lastSwitchStatus = event.value
        

	})

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        log.trace("humidity: ${event.value}")
        log.trace("set high point: $humidityHigh")
        log.trace("set low point: $humidityLow")
        let currentHumidity = Double.parseDouble(event.value.replace('%', ''))
        state.lastHumidity = currentHumidity
        if (currentHumidity >= humidityHigh ) {
        console.log("Checking how long the humidity sensor has been reporting > $humidityHigh1")
        if (state.lastSwitchStatus != 'on') {
        console.log("Humidity Rose Above $humidityHigh1:  sending SMS to $phone1 and deactivating $mySwitch")
        this.send("It's too humid! Turning on ${switch1.label}")
        switch1?.on()
        state.lastSwitchStatus = 'on'
        }
        } else {
        if (currentHumidity <= humidityLow ) {
        console.log("Checking how long the humidity sensor has been reporting < $humidityLow1")
        if (state.lastSwitchStatus != 'off') {
        console.log("Humidity Dropped Below $humidityLow1:  sending SMS to $phone1 and activating $mySwitch")
        this.send("It's too dry! Turning off ${switch1.label}")
        switch1?.off()
        state.lastSwitchStatus = 'off'
        }
        } else {
        }
        }
        

	})
