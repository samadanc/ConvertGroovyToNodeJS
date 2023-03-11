
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section(''Smart Humidifier/Dehumidifier'', section => {

        });


        page.section('Devices to sense and control humidity:', section => {
            section.deviceSetting('humiditySensor1').capability(['relativeHumidityMeasurement']).name('Humidity Sensor');
            section.deviceSetting('switch1').capability(['switch']).name('Switch');

        });


        page.section('Settings:', section => {
            section.enumSetting('humidityMode').name('Mode');
            section.numberSetting('humidityHigh').name('High humidity Threshold value (RH%):');
            section.numberSetting('humidityLow').name('Low humidity Threshold value (RH%):');
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
        
        log.trace("${event.name}: ${event.value}: ${event.displayName}")
        state.lastSwitchStatus = event.value
        

	})

    .subscribedEventHandler('humidityHandler', (context, event) => {
        
        log.trace("state.lastHumidity: ${state.lastHumidity}, humidity: ${event.value}, humidityHigh: $humidityHigh, humidityLow: $humidityLow. humidityMode: $humidityMode")
        state.lastHumidity = Double.parseDouble(event.value.replace('%', ''))
        this.runIn(5, statusCheck)
        

	})
