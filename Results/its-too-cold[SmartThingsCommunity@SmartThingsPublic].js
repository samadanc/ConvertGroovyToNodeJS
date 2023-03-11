
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('When the temperature drops below...', section => {
            section.numberSetting('temperature1').name('Temperature?');

        });


        page.section('Notifications', section => {
            section.enumSetting('sendPushMessage').name('Send a push notification?');

        });


        page.section('Turn on a heater...', section => {
            section.deviceSetting('switch1').capability(['switch']).name('');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let tooCold = temperature1
        let mySwitch = settings.switch1
        if (event.doubleValue <= tooCold ) {
        console.log("Checking how long the temperature sensor has been reporting <= $tooCold")
        let deltaMinutes = 10
        let timeAgo = new Date(this.now() - 1000 * 60 * deltaMinutes .toLong())
        
        context.api.devices.sendCommands(context.config.temperatureSensor1, 'temperatureMeasurement', eventsSince)
    
        it.name == 'temperature'
        })
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaMinutes minutes")
        let alreadySentSms = recentEvents.count({
        it.doubleValue <= tooCold
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent within the last $deltaMinutes minutes")
        } else {
        console.log("Temperature dropped below $tooCold:  sending SMS and activating $mySwitch")
        let tempScale = location.temperatureScale ? location.temperatureScale : 'F'
        this.send("${temperatureSensor1.displayName} is too cold, reporting a temperature of ${event.value}${(event.unit) ? event.unit : tempScale}")
        switch1?.on()
        }
        }
        

	})
