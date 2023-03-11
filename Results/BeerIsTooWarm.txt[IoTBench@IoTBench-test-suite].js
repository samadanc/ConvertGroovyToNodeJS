
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Monitor the temperature...', section => {
            section.deviceSetting('temperatureSensor1').capability(['temperatureMeasurement']).name('');

        });


        page.section('When the temperature rises above...', section => {
            section.numberSetting('temperature1').name('Temp?');

        });


        page.section('Text me at...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let tooHot = temperature1
        if (event.doubleValue >= tooHot ) {
        console.log("Checking how long the temperature sensor has been reporting >= $tooHot")
        let deltaMinutes = 10
        let timeAgo = new Date(this.now() - 1000 * 60 * deltaMinutes .toLong())
        
        context.api.devices.sendCommands(context.config.temperatureSensor1, 'temperatureMeasurement', eventsSince)
    
        log.trace("Found ${(recentEvents?.size()) ? recentEvents?.size() : 0} events in the last $deltaMinutes minutes")
        let alreadySentSms = recentEvents.count({
        it.doubleValue <= tooHot
        }) > 1
        if (alreadySentSms) {
        console.log("SMS already sent to $phone1 within the last $deltaMinutes minutes")
        } else {
        console.log("Temperature rises above $tooHot:  sending SMS to $phone1")
        this.sendSms(phone1, "${temperatureSensor1.label} is too hot, reporting a temperature of ${event.value}${event.unit}")
        }
        }
        

	})
