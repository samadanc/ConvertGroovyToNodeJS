
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('illuminants').capability(['illuminanceMeasurement']).name('Illuminants');
            section.deviceSetting('humidities').capability(['relativeHumidityMeasurement']).name('Relative Humidities');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');

        });


        page.section('ThinkSpeak channel id...', section => {
            section.numberSetting('channelId').name('Channel ID');

        });


        page.section('ThinkSpeak write key...', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humidities, 'relativeHumidityMeasurement', 'humidity', 'handleHumidityEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleTemperatureEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.illuminants, 'illuminanceMeasurement', 'illuminance', 'handleIlluminanceEvent')

    })

    .subscribedEventHandler('handleHumidityEvent', (context, event) => {
        
        this.logField(evt, 'humidity', {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleTemperatureEvent', (context, event) => {
        
        this.logField(evt, 'temperature', {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleIlluminanceEvent', (context, event) => {
        
        this.logField(evt, 'illuminace', {
        it.toString()
        })
        

	})
