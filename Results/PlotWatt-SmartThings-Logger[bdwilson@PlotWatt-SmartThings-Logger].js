
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Log devices...', section => {
            section.deviceSetting('power').capability(['powerMeter']).name('Power');

        });


        page.section('PlotWatt API ID...', section => {
            section.textSetting('channelId').name('PlotWatt API ID');

        });


        page.section('PlotWatt panel id...', section => {
            section.textSetting('channelKey').name('Panel id');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.power, 'powerMeter', 'power', 'handlePowerEvent')

    })

    .subscribedEventHandler('handlePowerEvent', (context, event) => {
        
        this.logField(evt, 'power', {
        it.toString()
        })
        

	})
