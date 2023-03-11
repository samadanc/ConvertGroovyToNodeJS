
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Power Meter', section => {
            section.deviceSetting('power').capability(['powerMeter']).name('Select Power Meter');

        });


        page.section('Wattvision API', section => {
            section.textSetting('apiKey').name('Wattvision API Key');
            section.textSetting('apiId').name('Wattvision API ID');
            section.textSetting('sensorId').name('Wattvision Virtual Sensor ID');

        });


        page.section('General Settings', section => {
            section.numberSetting('sensorHysteresis').name('Average Readings over (n) Seconds');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'powerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'energy', 'energyEvent')

    })

    .subscribedEventHandler('powerEvent', (context, event) => {
        
        this.sendEvent(evt)
        

	})

    .subscribedEventHandler('energyEvent', (context, event) => {
        
        log.info("WPC logging energy reading of ${event.value} watt-hours.")
        state.energyReading = event.value.toFloat() * 1000
        

	})
