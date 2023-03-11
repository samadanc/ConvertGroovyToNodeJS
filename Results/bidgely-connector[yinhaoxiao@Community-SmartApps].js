
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('House Power Meter', section => {
            section.deviceSetting('housePower').capability(['powerMeter']).name('House Power Meters');

        });


        page.section('Idividule circuit Power Meters', section => {
            section.deviceSetting('circuitPower').capability(['powerMeter']).name('Idividule circuit Power Meters');

        });


        page.section('Bidgely API', section => {
            section.textSetting('apiUrl').name('API URL');
            section.numberSetting('uploadCount').name('Upload after this many events');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.housePower, 'powerMeter', 'energy', 'powerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.circuitPower, 'powerMeter', 'power', 'circuitPowerEvent')

        await context.api.subscriptions.subscribeToDevices(context.config.housePower, 'powerMeter', 'power', 'powerEvent')

    })

    .subscribedEventHandler('powerEvent', (context, event) => {
        
        this.sendEvent(evt, 0)
        

	})

    .subscribedEventHandler('circuitPowerEvent', (context, event) => {
        
        this.sendEvent(evt, 10, {
        it.toString()
        })
        

	})
