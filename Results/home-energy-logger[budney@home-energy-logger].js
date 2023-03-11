
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Home Energy Monitor', section => {
            section.deviceSetting('theMeter').capability(['energyMeter']).name('');

        });


        page.section('Thermostat', section => {
            section.deviceSetting('theThermostat').capability(['thermostat']).name('');

        });


        page.section('Thermometers', section => {
            section.deviceSetting('indoorTemp').capability(['temperatureMeasurement']).name('Indoors');
            section.deviceSetting('outdoorTemp').capability(['temperatureMeasurement']).name('Outdoors');

        });


        page.section('Hygrometers', section => {
            section.deviceSetting('indoorHumidity').capability(['relativeHumidityMeasurement']).name('Indoors');
            section.deviceSetting('outdoorHumidity').capability(['relativeHumidityMeasurement']).name('Outdoors');

        });


        page.section('Check Interval', section => {
            section.numberSetting('interval').name('Minutes?');

        });


        page.section('Elasticsearch', section => {
            section.textSetting('indexPrefix').name('Prefix');
            section.textSetting('indexHost').name('Host:Port');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.outdoorTemp, 'temperatureMeasurement', 'temperature', 'outdoorTemperatureHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theThermostat, 'thermostat', 'thermostatOperatingState.idle', 'hvacHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theMeter, 'energyMeter', 'power', 'powerHandlerTotal')

        await context.api.subscriptions.subscribeToDevices(context.config.theThermostat, 'thermostat', 'thermostatOperatingState.heating', 'hvacHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theMeter, 'energyMeter', 'energy2', 'energyHandlerProbe2')

        await context.api.subscriptions.subscribeToDevices(context.config.theThermostat, 'thermostat', 'thermostatOperatingState.cooling', 'hvacHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.indoorHumidity, 'relativeHumidityMeasurement', 'humidity', 'indoorHumidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theThermostat, 'thermostat', 'heatingSetpoint', 'heatingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.outdoorHumidity, 'relativeHumidityMeasurement', 'humidity', 'outdoorHumidityHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theMeter, 'energyMeter', 'energy', 'energyHandlerTotal')

        await context.api.subscriptions.subscribeToDevices(context.config.theMeter, 'energyMeter', 'energy1', 'energyHandlerProbe1')

        await context.api.subscriptions.subscribeToDevices(context.config.theThermostat, 'thermostat', 'thermostatMode.off', 'hvacHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theMeter, 'energyMeter', 'power1', 'powerHandlerProbe1')

        await context.api.subscriptions.subscribeToDevices(context.config.theThermostat, 'thermostat', 'coolingSetpoint', 'coolingSetpointHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.theMeter, 'energyMeter', 'power2', 'powerHandlerProbe2')

        await context.api.subscriptions.subscribeToDevices(context.config.indoorTemp, 'temperatureMeasurement', 'temperature', 'indoorTemperatureHandler')

    })

    .subscribedEventHandler('indoorHumidityHandler', (context, event) => {
        
        this.climateHandler(evt, state.report.climate.indoor.humidity)
        

	})

    .subscribedEventHandler('hvacHandler', (context, event) => {
        
        log.info(event.descriptionText)
        let thermostat = event.device
        let newState = event.stringValue
        let timestamp = this.formatDate(event.date)
        state.report.hvac.heating.on = newState == 'heating' ? true : false
        state.report.hvac.cooling.on = newState == 'cooling' ? true : false
        state.report.hvac.timestamp = timestamp
        

	})

    .subscribedEventHandler('heatingSetpointHandler', (context, event) => {
        
        log.info(event.descriptionText)
        state.report.hvac.heating.setpoint = event.value
        

	})

    .subscribedEventHandler('outdoorTemperatureHandler', (context, event) => {
        
        this.climateHandler(evt, state.report.climate.outdoor.temperature)
        

	})

    .subscribedEventHandler('powerHandlerProbe1', (context, event) => {
        
        this.powerHandler(evt, state.report.electricity.probe1)
        

	})

    .subscribedEventHandler('energyHandlerProbe2', (context, event) => {
        
        this.energyHandler(evt, state.report.electricity.probe2)
        

	})

    .subscribedEventHandler('coolingSetpointHandler', (context, event) => {
        
        log.info(event.descriptionText)
        state.report.hvac.cooling.setpoint = event.value
        

	})

    .subscribedEventHandler('indoorTemperatureHandler', (context, event) => {
        
        this.climateHandler(evt, state.report.climate.indoor.temperature)
        

	})

    .subscribedEventHandler('energyHandlerTotal', (context, event) => {
        
        this.energyHandler(evt, state.report.electricity.total)
        

	})

    .subscribedEventHandler('outdoorHumidityHandler', (context, event) => {
        
        this.climateHandler(evt, state.report.climate.outdoor.humidity)
        

	})

    .subscribedEventHandler('powerHandlerTotal', (context, event) => {
        
        this.powerHandler(evt, state.report.electricity.total)
        

	})

    .subscribedEventHandler('energyHandlerProbe1', (context, event) => {
        
        this.energyHandler(evt, state.report.electricity.probe1)
        

	})

    .subscribedEventHandler('powerHandlerProbe2', (context, event) => {
        
        this.powerHandler(evt, state.report.electricity.probe2)
        

	})
