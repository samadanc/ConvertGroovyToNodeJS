
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the humidity of:', section => {
            section.deviceSetting('humiditySensor1').capability(['relativeHumidityMeasurement']).name('');

        });


        page.section('When the humidity rises above:', section => {
            section.numberSetting('humidity1').name('Percentage ?');

        });


        page.section('When the humidity falls below:', section => {
            section.numberSetting('humidity2').name('Percentage ?');

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
        log.trace("set point: $humidity1")
        let currentHumidity = Double.parseDouble(event.value.replace('%', ''))
        let tooHumid = humidity1
        let notHumidEnough = humidity2
        let deltaMinutes = 10
        let timeAgo = new Date(this.now() - 1000 * 60 * deltaMinutes .toLong())
        
        context.api.devices.sendCommands(context.config.humiditySensor1, 'relativeHumidityMeasurement', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaMinutes minutes")
        let alreadySentSms = recentEvents.count({
        Double.parseDouble(it.value.replace('%', '')) > tooHumid
        }) > 1 || recentEvents.count({
        Double.parseDouble(it.value.replace('%', '')) < notHumidEnough
        }) > 1
        if (currentHumidity > tooHumid ) {
        console.log("Checking how long the humidity sensor has been reporting >= $tooHumid")
        if (alreadySentSms) {
        console.log("Notification already sent within the last $deltaMinutes minutes")
        } else {
        console.log("Humidity Rose Above $tooHumid:  sending SMS to $phone1")
        this.send("${humiditySensor1.label} sensed humidity rose above $humidity1%. Current level is ${event.value}%.")
        }
        }
        if (currentHumidity < notHumidEnough ) {
        console.log("Checking how long the humidity sensor has been reporting <= $notHumidEnough")
        if (alreadySentSms) {
        console.log("Notification already sent within the last $deltaMinutes minutes")
        } else {
        console.log("Humidity Fell Below $notHumidEnough:  sending SMS to $phone1 ")
        this.send("${humiditySensor1.label} sensed humidity fell below $humidity2% threshold. Current level is ${event.value}%.")
        }
        }
        

	})
