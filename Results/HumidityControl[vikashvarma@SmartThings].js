
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.enumSetting('opt').name('I want');
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('Using humidity sensor');
            section.enumSetting('notify').name('Send a push notification?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'maintainHumidity')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'smartHumidifier')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'smartDehumidifier')

    })

    .subscribedEventHandler('smartHumidifier', (context, event) => {
        
        if (this.checkDelta(evt)) {
        log.trace("currentHumidity = ${state.currentHumidity} | humidityLow = $humidityLow")
        if (state.currentHumidity <= humidityLow ) {
        this.turnOn(humidiferSwitch)
        } else {
        this.turnOff(humidiferSwitch)
        }
        }
        

	})

    .subscribedEventHandler('smartDehumidifier', (context, event) => {
        
        if (this.checkDelta(evt)) {
        if (state.currentHumidity >= humidityHigh ) {
        this.turnOn(dehumidiferSwitch)
        } else {
        this.turnOff(dehumidiferSwitch)
        }
        }
        

	})

    .subscribedEventHandler('maintainHumidity', (context, event) => {
        
        if (this.checkDelta(evt)) {
        if (state.currentHumidity > humidityHigh ) {
        this.turnOff(humidiferSwitch)
        this.turnOn(dehumidiferSwitch)
        } else {
        if (state.currentHumidity < humidityLow ) {
        this.turnOff(dehumidiferSwitch)
        this.turnOn(humidiferSwitch)
        } else {
        this.turnOff(humidiferSwitch)
        this.turnOff(dehumidiferSwitch)
        }
        }
        }
        

	})
