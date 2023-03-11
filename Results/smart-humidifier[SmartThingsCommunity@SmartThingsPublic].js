
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the humidity of:', section => {
            section.deviceSetting('humiditySensor1').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('When the humidity rises above:', section => {
            section.numberSetting('humidityHigh').name('Percentage ?');

        });


        page.section('When the humidity drops below:', section => {
            section.numberSetting('humidityLow').name('Percentage ?');

        });


        page.section('Control Humidifier:', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor1, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        log.trace("humidity: ${event.value}")
        log.trace("set high point: $humidityHigh")
        log.trace("set low point: $humidityLow")
        let currentHumidity = Double.parseDouble(event.value.replace('%', ''))
        let humidityHigh1 = humidityHigh
        let humidityLow1 = humidityLow
        let mySwitch = settings.switch1
        if (currentHumidity >= humidityHigh1 ) {
        console.log("Checking how long the humidity sensor has been reporting >= $humidityHigh1")
        let deltaMinutes = 10
        let timeAgo = new Date(this.now() - 1000 * 60 * deltaMinutes .toLong())
        
        context.api.devices.sendCommands(context.config.humiditySensor1, 'relativeHumidityMeasurement', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaMinutes minutes")
        let alreadySentSms1 = recentEvents.count({
        Double.parseDouble(it.value.replace('%', '')) >= humidityHigh1
        }) > 1
        if (alreadySentSms1) {
        console.log("Notification already sent within the last $deltaMinutes minutes")
        } else {
        if (state.lastStatus != 'off') {
        console.log("Humidity Rose Above $humidityHigh1:  sending SMS and deactivating $mySwitch")
        this.send("${humiditySensor1.label} sensed high humidity level of ${event.value}, turning off ${switch1.label}")
        switch1?.off()
        state.lastStatus = 'off'
        }
        }
        } else {
        if (currentHumidity <= humidityLow1 ) {
        console.log("Checking how long the humidity sensor has been reporting <= $humidityLow1")
        let deltaMinutes = 10
        let timeAgo = new Date(this.now() - 1000 * 60 * deltaMinutes .toLong())
        
        context.api.devices.sendCommands(context.config.humiditySensor1, 'relativeHumidityMeasurement', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaMinutes minutes")
        let alreadySentSms2 = recentEvents.count({
        Double.parseDouble(it.value.replace('%', '')) <= humidityLow1
        }) > 1
        if (alreadySentSms2) {
        console.log("Notification already sent within the last $deltaMinutes minutes")
        } else {
        if (state.lastStatus != 'on') {
        console.log("Humidity Dropped Below $humidityLow1:  sending SMS and activating $mySwitch")
        this.send("${humiditySensor1.label} sensed low humidity level of ${event.value}, turning on ${switch1.label}")
        switch1?.on()
        state.lastStatus = 'on'
        }
        }
        } else {
        }
        }
        

	})
