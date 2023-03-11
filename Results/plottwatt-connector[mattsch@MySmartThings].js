
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Power Meter', section => {
            section.deviceSetting('power').capability(['powerMeter']).name('Power Meter');

        });


        page.section('PlotWatt API', section => {
            section.textSetting('apiKey').name('PlotWatt API Key');
            section.textSetting('meterId').name('Meter ID');
            section.numberSetting('uploadCount').name('Upload after this many events');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'powerEvent')

    })

    .subscribedEventHandler('powerEvent', (context, event) => {
        
        this.sendEvent(evt)
        

	})
