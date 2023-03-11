
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


        page.section('When the temperature rises above...', section => {
            section.numberSetting('temperature2').name('Temperature?');

        });


        page.section('How many minutes between alerts...', section => {
            section.numberSetting('alertInterval').name('Alert Interval?');

        });


        page.section('Text me at (optional, sends a push notification if not specified)...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.temperatureSensor1, 'temperatureMeasurement', 'temperature', 'temperatureHandler')

    })

    .subscribedEventHandler('temperatureHandler', (context, event) => {
        
        log.trace("temperature: ${event.value}, $evt")
        let tooCold = temperature1
        let tooHot = temperature2
        let mySwitch = settings.switch1
        if (event.doubleValue <= tooCold ) {
        console.log("Checking how long the temperature sensor has been reporting <= $tooCold")
        let alreadySentSms = this.alreadySentSms({ let recentEvent ->
        recentEvent.doubleValue <= tooCold
        })
        if (!alreadySentSms) {
        console.log("Temperature dropped below $tooCold:  sending SMS to $phone1")
        let msg = "${temperatureSensor1.label} is too cold, reporting a temperature of ${event.value}${event.unit} which is below $temperature1${event.unit}"
        this.sendTextMessage(msg)
        }
        } else {
        if (event.doubleValue >= tooHot ) {
        console.log("Checking how long the temperature sensor has been reporting >= $tooHot")
        let alreadySentSms = this.alreadySentSms({ let recentEvent ->
        recentEvent.doubleValue >= tooHot
        })
        if (!alreadySentSms) {
        console.log("Temperature rose above $tooHot:  sending SMS to $phone1")
        let msg = "${temperatureSensor1.label} is too hot, reporting a temperature of ${event.value}${event.unit} which is above $temperature2${event.unit}"
        this.sendTextMessage(msg)
        }
        }
        }
        

	})
