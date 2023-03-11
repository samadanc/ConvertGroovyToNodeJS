
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('BulbEnergyPublisher', section => {
            section.deviceSetting('bulbEnergyMonitor').capability(['energyMeter']).name('Select your Bulb Energy Monitor');

        });


        page.section('InfluxDB API', section => {

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.bulbEnergyMonitor, 'energyMeter', 'gasMeter', 'gasEventPublishedHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.bulbEnergyMonitor, 'energyMeter', 'energy', 'energyEventPublishedHandler')

    })

    .subscribedEventHandler('gasEventPublishedHandler', (context, event) => {
        
        console.log("gasMeter event - event.value: ${event.value}")
        this.publishEvent(evt)
        

	})

    .subscribedEventHandler('energyEventPublishedHandler', (context, event) => {
        
        console.log("Energy event - event.value: ${event.value}")
        this.publishEvent(evt)
        

	})
