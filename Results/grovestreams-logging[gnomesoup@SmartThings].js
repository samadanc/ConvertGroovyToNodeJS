
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors open/close');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('humidity').capability(['relativeHumidityMeasurement']).name('Humidity');
            section.deviceSetting('switches').capability(['switch']).name('Switch');
            section.deviceSetting('power').capability(['powerMeter']).name('Power Meters');

        });


        page.section('GroveStreams Feed PUT API key...', section => {
            section.textSetting('channelKey').name('API key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humidity, 'relativeHumidityMeasurement', 'humidity', 'handleHumidityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'handlePowerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.switches, 'switch', 'switch', 'handleSwitchEvent')

    })

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        this.sendValue(evt, {
        it == 'open' ? 'true' : 'false'
        })
        

	})

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handlePowerEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleHumidityEvent', (context, event) => {
        
        this.sendValue(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleSwitchEvent', (context, event) => {
        
        this.sendValue(evt, {
        it == 'on' ? 'true' : 'false'
        })
        

	})
