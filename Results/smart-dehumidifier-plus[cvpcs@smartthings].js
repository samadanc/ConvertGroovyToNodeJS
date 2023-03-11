
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Devices:', section => {
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('Humidity Sensor');
            section.deviceSetting('dehumidifierSwitch').capability(['switch']).name('Dehumidifier Switch');

        });


        page.section('Thresholds:', section => {
            section.numberSetting('humidityMax').name('Humidity Maximum');
            section.numberSetting('humidityMin').name('Humidity Minimum');

        });


        page.section('Limits:', section => {
            section.numberSetting('switchActiveMaximum').name('Humidifier Active Maximum');
            section.booleanSetting('sendPushMessage').name('Send a push notification if maximum is reached?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'humidityHandler')

    })

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        console.log("humidity: ${event.value}")
        console.log("set max point: $humidityMax")
        console.log("set min point: $humidityMin")
        let humidityHigh = humidityMax
        let humidityLow = humidityMin
        if (humidityHigh <= humidityLow ) {
        log.warning('humidity high (max) <= humidity low (min), so forcing low = high')
        humidityLow = humidityHigh
        }
        let currentHumidity = Double.parseDouble(event.value.replace('%', ''))
        if (currentHumidity >= humidityHigh ) {
        if (state.lastStatus != 'on') {
        console.log("Humidity Rose Above $humidityHigh: activating ${dehumidifierSwitch.label}")
        dehumidifierSwitch?.on()
        this.runIn(60 * switchActiveMaximum , activeMaximumReachedHandler)
        state.lastStatus = 'on'
        }
        } else {
        if (currentHumidity <= humidityLow ) {
        if (state.lastStatus != 'off') {
        console.log("Humidity Dropped Below $humidityLow: deactivating ${dehumidifierSwitch.label}")
        dehumidifierSwitch?.off()
        this.unschedule(activeMaximumReachedHandler)
        state.lastStatus = 'off'
        }
        }
        }
        

	})
