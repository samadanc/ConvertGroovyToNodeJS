
const { SmartApp } = require('@smartthings/smartapp')

module.exports = new SmartApp()
    .enableEventLogging(2)
    .configureI18n()
    .page('mainPage', (context, page, configData) => {

        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('', section => {

        });


        page.section('Global Preferences', section => {
            section.numberSetting('offset').name('Daylight offset before/after sunset/sunrise - in minutes');

        });


        page.section('Sun State Device', section => {
            section.deviceSetting('sunStateDevice').capability(['sensor']).name('?');

        });


    })

    .updated(async (context, updateData) => {

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunriseTime', 'sunriseTimeHandler')

        await context.api.subscriptions.subscribeToDevices(context.config.location, 'location', 'sunsetTime', 'sunsetTimeHandler')

    })

    .subscribedEventHandler('sunsetTimeHandler', (context, event) => {
        
        this.scheduleSunsetChange(event.value)
        

	})

    .subscribedEventHandler('sunriseTimeHandler', (context, event) => {
        
        this.scheduleSunriseChange(event.value)
        

	})
