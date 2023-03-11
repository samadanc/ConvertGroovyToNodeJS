
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('Lights', section => {
            section.deviceSetting('switches').capability(['switch']).name('Which lights to turn on?');
            section.numberSetting('offset').name('Turn on this many minutes before sunset');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
        this.scheduleTurnOn(event.value)
        

	})
