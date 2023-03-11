
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('contacts').capability(['contactSensor']).name('Doors open/close');
            section.deviceSetting('locks').capability(['lock']).name('Locks');
            section.deviceSetting('temperatures').capability(['temperatureMeasurement']).name('Temperatures');
            section.deviceSetting('humids').capability(['relativeHumidityMeasurement']).name('Humidities');
            section.deviceSetting('batteries').capability(['battery']).name('Battery Levels');

        });


        page.section('StatHat EZKey...', section => {
            section.textSetting('ezkey').name('Ez key');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.humids, 'relativeHumidityMeasurement', 'humidity', 'handleStringEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.batteries, 'battery', 'battery', 'handleStringEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.temperatures, 'temperatureMeasurement', 'temperature', 'handleStringEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.locks, 'lock', 'lock', 'handleLockEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.contacts, 'contactSensor', 'contact', 'handleContactEvent')

    })

    .subscribedEventHandler('handleStringEvent', (context, event) => {
        
        this.statPut(evt, {
        it.toString()
        })
        

	})

    .subscribedEventHandler('handleContactEvent', (context, event) => {
        
        this.statPut(evt, {
        it == 'open' ? 1 : 0
        })
        

	})

    .subscribedEventHandler('handleLockEvent', (context, event) => {
        
        this.statPut(evt, {
        it == 'locked' ? 1 : 0
        })
        

	})
