
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Settings', section => {
            section.enumSetting('opt').name('I want');
            section.deviceSetting('humiditySensor').capability(['relativeHumidityMeasurement']).name('Using humidity sensor');
            section.enumSetting('notify').name('Send a push notification?');
            section.deviceSetting('luxSensor').capability(['illuminanceMeasurement']).name('Using lux sensor');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'maintainHumidity')

        await context.api.subscriptions.subscribeToDevices(context.config.luxSensor, 'illuminanceMeasurement', 'illuminance', 'luxManager')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'smartHumidifier')

        await context.api.subscriptions.subscribeToDevices(context.config.humiditySensor, 'relativeHumidityMeasurement', 'humidity', 'smartDehumidifier')

    })

    .subscribedEventHandler('luxManager', (context, event) => {
        
        console.log('luxManager')
        if (state.currentIllumination == null) {
        state.currentIllumination = 100.0
        }
        state.currentIllumination = event.doubleValue
        let luxLimit = luxLow * 1.0
        log.trace('luxManager')
        log.trace("currentHumidity = ${state.currentHumidity} | humidityLow = $humidityLow | Illumination = ${state.currentIllumination} | luxLow = $luxLimit")
        if (state.currentHumidity <= humidityLow && state.currentIllumination <= luxLimit ) {
        this.turnOn(humidiferSwitch)
        } else {
        this.turnOff(humidiferSwitch)
        }
        

	})

    .subscribedEventHandler('smartHumidifier', (context, event) => {
        
        console.log('smartHumidifier')
        if (this.checkDelta(evt)) {
        let luxLimit = luxLow * 1.0
        if (state.currentIllumination == null) {
        state.currentIllumination = 100.0
        }
        log.trace("currentHumidity = ${state.currentHumidity} | humidityLow = $humidityLow | Illumination = ${state.currentIllumination} | luxLow = $luxLimit")
        if (state.currentHumidity <= humidityLow && state.currentIllumination <= luxLimit ) {
        console.log('turnOn(humidiferSwitch)')
        this.turnOn(humidiferSwitch)
        } else {
        console.log('turnOff(humidiferSwitch)')
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
        
        let luxLimit = luxLow * 1.0
        if (state.currentIllumination == null) {
        state.currentIllumination = 100.0
        }
        log.trace("currentHumidity = ${state.currentHumidity} | humidityLow = $humidityLow | Illumination = ${state.currentIllumination} | luxLow = $luxLimit")
        if (this.checkDelta(evt)) {
        if (state.currentHumidity > humidityHigh ) {
        this.turnOff(humidiferSwitch)
        this.turnOn(dehumidiferSwitch)
        }
        if (state.currentHumidity <= humidityLow && state.currentIllumination <= luxLimit ) {
        this.turnOff(dehumidiferSwitch)
        this.turnOn(humidiferSwitch)
        } else {
        this.turnOff(humidiferSwitch)
        this.turnOff(dehumidiferSwitch)
        }
        }
        

	})
